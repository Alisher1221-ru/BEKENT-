import { Router } from 'express'
import {getProduct,postProduct} from '../controller/product.cotroller.js'

const routerProduct = Router()

routerProduct.get('/', getProduct)
routerProduct.post('/', postProduct)

export default routerProduct