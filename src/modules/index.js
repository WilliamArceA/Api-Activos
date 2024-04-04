const categories = require('./categories')
const actives = require('./actives')
const location = require('./location')
const users =require('./users')
const roles = require('./roles')

function router(app){
    app.use(categories)
    app.use(actives)
    app.use(location)
    app.use(users)
    app.use(roles)
}

module.exports = router