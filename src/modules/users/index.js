const { Router } = require('express')
const router = Router()

const { GET, SHOW, POST, PUT, DELETE } = require('./controllers')

router.get('/users', GET)
router.get('/users/:id', SHOW)
router.post('/users', POST)
router.put('/users/:id', PUT)
router.delete('/users/:id', DELETE)
module.exports = router