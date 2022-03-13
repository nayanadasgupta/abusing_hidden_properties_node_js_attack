import * as express from 'express'
const router = express.Router()
export default router

import component_router from './component_type_routes.js'
import jpv_router from './jpv.routes.js'
import bson_router from './bson.routes.js'
import kind_of_router from './kindof.routes.js'
import class_val_router from './class-validator.routes.js'


router.use('/component_type', component_router)
router.use('/jpv', jpv_router)
router.use('/bson', bson_router)
router.use('/kindof', kind_of_router)
router.use('/class-validator', class_val_router)
