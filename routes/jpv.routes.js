import { Router } from 'express'
const jpv_router = Router()
import jpv_handle from '../jpv/jpv_handling.js'

export default jpv_router

jpv_router.post('/Map', async (req, res) => {

    let returnVal = await jpv_handle.checkJPVMapOrig(req.body);
    res.json(returnVal);
    
})

jpv_router.post('/Array', async (req, res) => {

    let returnVal = await jpv_handle.checkJPVArrayOrig(req.body);
    res.json(returnVal);
    
})

jpv_router.get('/', async(req, res) => {
    let returnVal = await jpv_handle.exampleJPV();
    res.json(returnVal);
})
