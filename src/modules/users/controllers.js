const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('./model')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints relacionados con los usuarios.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */

async function GET(req, res) {
    try {
        const response = await getUser()

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Obtener un usuario por su ID
 *     description: Obtiene un usuario específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *       500:
 *         description: Error del servidor
 */

async function SHOW(req, res) {
    try {
        const user_id = req.params.id
        const response = await getUserById(user_id)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - names
 *               - lastnames
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del nuevo usuario
 *               names:
 *                 type: string
 *                 description: Nombres del nuevo usuario
 *               lastnames:
 *                 type: string
 *                 description: Apellidos del nuevo usuario
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del nuevo usuario
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de solicitud debido a datos faltantes o incorrectos
 *       500:
 *         description: Error del servidor
 */

async function POST(req, res) {
    try {
        const { username, names, lastnames, password } = req.body
        if (!username || !names || !lastnames || !password) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (username == '' || names =='' || lastnames == '' || password == '') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createUser(username,names,lastnames,password)
        
        return res.status(200).json('User created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Actualizar contraseña de usuario
 *     description: Actualiza la contraseña del usuario identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña de usuario actualizada exitosamente
 *       400:
 *         description: Error de solicitud debido a datos faltantes o incorrectos
 *       500:
 *         description: Error del servidor
 */

async function PUT(req, res) {
    try {
        const user_id = req.params.id
        const { password } = req.body
        if (!password ) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (password == '') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        await updateUser(user_id, password)

        return res.status(200).json('User updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Eliminar usuario
 *     description: Cambia el flag de un usaurio y este deja de ser visible por metodos tradicionales.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       500:
 *         description: Error del servidor
 */

async function DELETE(req, res) {
    try {
        const user_id = req.params.id
        await deleteUser(user_id)

        return res.status(200).json('User deleted')
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
