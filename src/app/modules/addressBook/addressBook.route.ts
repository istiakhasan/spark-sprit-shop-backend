/**
 * @openapi
 * tags:
 *   name: AddressBook
 *   description: Operations related to address books
 */

/**
 * @openapi
 * /api/v1/address-book/create:
 *   post:
 *     summary: Create a new address in the address book
 *     tags: [AddressBook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fulName:
 *                 type: string
 *                 description: The full name associated with the address
 *               phone:
 *                 type: string
 *                 description: The phone number associated with the address
 *               province:
 *                 type: string
 *                 description: The province associated with the address
 *               city:
 *                 type: string
 *                 description: The city associated with the address
 *               area:
 *                 type: string
 *                 description: The area associated with the address
 *               address:
 *                 type: string
 *                 description: The detailed address
 *               defaultDeliveryAddress:
 *                 type: boolean
 *                 default: false
 *                 description: Whether this address is the default delivery address
 *             required:
 *               - fulName
 *               - phone
 *               - province
 *               - city
 *               - area
 *               - address
 *               - userId
 *     responses:
 *       '201':
 *         description: Address created successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/address-book/update:
 *   patch:
 *     summary: Update an existing address in the address book
 *     tags: [AddressBook]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fulName:
 *                 type: string
 *                 description: The new full name associated with the address
 *               phone:
 *                 type: string
 *                 description: The new phone number associated with the address
 *               province:
 *                 type: string
 *                 description: The new province associated with the address
 *               city:
 *                 type: string
 *                 description: The new city associated with the address
 *               area:
 *                 type: string
 *                 description: The new area associated with the address
 *               address:
 *                 type: string
 *                 description: The new detailed address
 *               defaultDeliveryAddress:
 *                 type: boolean
 *                 description: Whether this address should be set as the default delivery address
 *             required:
 *               - fulName
 *               - phone
 *               - province
 *               - city
 *               - area
 *               - address
 *               - userId
 *     responses:
 *       '200':
 *         description: Address updated successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Address not found
 */

/**
 * @openapi
 * /api/v1/address-book/getbyid:
 *   get:
 *     summary: Get an address by ID (Requires customer or admin authentication)
 *     tags: [AddressBook]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Address not found
 *   components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

import express from 'express'
import { addressBookController } from './addressBook.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/create', addressBookController.createAddress)
router.patch('/update', addressBookController.updateAddress)
router.get('/getbyid', auth('customer', 'admin'), addressBookController.getById)

export const addressBookRouter = router
