import express from 'express'
import { blogCommentController } from './blogComment.controller'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   name: BlogComment
 *   description: Operations related to blog comments
 */

/**
 * @openapi
 * /api/v1/blog-comment/create:
 *   post:
 *     summary: Create a new blog comment
 *     tags: [BlogComment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the comment
 *               blogId:
 *                 type: string
 *                 description: The ID of the blog associated with the comment
 *               message:
 *                 type: string
 *                 description: The content of the comment
 *             required:
 *               - userId
 *               - blogId
 *               - message
 *     responses:
 *       '201':
 *         description: Blog comment created successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/blog-comment/getcommentbyblog/{id}:
 *   get:
 *     summary: Get comments for a specific blog
 *     tags: [BlogComment]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Blog not found
 */

router.post('/create', blogCommentController.insertComment)
router.get('/getcommentbyblog/:id', blogCommentController.getcommentbyblog)

export const blogCommentRouter = router
