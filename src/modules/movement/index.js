const { Router } = require('express')
const router = Router()

const { GET, SHOW, POST, PUT, DELETE } = require('./controllers')

router.get('/movement', GET)
router.get('/movement/:id', SHOW)
router.post('/movement', POST)
router.put('/movement/:id', PUT)
router.delete('/movement/:id', DELETE)
module.exports = router