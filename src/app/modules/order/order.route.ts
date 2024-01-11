import express from 'express'
import { orderController } from './order.controller'
import auth from '../../middlewares/auth'

const router = express.Router()
router.post('/create', orderController.createOrder)
router.get('/getAllOrders', orderController.getAllOrders)
router.get('/order-summary/:id', orderController.orderSummary)
router.get(
  '/getOrderById',
  auth('customer', 'admin'),
  orderController.getOrderById,
)
router.post('/payment/success/:id', orderController.paymentSuccess)
router.patch('/updatestatus/:id', orderController.updateStatus)

export const OrderRouter = router
