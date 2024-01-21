import express from 'express'
import { categoryController } from './category.controller'
import auth from '../../middlewares/auth'

const router = express.Router()
/**
 * @openapi
 * tags:
 *   name: Category
 *   description: Operations related to categories
 */

/**
 * @openapi
 * /api/v1/category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *               image:
 *                 type: string
 *                 description: The URL of the category image
 *               status:
 *                 type: string
 *                 description: The status of the category
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the category
 *             required:
 *               - name
 *               - image
 *               - status
 *               - userId
 *     responses:
 *       '201':
 *         description: Category created successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/category/get-all:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/category/getbyid:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
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
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Category not found
 *   components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

// Additional @openapi comments can be added for more details as needed

router.post('/create', categoryController.createCategory)
router.get('/get-all', categoryController.getAllCategory)
router.get('/getbyid', auth('customer', 'admin'), categoryController.getById)

export const CategoryRouter = router
