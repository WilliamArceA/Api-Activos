const { Router } = require('express')
const router = Router()

const { GET, SHOW} = require('./controllers')

router.get('/log', GET)
router.get('/log/:id', SHOW)

module.exports = router