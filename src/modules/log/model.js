const { response } = require('express')
const pool = require('../../database')

async function getLogsByAction(action) {
    let query =  `select * from log_bd where "type"='`+action+`'`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function getLogsByTable(table) {
    let query =  `select * from log_bd where "TABLE"='`+table+`'`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function getLogsByDate(start,end) {
    let query =  `SELECT * FROM log_bd WHERE "DATE" BETWEEN '`+start+`' AND '`+end+`'`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function getLogByid(log_id) {
    const dat = await pool.query(
        `select * from log_bd where id_log=$1`, 
        [log_id]
    )
    response.datos = dat.rows
    return response.datos
}



module.exports = {
    getLogsByAction,
    getLogsByTable,
    getLogsByDate,
    getLogByid,
}
