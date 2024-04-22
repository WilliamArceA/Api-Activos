const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: '192.168.137.2',
    port: 5432,
    database: 'Activos',
})

module.exports = pool
