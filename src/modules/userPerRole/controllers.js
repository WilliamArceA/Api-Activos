const { PcaConnectorAd } = require('aws-sdk')
const {
    getRolesPerUser,
    getUsersPerRole,
    createRolePerUser,
    updateRolePerUser,
    deleteRolePerUser,
} = require('./model')

/**
 * @swagger
 * tags:
 *   name: UserPerRole
 *   description: Endpoints relacionados con los usuarios y sus roles.
 */

/**
 * @swagger
 * /usersPerRole:
 *   get:
 *     tags: [UserPerRole]
 *     summary: Obtener usuarios por rol o roles por usuario.
 *     description: Retorna los usuarios filtrados por rol o los roles filtrados por usuario.
 *     parameters:
 *       - in: query
 *         name: filter
 *         description: Tipo de filtro (User o Role).
 *         required: true
 *         schema:
 *           type: string
 *           enum: [User, Role]
 *       - in: query
 *         name: name
 *         description: Nombre del usuario o del rol.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuarios o roles obtenidos exitosamente.
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
        if(filter=='Role'){
            const name = req.query.name
            if(name==undefined||name=='')
                return res.status(400).json({ msg: 'Can not get, missing data' })
            const response = await getUsersPerRole(name)
            return res.status(200).json(response)
        }else{
            if(filter=='User'){
                const name = req.query.name
                if(name==undefined||name=='')
                    return res.status(400).json({ msg: 'Can not get, missing data' })
                const response = await getRolesPerUser(name)
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
 * /usersPerRole:
 *   post:
 *     tags: [UserPerRole]
 *     summary: Crear relación entre usuario y rol.
 *     description: Crea una relación entre un usuario y un rol.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               role_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Relación entre usuario y rol creada exitosamente.
 *       400:
 *         description: Datos faltantes o inválidos en la solicitud.
 *       500:
 *         description: Error del servidor.
 */


async function POST(req, res) {
    try {
        const { username, role_name } = req.body
        if (!username  || !role_name) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (username == '' || role_name =='') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createRolePerUser(username,role_name)
        
        return res.status(200).json('User and role created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /usersPerRole/{user-id}:
 *   put:
 *     tags: [UserPerRole]
 *     summary: Actualizar rol de un usuario.
 *     description: Actualiza el rol de un usuario especificado por su ID.
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
 *               old_role_name:
 *                 type: string
 *               new_role_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol del usuario actualizado exitosamente.
 *       400:
 *         description: Datos faltantes o inválidos en la solicitud.
 *       500:
 *         description: Error del servidor.
 */


async function PUT(req, res) {
    try {
        const user_id = req.params.id
        const { old_role_name, new_role_name } = req.body
        if (!old_role_name || !new_role_name ) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (old_role_name == '' || new_role_name=='') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        await updateRolePerUser(user_id, old_role_name, new_role_name)

        return res.status(200).json('User and his role updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /usersPerRole/{user-id}:
 *   delete:
 *     tags: [UserPerRole]
 *     summary: Eliminar relación entre usuario y rol.
 *     description: Elimina la relación entre un usuario y un rol especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: user-id
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: string
 *       - in: query
 *         name: role_id
 *         required: true
 *         description: ID del rol.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Relación entre usuario y rol eliminada exitosamente.
 *       400:
 *         description: Datos faltantes o inválidos en la solicitud.
 *       500:
 *         description: Error del servidor.
 */


async function DELETE(req, res) {
    try {
        const user_id = req.params.id
        const role_id = req.query.role_id
        if(role_id==undefined || role_id=='')
            return res.status(400).json({ msg: 'Can not delete, missing data' })
        await deleteRolePerUser(user_id,role_id)

        return res.status(200).json('User and his role deleted')
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
