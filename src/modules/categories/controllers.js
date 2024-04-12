const {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('./model')

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints relacionados con las categorias de los activos
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Obtiene todas las categorías.
 *     description: Retorna una lista de todas las categorías disponibles.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve la lista de categorías.
 *       '500':
 *         description: Error interno del servidor.
 */

async function GET(req, res) {
    try {
        const response = await getCategory()

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Obtiene una categoría por su ID.
 *     description: Retorna una categoría específica según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve la categoría solicitada.
 *       '500':
 *         description: Error interno del servidor.
 */

async function SHOW(req, res) {
    try {
        const cat_id = req.params.id
        const response = await getCategoryById(cat_id)

        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /categories:
 *   post:
 *     tags: [Categories]
 *     summary: Crea una nueva categoría.
 *     description: Crea una nueva categoría con el nombre proporcionado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cat_name:
 *                 type: string
 *                 description: Nombre de la categoría a crear.
 *     responses:
 *       '200':
 *         description: Categoría creada con éxito.
 *       '400':
 *         description: Falta colocar atributos.
 *       '500':
 *         description: Error interno del servidor.
 */


async function POST(req, res) {
    try {
        const { cat_name } = req.body
        if (!cat_name) return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createCategory(cat_name)
        
        return res.status(200).json('Category created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Actualiza una categoría existente.
 *     description: Actualiza el nombre de una categoría existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cat_name:
 *                 type: string
 *                 description: Nuevo nombre de la categoría.
 *     responses:
 *       '200':
 *         description: Categoría actualizada con éxito.
 *       '400':
 *         description: Falta colocar atributos.
 *       '500':
 *         description: Error interno del servidor.
 */

async function PUT(req, res) {
    try {
        const id = req.params.id
        const { cat_name } = req.body
        if (!cat_name) return res.status(400).json({ msg: 'Complete todos los datos' })

        await updateCategory(id, cat_name)

        return res.status(200).json('Category updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Elimina una categoría existente.
 *     description: Cambia el flag de una categoria y esta deja de ser visible por metodos tradicionales.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Categoría eliminada con éxito.
 *       '500':
 *         description: Error interno del servidor.
 */

async function DELETE(req, res) {
    try {
        const id = req.params.id
        await deleteCategory(id)

        return res.status(200).json('Category deleted')
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
