const express = require('express')
const router = express.Router()
const component_type = require('../component_type/component_type_handling')
const payload_model = require('../models/payload.model')

module.exports = router

router.post('/', async (req, res) => {
    typeString =  await component_type.runComponent(req.body);
    
    res.json(typeString);
    
    
})

router.post('/valoffix', async (req, res) => {
    typeString =  await component_type.demoValOfFix(req.body);
    
    res.json(typeString);
    
    
})

router.get('/', async (req, res) => {
    result = await component_type.demo1()
    console.log(result);
    res.json(result);
})

router.post('/supplychain', async (req, res) => {
    result = await component_type.demoSupplyChain(req.body);
    res.json(result);
})