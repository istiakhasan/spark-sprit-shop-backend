import express from 'express'
import { orderController } from './order.controller'

const router = express.Router()
router.post('/create', orderController.createOrder)
router.post('/payment/success/:id', orderController.paymentSuccess)

export const OrderRouter = router
