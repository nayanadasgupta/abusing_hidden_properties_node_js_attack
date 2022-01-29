const express = require('express')
const router = express.Router()
module.exports = router

router.use('/payloads', require('./payload.routes'))
