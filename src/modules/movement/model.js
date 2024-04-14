const { response } = require('express')
const pool = require('../../database')

async function getMovementsByActive(active) {
    let query =  `select move_id, move_date, move_detail, location_name
	                from(select move_id, old_location_id, new_location_id, move_date, move_detail
		                from(select active_id
			                from activos
			                where active_name='`+active+`')as uno, movimiento
		                where uno.active_id=movimiento.active_id AND move_flag=true)as dos, ubicacion
	                where dos.old_location_id=ubicacion.location_id OR dos.new_location_id=ubicacion.location_id`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function getMovementsByLocation(location) {
    let query =  `      select move_id, active_name, move_date, move_detail
	                    from(select *
		                    from(select location_id
			                    from ubicacion
			                    where location_name='`+location+`')as uno,movimiento 
		                    where uno.location_id=movimiento.old_location_id OR uno.location_id=movimiento.new_location_id AND move_flag=true)as dos, activos
	                    where dos.active_id=activos.active_id`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function getMovementsById(move_id) {
    const dat = await pool.query(
        `select * from movimiento where move_id=$1`, 
        [move_id]
    )
    response.datos = dat.rows
    return response.datos
}

async function createMovement(active_name, old_location, new_location, move_date, detail) {
    const response = await pool.query(
        `INSERT INTO movimiento(active_id, old_location_id, new_location_id, move_date, move_detail, move_flag)
        VALUES ((select active_id from activos where active_name=$1), 
                (select location_id from ubicacion where location_name=$2), 
                (select location_id from ubicacion where location_name=$3), 
                $4, $5, true);`,
        [active_name,old_location,new_location,move_date, detail]
    )
    return response.command
}

async function updateMovement(move_id, detail) {
    const response = await pool.query(
        `UPDATE movimiento SET move_detail=$2
        WHERE move_id=$1;`, 
    [move_id, detail]
    )
    return response.command
}

async function deleteMovement(move_id) {
    const response = await pool.query(
        `UPDATE movimiento SET move_flag=false
        WHERE move_id=$1;`, 
        [move_id]
    )
    return response.command
}

module.exports = {
    getMovementsByActive,
    getMovementsByLocation,
    getMovementsById,
    createMovement,
    updateMovement,
    deleteMovement,
}
