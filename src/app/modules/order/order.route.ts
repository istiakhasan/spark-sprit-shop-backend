/**
 * @openapi
 * tags:
 *   name: Order
 *   description: Operations related to orders
 */

/**
 * @openapi
 * /api/v1/order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: The ID of the customer placing the order
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: true
 *               orderStatus:
 *                 type: string
 *                 enum: ['pending', 'approved', 'processing', 'shipped', 'delivered']
 *                 default: 'pending'
 *               paymentStatus:
 *                 type: string
 *                 enum: ['pending', 'paid', 'refunded']
 *                 required: true
 *               address:
 *                 type: string
 *                 description: The ID of the address associated with the order
 *               discount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *                 enum: ['cash on delivery', 'ssl-commerce']
 *                 required: true
 *               totalPrice:
 *                 type: number
 *                 required: true
 *               shipping:
 *                 type: number
 *                 default: 0
 *               transition_id:
 *                 type: string
 *                 required: true
 *               paid:
 *                 type: boolean
 *                 required: true
 *             required:
 *               - customerId
 *               - products
 *               - paymentStatus
 *               - address
 *               - paymentMethod
 *               - totalPrice
 *               - transition_id
 *               - paid
 *     responses:
 *       '201':
 *         description: Order created successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/order/getAllOrders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of blog posts to retrieve per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term to filter blog posts.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field by which to sort the blog posts.
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         default: asc
 *         description: Sort order (ascending or descending). Default is ascending.
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/order/order-summary/{id}:
 *   get:
 *     summary: Get order summary for a specific order
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Transection id
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

/**
 * @openapi
 * /api/v1/order/getOrderById:
 *   get:
 *     summary: Get order details by ID (Requires customer or admin authentication)
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of blog posts to retrieve per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term to filter blog posts.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field by which to sort the blog posts.
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         default: asc
 *         description: Sort order (ascending or descending). Default is ascending.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Order not found
 *   components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

/**
 * @openapi
 * /api/v1/order/payment/success/{id}:
 *   post:
 *     summary: Handle successful payment for an order
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment success handled successfully
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Order not found
 */

/**
 * @openapi
 * /api/v1/order/updatestatus/{id}:
 *   patch:
 *     summary: Update the status of an order by ID
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum: ['pending', 'approved', 'processing', 'shipped', 'delivered']
 *                 description: The new status for the order
 *             required:
 *               - orderStatus
 *     responses:
 *       '200':
 *         description: Order status updated successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Order not found
 */

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
