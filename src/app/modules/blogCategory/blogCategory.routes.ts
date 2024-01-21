/**
 * @openapi
 * tags:
 *   name: BlogCategory
 *   description: Operations related to blog categories
 */

/**
 * @openapi
 * /api/v1/blog-category/create:
 *   post:
 *     summary: Create a new blog category
 *     tags: [BlogCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the blog category
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the blog category
 *             required:
 *               - name
 *               - userId
 *     responses:
 *       '201':
 *         description: Blog category created successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/blog-category/get-all:
 *   get:
 *     summary: Get all blog categories
 *     tags: [BlogCategory]
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
 * /api/v1/blog-category/loadAllBlogCategory:
 *   get:
 *     summary: Load all blog categories
 *     tags: [BlogCategory]
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/blog-category/{id}:
 *   patch:
 *     summary: Update a blog category by ID
 *     tags: [BlogCategory]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the blog category
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
 *               name:
 *                 type: string
 *                 description: The new name for the blog category
 *             required:
 *               - name
 *     responses:
 *       '200':
 *         description: Blog category updated successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Blog category not found
 */
