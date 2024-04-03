const {
    getLocation,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
} = require('./model')

async function GET(req, res) {
    try {
        const response = await getLocation()

        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

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

async function POST(req, res) {
    try {
        const { name, detail } = req.body
        if (!name || !detail) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (name == '' || detail =='') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createLocation(name,detail)
        
        return res.status(200).json('Location created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT(req, res) {
    try {
        const loc_id = req.params.id
        const { name, detail } = req.body
        if (!name || !detail) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if (name == '' || detail == '') 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        await updateLocation(loc_id, name, detail)

        return res.status(200).json('Location updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

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
