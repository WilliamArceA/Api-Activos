const { response } = require('express')
const pool = require('../../database')

async function getRoles() {
    const response = await pool.query(
        `select * from rol where role_flag=true`
    )
    var result1 = response.rows
    return result1
}

async function getRoleById(role_id) {
    const dat = await pool.query(
        `select * from rol where role_id=$1`, 
        [role_id]
    )
    response.datos = dat.rows
    return response.datos
}

async function createRole(role_name) {
    const response = await pool.query(
        `INSERT INTO rol(role_name, role_flag)VALUES ($1, true);`,
        [role_name]
    )
    return response.command
}

async function updateRole(role_id, role_name) {
    const response = await pool.query(
        `UPDATE rol SET role_name=$2 WHERE role_id=$1;`, 
    [role_id,role_name,]
    )
    return response.command
}

async function deleteRole(role_id) {
    const response = await pool.query(
        `UPDATE rol SET role_flag=false WHERE role_id=$1;`, 
        [role_id]
    )
    return response.command
}

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
}
