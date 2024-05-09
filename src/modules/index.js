const categories = require('./categories')
const actives = require('./actives')
const location = require('./location')
const users =require('./users')
const roles = require('./roles')
const movement = require('./movement')
const log = require('./log')
const userPerLocation = require('./userPerLocation')
const userPerRole = require('./userPerRole')

function router(app){
    app.use(categories)
    app.use(actives)
    app.use(location)
    app.use(users)
    app.use(roles)
    app.use(movement)
    app.use(log)
    app.use(userPerLocation)
    app.use(userPerRole)
}

module.exports = router