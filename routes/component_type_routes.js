const express = require('express')
const router = express.Router()
const component_type = require('../component_type/component_type_handling')
const payload_model = require('../models/payload.model')

module.exports = router

router.post('/', async (req, res) => {
    typeString =  await component_type.runComponent(req.body);
    res.json(typeString);
    
    
})

router.get('/', async (req, res) => {
    payloads = await payload_model.getApplicationPayload('component_type');
    console.log("running type checker");
    typeString =  await component_type.runComponent(payloads);
    res.json(typeString);
    
    
})