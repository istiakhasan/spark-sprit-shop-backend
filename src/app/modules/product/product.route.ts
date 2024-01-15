import express from 'express'
import { productController } from './product.controller'
import auth from '../../middlewares/auth'
const router = express.Router()
router.post('/create', productController.createProduct)
router.patch('/update/:id', productController.updateProduct)
router.get('/all-products', productController.getAll)
router.get('/similar-product/:categoryid', productController.similarProduct)
router.get(
  '/productById',
  auth('customer', 'admin'),
  productController.getProductByUserId,
)
router.delete('/:id', productController.deleteProduct)
router.get('/:id', productController.getsingleProduct)

export const ProductRouter = router
