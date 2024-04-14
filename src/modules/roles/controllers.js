const {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
} = require('./model')

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints relacionados con los roles.
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     tags: [Roles]
 *     summary: Obtener todos los roles
 *     description: Retorna todos los roles existentes en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de roles obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */

async function GET(req, res) {
    try {
        const response = await getRoles()

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Obtener un rol por su ID
 *     description: Retorna un rol específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a buscar
 *     responses:
 *       200:
 *         description: Rol encontrado exitosamente
 *       500:
 *         description: Error del servidor
 */

async function SHOW(req, res) {
    try {
        const role_id = req.params.id
        const response = await getRoleById(role_id)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /roles:
 *   post:
 *     tags: [Roles]
 *     summary: Crear un nuevo rol
 *     description: Crea un nuevo rol con el nombre proporcionado en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_name:
 *                 type: string
 *                 description: Nombre del nuevo rol
 *             required:
 *               - role_name
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error de solicitud debido a datos faltantes o incorrectos
 *       500:
 *         description: Error del servidor
 */

async function POST(req, res) {
    try {
        const { role_name } = req.body
        if (!role_name) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createRole(role_name)
        
        return res.status(200).json('Role created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags: [Roles]
 *     summary: Actualizar un rol existente.
 *     description: Actualiza el nombre de un rol existente identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_name:
 *                 type: string
 *                 description: Nuevo nombre del rol
 *             required:
 *               - role_name
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente.
 *       400:
 *         description: Datos de entrada incorrectos o faltantes.
 *       500:
 *         description: Error del servidor.
 */

async function PUT(req, res) {
    try {
        const role_id = req.params.id
        const { role_name } = req.body
        if (!role_name) 
        return res.status(400).json({ msg: 'Complete todos los datos' })

        await updateRole(role_id, role_name)

        return res.status(200).json('Role updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags: [Roles]
 *     summary: Eliminar un rol existente
 *     description: Cambia el flag de un rol y este deja de ser visible por metodos tradicionales.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del rol a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       500:
 *         description: Error del servidor
 */

async function DELETE(req, res) {
    try {
        const role_id = req.params.id
        await deleteRole(role_id)

        return res.status(200).json('Role deleted')
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
