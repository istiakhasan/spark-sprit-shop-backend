import express from 'express'
import { brandController } from './brand.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   name: Brand
 *   description: Brand operations
 */

/**
 * @openapi
 * /api/v1/brand/create:
 *   post:
 *     summary: Create brand
 *     description: API endpoint to create a brand.
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Title of the brand.
 *                 example: "LG"
 *               logo:
 *                 type: string
 *                 description: Logo of the brand.
 *                 example: "image url"
 *               userId:
 *                 type: string
 *                 description: User ID.
 *                 example: "user id"
 *     responses:
 *       '200':
 *         description: Brand created successfully.
 *       '400':
 *         description: Bad request. Check the request payload.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User does not have the necessary role.
 *       '500':
 *         description: Internal server error. Something went wrong.
 */

router.post('/create', brandController.createBrand)

/**
 * @openapi
 * /api/v1/brand/get-all:
 *   get:
 *     summary: Get all brands
 *     description: API endpoint to retrieve all brands.
 *     tags: [Brand]
 *     responses:
 *       '200':
 *         description: Successful retrieval of brand information.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User does not have the necessary role.
 *       '500':
 *         description: Internal server error. Something went wrong.
 */

router.get('/get-all', brandController.getBrand)

/**
 * @openapi
 * /api/v1/brand/getbyid:
 *   get:
 *     summary: Get brand by ID
 *     description: API endpoint to retrieve a brand by its ID.
 *     tags: [Brand]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of brand information.
 *       '401':
 *         description: Unauthorized. User not authenticated.
 *       '403':
 *         description: Forbidden. User does not have the necessary role.
 *       '500':
 *         description: Internal server error. Something went wrong.
 */

router.get('/getbyid', auth('customer', 'admin'), brandController.getById)

export const brandRouter = router
