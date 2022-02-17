const express = require('express')
const router = express.Router()
const jpv_handle = require('../jpv/jpv_handling')
const payload_model = require('../models/payload.model')

module.exports = router

router.post('/Map', async (req, res) => {

    returnVal = await jpv_handle.checkJPVMap(req.body);
    res.json(returnVal);
    
})

router.post('/Array', async (req, res) => {

    returnVal = await jpv_handle.checkJPVArray(req.body);
    res.json(returnVal);
    
})

router.get('/', async(req, res) => {
    returnVal = await jpv_handle.exampleJPV();
    res.json(returnVal);
})