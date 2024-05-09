const { Router } = require('express')
const router = Router()

const { GET, POST, PUT, DELETE } = require('./controllers')

router.get('/usersPerRole', GET)
router.post('/usersPerRole', POST)
router.put('/usersPerRole/:id', PUT)
router.delete('/usersPerRole/:id', DELETE)
module.exports = router