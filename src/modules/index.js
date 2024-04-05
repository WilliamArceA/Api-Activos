const categories = require('./categories')
const actives = require('./actives')
const location = require('./location')
const users =require('./users')
const roles = require('./roles')
const movement = require('./movement')
const log = require('./log')

function router(app){
    app.use(categories)
    app.use(actives)
    app.use(location)
    app.use(users)
    app.use(roles)
    app.use(movement)
    app.use(log)
}

module.exports = router