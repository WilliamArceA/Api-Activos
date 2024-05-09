const { PcaConnectorAd } = require('aws-sdk')
const {
    getLocationsPerUser,
    getUsersPerLocation,
    createLocationPerUser,
    updateLocationPerUser,
    deleteLocationPerUser,
} = require('./model')

/**
 * @swagger
 * tags:
 *   name: UserPerLocation
 *   description: Endpoints relacionados con los usuarios y sus ubicaciones.
 */

/**
 * @swagger
 * /usersPerLocation:
 *   get:
 *     tags: [UserPerLocation]
 *     summary: Obtener ubicaciones por usuario o usuarios por ubicación.
 *     description: Retorna las ubicaciones asociadas a un usuario específico o los usuarios asociados a una ubicación específica, dependiendo del filtro.
 *     parameters:
 *       - in: query
 *         name: filter
 *         description: Filtro para obtener ubicaciones por usuario o usuarios por ubicación.
 *         required: true
 *         schema:
 *           type: string
 *           enum: [User, Location]
 *       - in: query
 *         name: name
 *         description: Nombre del usuario o ubicación para filtrar los resultados, debe ser un nombre existente en la base de datos.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultados obtenidos exitosamente.
 *       400:
 *         description: Datos faltantes o inválidos.
 *       500:
 *         description: Error del servidor.
 */

async function GET(req, res) {
    try {
        const filter = req.query.filter
        if(filter==undefined||filter=='')
            return res.status(400).json({ msg: 'Can not get, missing data' })
        if(filter=='Location'){
            const name = req.query.name
            if(name==undefined||name=='')
                return res.status(400).json({ msg: 'Can not get, missing data' })
            const response = await getUsersPerLocation(name)
            return res.status(200).json(response)
        }else{
            if(filter=='User'){
                const name = req.query.name
                if(name==undefined||name=='')
                    return res.status(400).json({ msg: 'Can not get, missing data' })
                const response = await getLocationsPerUser(name)
                return res.status(200).json(response)
            }else{
                return res.status(500).json({ errorCode: error.code, msg: error.message })
            }
        }
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /usersPerLocation:
 *   post:
 *     tags: [UserPerLocation]
 *     summary: Crear una relación entre un usuario y una ubicación.
 *     description: Crea una nueva relación entre un usuario y una ubicación especificada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - location_name
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre del usuario.
 *               location_name:
 *                 type: string
 *                 description: Nombre de la ubicación.
 *     responses:
 *       200:
 *         description: Relación creada exitosamente.
 *       400:
 *         description: Datos faltantes o inválidos en la solicitud.
 *       500:
 *         description: Error del servidor.
 */

async function POST(req, res) {
    try {
        const { username, location_name } = req.body
        if (!username  || !location_name) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (username == '' || location_name =='') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createLocationPerUser(username,location_name)
        
        return res.status(200).json('User and location created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /usersPerLocation/{user-id}:
 *   put:
 *     tags: [UserPerLocation]
 *     summary: Actualizar ubicación de un usuario.
 *     description: Actualiza la ubicación de un usuario especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: user-id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_location_name:
 *                 type: string
 *                 description: Nombre de la ubicación antigua.
 *               new_location_name:
 *                 type: string
 *                 description: Nuevo nombre de la ubicación.
 *             required:
 *               - old_location_name
 *               - new_location_name
 *     responses:
 *       200:
 *         description: Ubicación del usuario actualizada exitosamente.
 *       400:
 *         description: Datos faltantes o inválidos en la solicitud.
 *       500:
 *         description: Error del servidor.
 */


async function PUT(req, res) {
    try {
        const user_id = req.params.id
        const { old_location_name, new_location_name } = req.body
        if (!old_location_name || !new_location_name ) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (old_location_name == '' || new_location_name=='') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        await updateLocationPerUser(user_id, old_location_name, new_location_name)

        return res.status(200).json('User and his location updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /usersPerLocation/{user-id}:
 *   delete:
 *     tags: [UserPerLocation]
 *     summary: Eliminar la relación entre un usuario y una ubicación.
 *     description: Elimina la relación entre un usuario y una ubicación especificada por su ID.
 *     parameters:
 *       - in: path
 *         name: user-id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *       - in: query
 *         name: location_id
 *         required: true
 *         description: ID de la ubicación.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Relación entre usuario y ubicación eliminada exitosamente.
 *       400:
 *         description: Datos faltantes o inválidos en la solicitud.
 *       500:
 *         description: Error del servidor.
 */

async function DELETE(req, res) {
    try {
        const user_id = req.params.id
        const location_id = req.query.location_id
        if(location_id==undefined||location_id=='')
            return res.status(400).json({ msg: 'Can not delete, missing data' })
        await deleteLocationPerUser(user_id,location_id)

        return res.status(200).json('User and his location deleted')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

module.exports = {
    GET,
    POST,
    PUT,
    DELETE,
}
