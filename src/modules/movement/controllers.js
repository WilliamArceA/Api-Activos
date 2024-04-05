const {
    getMovementsByLocation,
    getMovementsByActive,
    getMovementsById,
    createMovement,
    updateMovement,
    deleteMovement,
} = require('./model')

async function GET(req, res) {
    try {
        const filter = req.query.filter
        if(filter==undefined||filter=='')
        return res.status(400).json({ msg: 'Can not get, missing data' })
        if(filter=='Active'){
            const active = req.query.active
            if(active== '' ||!active)
            return res.status(400).json({ msg: 'Can not get, missing active filter' })
            const response = await getMovementsByActive(active)
            return res.status(200).json(response)
        }else{
            if(filter=='Location'){
                const location = req.query.location
                if(location== '' ||!location)
                return res.status(400).json({ msg: 'Can not get, missing location filter' })
                const response = await getMovementsByLocation(location)
                return res.status(200).json(response)
            }else{
                return res.status(500).json({ errorCode: error.code, msg: error.message })
            }
        }
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW(req, res) {
    try {
        const move_id = req.params.id
        const response = await getMovementsById(move_id)
        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function POST(req, res) {
    try {
        const {active_name, old_location, new_location, date,detail } = req.body
        if (!active_name || !old_location || !new_location || !detail) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if(active_name == '' || old_location == '' || new_location =='' || detail=='')
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createMovement(active_name, old_location, new_location, date, detail)
        return res.status(200).json('Movement created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function PUT(req, res) {
    try {
        const move_id = req.params.id
        const { detail } = req.body
        if (!detail) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if(detail == '')
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await updateMovement(move_id, detail)
        return res.status(200).json('Movement updated')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function DELETE(req, res) {
    try {
        const move_id = req.params.id
        await deleteMovement(move_id)
        return res.status(200).json('Movement deleted')
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
