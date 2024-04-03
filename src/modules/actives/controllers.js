const {
    getActives,
    getActivesById,
    createActive,
    updateActive,
    deleteActive,
} = require('./model')

async function GET(req, res) {
    try {
        const response = await getActives()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

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
