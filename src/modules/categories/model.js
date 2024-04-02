const { response } = require('express')
const pool = require('../../database')

async function getCategory() {
    const response = await pool.query(
        `select * from categoria where category_flag=true`
    )
    var result1 = response.rows
    return result1
}

async function getCategoryById(cat_id) {
    const dat = await pool.query(
        `select * from categoria where category_id=$1`, 
        [cat_id]
    )
    response.datos = dat.rows
    return response.datos
}

async function createCategory(cat_name) {
    const response = await pool.query(
        `INSERT INTO categoria(category_name, category_flag)VALUES ($1, true);`,
        [cat_name]
    )
    return response.command
}

async function updateCategory(id, cat_name) {
    const response = await pool.query(
        `UPDATE categoria SET category_name=$2 WHERE category_id=$1;`, 
    [id,cat_name,]
    )
    return response.command
}

async function deleteCategory(id) {
    const response = await pool.query(
        `UPDATE categoria SET category_flag=false WHERE category_id=$1;`, 
        [id]
    )
    return response.command
}

module.exports = {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}
