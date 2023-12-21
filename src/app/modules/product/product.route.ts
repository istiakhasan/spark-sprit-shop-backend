import express from 'express'
import { productController } from './product.controller'
const router = express.Router()
router.post('/create', productController.createProduct)
router.get('/all-products', productController.getAll)

export const ProductRouter = router