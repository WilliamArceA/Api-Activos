const {
    getLogsByAction,
    getLogsByTable,
    getLogsByDate,
    getLogByid,
} = require('./model')

async function GET(req, res) {
    try {
        const filter = req.query.filter
        if(filter==undefined||filter=='')
        return res.status(400).json({ msg: 'Can not get, missing data' })
        if(filter=='Action'){
            const action = req.query.action
            if(action== '' ||!action)
            return res.status(400).json({ msg: 'Can not get, missing action filter' })
            const actionConverted = action.toUpperCase();
            const response = await getLogsByAction(actionConverted)
            return res.status(200).json(response)
        }else{
            if(filter=='Table'){
                const table = req.query.table
                if(table== '' ||!table)
                return res.status(400).json({ msg: 'Can not get, missing table filter' })
                const tableConverted = table.toLowerCase();
                const response = await getLogsByTable(tableConverted)
                return res.status(200).json(response)
            }else{
                if(filter=='Date'){
                    const start = req.query.start
                    const end = req.query.end
                    if(start== '' ||!start || end== '' ||!end)
                    return res.status(400).json({ msg: 'Can not get, missing date filter' })
                    const response = await getLogsByDate(start, end)
                    return res.status(200).json(response)
                }else{
                    return res.status(500).json({ errorCode: error.code, msg: error.message })
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

async function SHOW(req, res) {
    try {
        const log_id = req.params.id
        const response = await getLogByid(log_id)
        return res.status(200).json(response)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}



module.exports = {
    GET,
    SHOW,
}
