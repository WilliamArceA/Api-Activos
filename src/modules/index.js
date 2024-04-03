const categories = require('./categories')
const actives = require('./actives')
function router(app){
    app.use(categories)
    app.use(actives)
}

module.exports = router