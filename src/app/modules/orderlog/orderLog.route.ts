import express from 'express'
import { orderLogController } from './orderLog.controller'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   name: OrderLog
 *   description: Operations related to order logs
 */

/**
 * @openapi
 * /api/v1/orderlog/create:
 *   post:
 *     summary: Create an order log for a specific order
 *     tags: [OrderLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The ID of the order for which the log is created
 *               log:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: ['pending', 'approved', 'processing', 'shipped', 'delivered']
 *                       description: The status of the order at a specific point in time
 *                     date:
 *                       type: string
 *                       required: true
 *                       description: The date of the log entry
 *                     address:
 *                       type: string
 *                       required: true
 *                       description: The address associated with the log entry
 *             required:
 *               - orderId
 *               - log
 *     responses:
 *       '201':
 *         description: Order log created successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/orderlog/{id}:
 *   get:
 *     summary: Get order logs for a specific order
 *     tags: [OrderLog]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Order not found
 */

router.post('/create', orderLogController.createOrderLogById)
router.get('/:id', orderLogController.getOrderLogById)

export const orderLogRouter = router
