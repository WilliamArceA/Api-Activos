const { response } = require('express')
const pool = require('../../database')

async function getUsersPerRole(name) {
    let query =  `select usuario.user_id, user_role_flag, username	
                    from(select user_id, user_role_flag
                        from(select role_id
                             from rol
                            where role_name='`+name+`')as uno, usuario_rol
                        where uno.role_id=usuario_rol.role_id and user_role_flag=true)as dos, usuario
                    where dos.user_id=usuario.user_id `
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function getRolesPerUser(name) {
    let query =  `select rol.role_id, user_role_flag, role_name
                    from(select role_id, user_role_flag
                        from(select user_id
                            from usuario
                            where username='`+name+`')as uno, usuario_rol
                        where uno.user_id=usuario_rol.user_id and user_role_flag=true)as dos, rol
                    where dos.role_id = rol.role_id`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

async function createRolePerUser(username,role_name) {
    const response = await pool.query(
        `INSERT INTO usuario_rol(role_id, user_id, user_role_flag)
        VALUES ((select role_id from rol where role_name=$2), 
                (select user_id from usuario where username=$1), true);`,
        [username,role_name]
    )
    return response.command
}

async function updateRolePerUser(user_id, old_role_name, new_role_name) {
    const response = await pool.query(
        `UPDATE usuario_rol SET role_id=(select role_id from rol where role_name=$3)
        WHERE user_id=$1 and role_id=(select role_id from rol where role_name=$2);`, 
    [user_id,old_role_name,new_role_name]
    )
    return response.command
}

async function deleteRolePerUser(user_id,role_id) {
    let query =  `UPDATE usuario_rol SET user_role_flag=false
                    WHERE user_id='`+user_id+`' and role_id='`+role_id+`';`
    const dat = await pool.query(query)
    response.datos=dat.rows
    return response
}

module.exports = {
    getUsersPerRole,
    getRolesPerUser,
    createRolePerUser,
    updateRolePerUser,
    deleteRolePerUser,
}
