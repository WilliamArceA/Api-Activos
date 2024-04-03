const { response } = require('express')
const pool = require('../../database')

async function getActives() {
    const response = await pool.query(
        `select * from activos where active_flag=true`
    )
    var result1 = response.rows
    return result1
}

async function getActivesByCategory(category) {
    let query =  `select *
                    from(select category_id
                        from categoria
                        where category_name='`+category+`')as uno, activos
                        where uno.category_id = activos.category_id and active_flag=true`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function getActivesById(active_id) {
    const dat = await pool.query(
        `select * from activos where active_id=$1`, 
        [active_id]
    )
    response.datos = dat.rows
    return response.datos
}

async function createActive(category_name, name, description, stock) {
    const response = await pool.query(
        `INSERT INTO activos(category_id, active_name, active_description, active_stock, active_flag)
        VALUES ((select category_id from categoria where category_name=$1) ,$2, $3, $4, true);`,
        [category_name,name,description,stock]
    )
    return response.command
}

async function updateActive(active_id, name, description, stock) {
    const response = await pool.query(
        `UPDATE activos SET active_name=$2, active_description=$3, active_stock=$4
        WHERE active_id=$1;`, 
    [active_id, name, description, stock]
    )
    return response.command
}

async function deleteActive(active_id) {
    const response = await pool.query(
        `UPDATE activos SET active_flag=false 
        WHERE active_id=$1;`, 
        [active_id]
    )
    return response.command
}

module.exports = {
    getActives,
    getActivesByCategory,
    getActivesById,
    createActive,
    updateActive,
    deleteActive,
}
