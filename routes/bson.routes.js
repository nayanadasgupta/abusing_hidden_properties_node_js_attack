import { Router } from 'express'
const bson_router = Router()
import bson_handle from '../bson-objectid/attack.js'


export default bson_router

bson_router.post('/post', async (req, res) => {

    let returnVal = await bson_handle.jsonDemo(req.body);
    res.json(returnVal);

})
