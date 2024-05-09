const {
    getMovementsByLocation,
    getMovementsByActive,
    getMovementsById,
    createMovement,
    updateMovement,
    deleteMovement,
} = require('./model')

/**
 * @swagger
 * tags:
 *   name: Movements
 *   description: Endpoints relacionados con los movimientos de activos.
 */

/**
 * @swagger
 * /movement:
 *   get:
 *     tags: [Movements]
 *     summary: Obtener movimientos de activos filtrados
 *     description: Retorna los movimientos filtrados por activo o ubicación.
 *     parameters:
 *       - in: query
 *         name: filter
 *         description: Filtro para activo o ubicación
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Active, Location]
 *       - in: query
 *         name: active
 *         description: Nombre del activo, debe ser el nombre de un activo existente en la BD (requerido si filter es "Active")
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         description: Nombre de la ubicación, debe ser el nombre de una ubicacion existente en la BD (requerido si filter es "Location")
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movimientos obtenidos exitosamente
 *       400:
 *         description: Datos faltantes o inválidos
 *       500:
 *         description: Error del servidor
 */

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

/**
 * @swagger
 * /movement/{id}:
 *   get:
 *     tags: [Movements]
 *     summary: Obtener un movimiento de un activo especifico por su ID
 *     description: Retorna un movimiento de un activo específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del movimiento a obtener
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimiento obtenido exitosamente
 *       500:
 *         description: Error del servidor
 */

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

/**
 * @swagger
 * /movement:
 *   post:
 *     tags: [Movements]
 *     summary: Crear un nuevo movimiento de un activo.
 *     description: Crea un nuevo movimiento de un activo con los detalles proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active_name:
 *                 type: string
 *                 description: Nombre del activo involucrado en el movimiento. Debe ser el nombre de un activo existente en la API.
 *               old_location:
 *                 type: string
 *                 description: Ubicación anterior del activo. Debe ser el nombre de una ubicacion existente en la API.
 *               new_location:
 *                 type: string
 *                 description: Nueva ubicación del activo. Debe ser el nombre de una ubicacion existente en la API.
 *               move_date:
 *                 type: string
 *                 format: date
 *                 description: Fecha del movimiento, debe serguir el formato 'yyyy-mm-dd'.
 *                 example: "yyyy-mm-dd"
 *               detail:
 *                 type: string
 *                 description: Detalle del movimiento.
 *     responses:
 *       201:
 *         description: Movimiento creado exitosamente.
 *       400:
 *         description: Datos de entrada incorrectos o faltantes.
 *       500:
 *         description: Error del servidor.
 */


async function POST(req, res) {
    try {
        const {active_name, old_location, new_location, move_date,detail } = req.body
        if (!active_name || !old_location || !new_location ||!move_date ||!detail) 
        return res.status(400).json({ msg: 'Complete todos los datos' })
        if(active_name == '' || old_location == '' || new_location =='' || move_date=='' ||detail=='')
        return res.status(400).json({ msg: 'Complete todos los datos' })
        const response = await createMovement(active_name, old_location, new_location, move_date, detail)
        return res.status(200).json('Movement created')
    } catch (error) {
        return res.status(500).json({ errorCode: error.code, msg: error.message })
    }
}

/**
 * @swagger
 * /movement/{id}:
 *   put:
 *     tags: [Movements]
 *     summary: Actualizar un movimiento de un activo existente
 *     description: Actualiza los detalles de un movimiento específico identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del movimiento a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detail:
 *                 type: string
 *                 description: Nuevo detalle del movimiento
 *     responses:
 *       200:
 *         description: Movimiento actualizado exitosamente
 *       400:
 *         description: Datos de entrada incorrectos o faltantes
 *       500:
 *         description: Error del servidor
 */

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

/**
 * @swagger
 * /movement/{id}:
 *   delete:
 *     tags: [Movements]
 *     summary: Eliminar un movimiento existente
 *     description: Cambia el flag de un movimiento y este deja de ser visible por metodos tradicionales.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del movimiento a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movimiento eliminado exitosamente
 *       500:
 *         description: Error del servidor
 */

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
