const {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('./model')

async function GET(req, res) {
    try {
        const response = await getCategory()

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

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
