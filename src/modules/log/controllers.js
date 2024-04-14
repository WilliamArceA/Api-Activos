const {
    getLogsByAction,
    getLogsByTable,
    getLogsByDate,
    getLogByid,
} = require('./model')

/**
 * @swagger
 * tags:
 *   name: Log
 *   description: Endpoints relacionados con el log de la API
 */

/**
 * @swagger
 * /log:
 *   get:
 *     tags: [Log]
 *     summary: Obtiene registros de log filtrados.
 *     description: Obtiene registros de log filtrados por acción, tabla o rango de fechas.
 *     parameters:
 *       - in: query
 *         name: filter
 *         required: true
 *         description: Tipo de filtro a aplicar (Action, Table o Date).
 *         schema:
 *           type: string
 *           enum: [Action, Table, Date]
 *       - in: query
 *         name: action
 *         required: false
 *         description: Tipo de acción a filtrar, solo si se selecciona el filtro Action.
 *         schema:
 *           type: string
 *           enum: [INSERT, UPDATE]
 *       - in: query
 *         name: table
 *         required: false
 *         description: Tabla a filtrar, solo si se selecciona el filtro Table.
 *         schema:
 *           type: string
 *           enum: [categoria, ubicacion, activos, movimiento, rol, usuario]
 *       - in: query
 *         name: start
 *         required: false
 *         description: Fecha de inicio del rango, solo si se selecciona el filtro Date, se debe seguir el formato 'yyyy-mm-dd'.
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end
 *         required: false
 *         description: Fecha de fin del rango, solo si se selecciona el filtro Date, se debe seguir el formato 'yyyy-mm-dd'.
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: Registros de log obtenidos exitosamente.
 *       '400':
 *         description: Petición inválida debido a datos faltantes o incorrectos.
 *       '500':
 *         description: Error interno del servidor.
 */

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
        }else if(filter=='Table'){
                const table = req.query.table
                if(table== '' ||!table)
                return res.status(400).json({ msg: 'Can not get, missing table filter' })
                const tableConverted = table.toLowerCase();
                const response = await getLogsByTable(tableConverted)
                return res.status(200).json(response)
            }else if(filter=='Date'){
                    const start = req.query.start
                    const end = req.query.end
                    if(start== '' ||!start || end== '' ||!end)
                    return res.status(400).json({ msg: 'Can not get, missing date filter' })
                    const response = await getLogsByDate(start, end)
                    return res.status(200).json(response)
                }else{
                    return res.status(500).json({ errorCode: error.code, msg: error.message })
                }
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /log/{id}:
 *   get:
 *     tags: [Log]
 *     summary: Obtiene un registro de log por su ID.
 *     description: Obtiene un registro de log específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del registro de log a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Registro de log obtenido exitosamente.
 *       '500':
 *         description: Error interno del servidor.
 */

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
