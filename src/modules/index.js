const categories = require('./categories')
const actives = require('./actives')
const location = require('./location')

function router(app){
    app.use(categories)
    app.use(actives)
    app.use(location)
}

module.exports = router