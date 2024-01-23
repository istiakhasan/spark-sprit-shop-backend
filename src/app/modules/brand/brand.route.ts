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

/**
 * @openapi
 * /api/v1/brand/${brandId}:
 *   patch:
 *     summary: Update brand by brand id
 *     description: API endpoint to update brand by brand id
 *     tags: [Brand]
 *     parameters:
 *       - name: brandId
 *         in: path
 *         description: ID of the brand
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  name:
 *                    type: string
 *                    description: The name of the brand
 *                  logo:
 *                    type: string
 *                    description: The image of the brand
 *     responses:
 *       '200':
 *         description: Brand  updated successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Brand not found
 *
 */

router.patch('/:brandId', brandController.updateBrand)

export const brandRouter = router
