const { Router } = require('express')
const router = Router()

const { GET, SHOW, POST, PUT, DELETE } = require('./controllers')

router.get('/actives', GET)
router.get('/actives/:id', SHOW)
router.post('/actives', POST)
router.put('/actives/:id', PUT)
router.delete('/actives/:id', DELETE)
module.exports = router