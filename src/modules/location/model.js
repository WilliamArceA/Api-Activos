const { response } = require('express')
const pool = require('../../database')

async function getLocation() {
    const response = await pool.query(
        `select * from ubicacion where location_flag=true`
    )
    var result1 = response.rows
    return result1
}

async function getLocationById(loc_id) {
    const dat = await pool.query(
        `select * from ubicacion where location_id=$1`, 
        [loc_id]
    )
    response.datos = dat.rows
    return response.datos
}

async function createLocation(name,detail) {
    const response = await pool.query(
        `INSERT INTO ubicacion(location_name, location_detail, location_flag) VALUES ($1,$2, true);`,
        [name,detail]
    )
    return response.command
}

async function updateLocation(loc_id, name, detail) {
    const response = await pool.query(
        `UPDATE ubicacion SET location_name=$2, location_detail=$3 WHERE location_id=$1;`, 
    [loc_id,name,detail]
    )
    return response.command
}

async function deleteLocation(loc_id) {
    const response = await pool.query(
        `UPDATE ubicacion SET location_flag=false WHERE location_id=$1;`, 
        [loc_id]
    )
    return response.command
}

module.exports = {
    getLocation,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
}
