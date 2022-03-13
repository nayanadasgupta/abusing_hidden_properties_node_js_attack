import { Router } from 'express'
const component_router = Router()
import component_type from '../component_type/component_type_handling.js'

export default component_router

component_router.post('/', async (req, res) => {
    let typeString =  await component_type.runComponent(req.body);
    
    res.json(typeString);
    
    
})

component_router.post('/valoffix', async (req, res) => {
    let typeString =  await component_type.demoValOfFix(req.body); 
    res.json(typeString);
})

component_router.get('/', async (req, res) => {
    let result = await component_type.demo1()
    res.json(result);
})

component_router.post('/supplychain', async (req, res) => {
    let result = await component_type.demoSupplyChain(req.body);
    res.json(result);
})
