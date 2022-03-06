const express = require('express')
const router = express.Router()
const bson_handle = require('../bson-objectid/attack')


module.exports = router

router.post('/post', async (req, res) => {

    returnVal = await bson_handle.jsonDemo(req.body);
    res.json(returnVal);

})