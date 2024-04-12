const {
    getLocation,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
} = require('./model')

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Endpoints relacionados con las ubicaciones
 */

/**
 * @swagger
 * /location:
 *   get:
 *     tags: [Location]
 *     summary: Obtiene todas las ubicaciones.
 *     description: Retorna todas las ubicaciones disponibles.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve la lista de ubicaciones.
 *       '500':
 *         description: Error interno del servidor.
 */

async function GET(req, res) {
    try {
        const response = await getLocation()

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /location/{id}:
 *   get:
 *     tags: [Location]
 *     summary: Obtiene una ubicación por su ID.
 *     description: Retorna una ubicación específica según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ubicación a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve la ubicación solicitada.
 *       '500':
 *         description: Error interno del servidor.
 */

async function SHOW(req, res) {
    try {
        const loc_id = req.params.id
        const response = await getLocationById(loc_id)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /location:
 *   post:
 *     tags: [Location]
 *     summary: Crea una nueva ubicación.
 *     description: Crea una nueva ubicación con el nombre y el detalle proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location_name:
 *                 type: string
 *                 description: Nombre de la ubicación.
 *               location_detail:
 *                 type: string
 *                 description: Detalles de la ubicación.
 *     responses:
 *       '200':
 *         description: Ubicación creada con éxito.
 *       '400':
 *         description: Falta colocar atributos.
 *       '500':
 *         description: Error interno del servidor.
 */

async function POST(req, res) {
    try {
        const { location_name, location_detail } = req.body
        if (!location_name || !location_detail) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (location_name == '' || location_detail =='') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createLocation(location_name,location_detail)
        
        return res.status(200).json('Location created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /location/{id}:
 *   put:
 *     tags: [Location]
 *     summary: Actualiza una ubicación existente.
 *     description: Actualiza una ubicación existente según su ID con los nuevos datos proporcionados.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ubicación a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location_name:
 *                 type: string
 *                 description: Nuevo nombre de la ubicación.
 *               location_detail:
 *                 type: string
 *                 description: Nuevos detalles de la ubicación.
 *     responses:
 *       '200':
 *         description: Ubicación actualizada con éxito.
 *       '400':
 *         description: Falta colocar atributos.
 *       '500':
 *         description: Error interno del servidor.
 */

async function PUT(req, res) {
    try {
        const loc_id = req.params.id
        const { location_name, location_detail } = req.body
        if (!location_name || !location_detail) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (location_name == '' || location_detail == '') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        await updateLocation(loc_id, location_name, location_detail)

        return res.status(200).json('Location updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /location/{id}:
 *   delete:
 *     tags: [Location]
 *     summary: Elimina una ubicación por su ID.
 *     description: Cambia el flag de una ubicacion y esta deja de ser visible por metodos tradicionales.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la ubicación a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Ubicación eliminada con éxito.
 *       '500':
 *         description: Error interno del servidor.
 */

async function DELETE(req, res) {
    try {
        const loc_id = req.params.id
        await deleteLocation(loc_id)

        return res.status(200).json('Location deleted')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

module.exports = {
    GET,
    SHOW,
    POST,
    PUT,
    DELETE,
}
