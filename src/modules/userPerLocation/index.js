const { Router } = require('express')
const router = Router()

const { GET, POST, PUT, DELETE } = require('./controllers')

router.get('/usersPerLocation', GET)
router.post('/usersPerLocation', POST)
router.put('/usersPerLocation/:id', PUT)
router.delete('/usersPerLocation/:id', DELETE)
module.exports = router