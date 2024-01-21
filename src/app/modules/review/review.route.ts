import express from 'express'
import { reviewController } from './review.controller'

const router = express.Router()
/**
 * @openapi
 * tags:
 *   name: Review
 *   description: Operations related to product reviews
 */

/**
 * @openapi
 * /api/v1/review/create:
 *   post:
 *     summary: Create a new review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the review
 *               rating:
 *                 type: number
 *                 description: The rating given in the review (between 0 and 5)
 *               review:
 *                 type: string
 *                 description: The content of the review
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the review
 *               productId:
 *                 type: string
 *                 description: The ID of the product associated with the review
 *             required:
 *               - title
 *               - rating
 *               - review
 *               - userId
 *               - productId
 *     responses:
 *       '201':
 *         description: Review created successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/review/getbyProductid/{id}:
 *   get:
 *     summary: Get reviews for a specific product
 *     tags: [Review]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: The maximum number of blog posts to retrieve per page.
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - name: searchTerm
 *         in: query
 *         schema:
 *           type: string
 *         description: Search term to filter blog posts.
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *         description: Field by which to sort the blog posts.
 *       - name: sortOrder
 *         in: query
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
 *       '404':
 *         description: Product not found
 */

/**
 * @openapi
 * /api/v1/review/totalRating/{id}:
 *   get:
 *     summary: Get the total rating for a specific product
 *     tags: [Review]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Product not found
 */

router.post('/create', reviewController.createReview)
router.get('/getbyProductid/:id', reviewController.getbyProductid)
router.get('/totalRating/:id', reviewController.totalRating)

export const reviewRouter = router
