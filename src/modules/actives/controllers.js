const swaggerJSDoc = require('swagger-jsdoc')
const {
    getActives,
    getActivesByCategory,
    getActivesById,
    createActive,
    updateActive,
    deleteActive,
} = require('./model')

/**
 * @swagger
 * tags:
 *   name: Actives
 *   description: Endpoints relacionados con los activos
 */

/**
 * @swagger
 * /actives:
 *   get:
 *     tags: [Actives]
 *     summary: Obtener todos los activos o aplicar un filtro por categoria
 *     description: Retorna una lista de activos filtrada según el estado y categoría.
 *     parameters:
 *       - in: query
 *         name: filter
 *         required: true
 *         description: Filtrar activos por estado, si se coloca "Off" el valor category no debe introducirse.
 *         schema:
 *           type: string
 *           enum: [On, Off]
 *       - in: query
 *         name: category
 *         required: false
 *         description: Filtrar activos por el nombre categoría, solo introducir un valor si filter esta en "On".
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Operación exitosa
 *       '400':
 *         description: Falta colocar parametros
 *       '500': 
 *         description: Error de servidor desconocido
 */

async function GET(req, res) {
    try {
        const filter = req.query.filter
        if(filter==undefined)
            return res.status(400).json({ msg: 'Can not get, missing data' })
        if(filter=='Off'){
            const response = await getActives()
            return res.status(200).json(response)
        }else{
            if(filter=='On'){
                const category = req.query.category
                if(category=='' ||!category)
                return res.status(400).json({ msg: 'Can not get, missing data' })
                const response = await getActivesByCategory(category)
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
 * /actives/{id}:
 *   get:
 *     tags: [Actives]
 *     summary: Obtener un activo por su ID
 *     description: Retorna los detalles de un activo específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del activo a obtener.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Operación exitosa.
 *       '404':
 *         description: Activo no encontrado.
 *       '500': 
 *         description: Error de servidor desconocido.
 */

async function SHOW(req, res) {
    try {
        const active_id = req.params.id
        const response = await getActivesById(active_id)
        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /actives:
 *   post:
 *     tags: [Actives]
 *     summary: Crear un nuevo activo
 *     description: Crea un nuevo activo con los atributos especificados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: Nombre de la categoría del activo, se debe introducir el nombre exacto de una categoria existente.
 *               name:
 *                 type: string
 *                 description: Nombre del activo.
 *               description:
 *                 type: string
 *                 description: Descripción del activo.
 *               stock:
 *                 type: integer
 *                 description: Cantidad de stock del activo.
 *             required:
 *               - category_name
 *               - name
 *               - description
 *               - stock 
 *     responses:
 *       '200':
 *         description: Operación exitosa
 *       '400':
 *         description: Falta colocar atributos
 *       '500': 
 *         description: Error de servidor desconocido
 */

async function POST(req, res) {
    try {
        const {category_name, name, description, stock } = req.body
        if (!category_name || !name || !description || !stock) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if(category_name == '' || name == '' || description =='' || stock=='')
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createActive(category_name, name, description, stock)
        return res.status(200).json('Active created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /actives/{id}:
 *   put:
 *     tags: [Actives]
 *     summary: Actualizar un activo existente por ID.
 *     description: Actualiza los atributos de un activo existente basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del activo a actualizar.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del activo.
 *               description:
 *                 type: string
 *                 description: Nueva descripción del activo.
 *               stock:
 *                 type: integer
 *                 description: Nueva cantidad de stock del activo.
 *             required:
 *               - name
 *               - description
 *               - stock
 *     responses:
 *       '200':
 *         description: Activo actualizado exitosamente.
 *       '400':
 *         description: Datos incompletos o incorrectos.
 *       '404':
 *         description: Activo no encontrado.
 *       '500':
 *         description: Error interno del servidor.
 */

async function PUT(req, res) {
    try {
        const active_id = req.params.id
        const { name, description, stock } = req.body
        if (!name || !description || !stock) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if(name == '' || description =='' || stock=='')
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await updateActive(active_id, name, description, stock)
        return res.status(200).json('Active updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /actives/{id}:
 *   delete:
 *     tags: [Actives]
 *     summary: Eliminar un activo por su ID
 *     description: Cambia el flag de un activo y este deja de ser visible por metodos tradicionales.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del activo a eliminar.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Operación exitosa.
 *       '404':
 *         description: Activo no encontrado.
 *       '500': 
 *         description: Error de servidor desconocido.
 */

async function DELETE(req, res) {
    try {
        const active_id = req.params.id
        await deleteActive(active_id)
        return res.status(200).json('Active deleted')
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
