import { Router } from 'express'
const class_val_router = Router()
import class_validator from '../class-validator/class-validator_handling.js'

export default class_val_router

class_val_router.post('/', async (req, res) => {
    let prom = class_validator.jsonHandle(req.body);
    let resolved = Promise.resolve(prom)
    resolved.then(function (values) {
        res.json(values);
    })
})
