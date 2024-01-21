import express from 'express'
import { blogController } from './blog.controller'

const router = express.Router()
/**
 * @openapi
 * tags:
 *   name: Blog
 *   description: Blog operations
 */
/**
 * @openapi
 * /api/v1/blog/create:
 *   post:
 *     summary: Create a new blog post
 *     description: Endpoint to create a new blog post.
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog post.
 *                 example: "Introduction to Swagger"
 *               description:
 *                 type: string
 *                 description: The description of the blog post.
 *                 example: "This is a sample blog post content."
 *               category:
 *                 type: string
 *                 description: Category Id.
 *                 example: "65a78ab032af7c59746ba859"
 *               userId:
 *                 type: string
 *                 description: User id.
 *                 example: "65a78ab032af7c59746ba859"
 *               image:
 *                 type: string
 *                 description: The image of the blog post.
 *                 example: "https://i.ibb.co/SwYHygs/hewxmqcurqe-portrait-b6a7b33a7a29cab1074d68b8ae983280-tpovlqz45wn6.jpg"
 *     responses:
 *       '201':
 *         description: Blog post created successfully.
 *       '400':
 *         description: Bad request. Check the request payload.
 *       '500':
 *         description: Internal server error. Something went wrong.
 */
router.post('/create', blogController.createBlog)

/**
 * @openapi
 * /api/v1/blog/get-all:
 *   get:
 *     summary: Get all blog posts
 *     description: Endpoint to retrieve all blog posts.
 *     tags: [Blog]
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
 *         description: Successful operation. Returns a list of blog posts.
 *       '500':
 *         description: Internal server error. Something went wrong.
 */
router.get('/get-all', blogController.getAll)

/**
 * @openapi
 * /api/v1/blog/getblogbyid/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     description: Endpoint to retrieve a blog post by its ID.
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post.
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the specified blog post.
 *       '404':
 *         description: Blog post not found.
 *       '500':
 *         description: Internal server error. Something went wrong.
 */
router.get('/getblogbyid/:id', blogController.getblogbyid)

/**
 * @openapi
 * /api/v1/blog/{id}:
 *   patch:
 *     summary: Update a blog post by ID
 *     description: Endpoint to update a blog post by its ID.
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog post.
 *                 example: "Introduction to Swagger"
 *               description:
 *                 type: string
 *                 description: The description of the blog post.
 *                 example: "This is a sample blog post content."
 *               category:
 *                 type: string
 *                 description: Category Id.
 *                 example: "65a78ab032af7c59746ba859"
 *               userId:
 *                 type: string
 *                 description: User id.
 *                 example: "65a78ab032af7c59746ba859"
 *               image:
 *                 type: string
 *                 description: The image of the blog post.
 *                 example: "https://i.ibb.co/SwYHygs/hewxmqcurqe-portrait-b6a7b33a7a29cab1074d68b8ae983280-tpovlqz45wn6.jpg"
 *     responses:
 *       '200':
 *         description: Blog post updated successfully.
 *       '400':
 *         description: Bad request. Check the request payload.
 *       '404':
 *         description: Blog post not found.
 *       '500':
 *         description: Internal server error. Something went wrong.
 */
router.patch('/:id', blogController.updateBlog)

export const blogRouter = router
