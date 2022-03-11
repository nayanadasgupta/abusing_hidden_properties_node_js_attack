const express = require('express')
const router = express.Router()
const kindof_handle = require('../kind_of/attack')


module.exports = router

router.post('/', async (req, res) => {

    returnVal = await kindof_handle.jsonDemo(req.body);
    res.json(returnVal);

})