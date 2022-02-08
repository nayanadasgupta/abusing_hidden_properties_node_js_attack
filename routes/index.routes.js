const express = require('express')
const router = express.Router()
module.exports = router

router.use('/payloads', require('./payload.routes'))
router.use('/component_type', require('./component_type_routes'))

