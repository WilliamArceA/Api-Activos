const { Router } = require('express')
const router = Router()

const { GET, SHOW, POST, PUT, DELETE } = require('./controllers')

router.get('/location', GET)
router.get('/location/:id', SHOW)
router.post('/location', POST)
router.put('/location/:id', PUT)
router.delete('/location/:id', DELETE)
module.exports = router