const {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('./model')

async function GET(req, res) {
    try {
        const response = await getUser()

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

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
