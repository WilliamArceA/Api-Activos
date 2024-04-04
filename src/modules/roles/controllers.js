const {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
} = require('./model')

async function GET(req, res) {
    try {
        const response = await getRoles()

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

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
