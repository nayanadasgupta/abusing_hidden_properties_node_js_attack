import { Router } from 'express'
const kind_of_router = Router()
import kindof_handle from '../kind_of/attack.js'


export default kind_of_router

kind_of_router.post('/', async (req, res) => {

    let returnVal = await kindof_handle.jsonDemo(req.body);
    res.json(returnVal);

})
