const { response } = require('express')
const pool = require('../../database')

async function getUsersPerLocation(name) {
    let query =  `select  usuario.user_id, user_location_flag, username
	                from(select user_id, user_location_flag
		                from(select location_id
			                from ubicacion
			                where location_name='`+name+`')as uno, usuario_ubicacion
		                where uno.location_id = usuario_ubicacion.location_id and user_location_flag=true)as dos, usuario
	                where dos.user_id= usuario.user_id`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function getLocationsPerUser(name) {
    let query =  `select  ubicacion.location_id, user_location_flag, location_name
	                from(select location_id, user_location_flag
		                from(select user_id
			                from usuario
			                where username='`+name+`')as uno, usuario_ubicacion
		                where uno.user_id = usuario_ubicacion.user_id and user_location_flag=true)as dos, ubicacion
	                where dos.location_id= ubicacion.location_id`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function createLocationPerUser(username,location_name) {
    const response = await pool.query(
        `INSERT INTO usuario_ubicacion(user_id, location_id, user_location_flag)
        VALUES ((select user_id from usuario where username=$1), 
                (select location_id from ubicacion where location_name=$2), true);`,
        [username,location_name]
    )
    return response.command
}

async function updateLocationPerUser(user_id, old_location_name, new_location_name) {
    const response = await pool.query(
        `UPDATE usuario_ubicacion SET location_id=(select location_id from ubicacion where location_name=$3)
        WHERE user_id=$1 and location_id=(select location_id from ubicacion where location_name=$2);`, 
    [user_id,old_location_name,new_location_name]
    )
    return response.command
}

async function deleteLocationPerUser(user_id,location_id) {
    let query =  `UPDATE usuario_ubicacion SET user_location_flag=false
                    WHERE user_id='`+user_id+`' and location_id='`+location_id+`';`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

module.exports = {
    getUsersPerLocation,
    getLocationsPerUser,
    createLocationPerUser,
    updateLocationPerUser,
    deleteLocationPerUser,
}
