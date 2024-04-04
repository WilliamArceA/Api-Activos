const { response } = require('express')
const pool = require('../../database')

async function getUser() {
    const response = await pool.query(
        `select * from usuario where user_flag=true`
    )
    var result1 = response.rows
    return result1
}

async function getUserById(user_id) {
    const dat = await pool.query(
        `select * from usuario where user_id=$1`, 
        [user_id]
    )
    response.datos = dat.rows
    return response.datos
}

async function createUser(username,names,lastnames,password) {
    const response = await pool.query(
        `INSERT INTO usuario(username, names, lastnames, password, user_flag)
        VALUES ($1,$2, $3, $4,true)`,
        [username,names,lastnames,password]
    )
    return response.command
}

async function updateUser(user_id, password) {
    const response = await pool.query(
        `UPDATE usuario SET password=$2 WHERE user_id=$1;`, 
    [user_id,password]
    )
    return response.command
}

async function deleteUser(user_id) {
    const response = await pool.query(
        `UPDATE usuario SET user_flag=false WHERE user_id=$1;`, 
        [user_id]
    )
    return response.command
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
