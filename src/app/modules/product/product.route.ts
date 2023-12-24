import express from 'express'
import { productController } from './product.controller'
const router = express.Router()
router.post('/create', productController.createProduct)
router.get('/all-products', productController.getAll)
router.delete('/:id', productController.deleteProduct)
router.get('/:id', productController.getsingleProduct)

export const ProductRouter = router
