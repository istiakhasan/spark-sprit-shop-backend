import express from 'express'
import { orderLogController } from './orderLog.controller'
const router = express.Router()
router.post('/create', orderLogController.createOrderLogById)
router.get('/:id', orderLogController.getOrderLogById)

export const orderLogRouter = router
