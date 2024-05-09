const express = require('express')
var cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
const modules = require('./modules')
const morgan = require('morgan')
const swaggerOptions = require('./swaggerOptions')
const swaggerEndpoint = '/swagger'

const port = process.env.PORT || 4000
const app = express()


const openapiSpec = swaggerJSDoc(swaggerOptions);

const init = async () => {
    app.use(express.json({ limit: '5mb' }))
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
    app.use(swaggerEndpoint, swaggerUi.serve, swaggerUi.setup(openapiSpec));

    if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

    modules(app)

    app.get('/favicon.ico', (req, res) => res.status(204))
    app.listen(port, () => console.log('Listening on http://localhost:' + port + '/'))
    console.log('SwaggerUi running at: http://localhost:'+port+swaggerEndpoint)
    
}

init()

module.exports = app