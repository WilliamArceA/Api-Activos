const categories = require('./categories')

function router(app){
    app.use(categories)
}

module.exports = router