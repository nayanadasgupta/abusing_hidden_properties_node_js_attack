const express = require('express')
const router = express.Router()
const class_validator = require('../class-validator/class-validator_handling')

module.exports = router

router.post('/', async (req, res) => {
    let prom = class_validator.jsonHandle(req.body);
    let resolved = Promise.resolve(prom)
    resolved.then(function (values) {
        res.json(values);
    })
})