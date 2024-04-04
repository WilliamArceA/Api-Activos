const { Router } = require('express')
const router = Router()

const { GET, SHOW, POST, PUT, DELETE } = require('./controllers')

router.get('/roles', GET)
router.get('/roles/:id', SHOW)
router.post('/roles', POST)
router.put('/roles/:id', PUT)
router.delete('/roles/:id', DELETE)
module.exports = router