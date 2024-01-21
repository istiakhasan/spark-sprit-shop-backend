import express from 'express'
import { productController } from './product.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   name: Product
 *   description: Operations related to products
 */

/**
 * @openapi
 * /api/v1/product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category to which the product belongs
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the product
 *               description:
 *                 type: string
 *                 description: The description of the product
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of available colors for the product
 *               size:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of available sizes for the product
 *               quantity:
 *                 type: number
 *                 minimum: 0
 *                 description: The quantity of the product available
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: The price of the product
 *               previous_price:
 *                 type: number
 *                 minimum: 0
 *                 description: The previous price of the product (if applicable)
 *               discount:
 *                 type: number
 *                 description: The discount percentage for the product
 *               weight:
 *                 type: number
 *                 description: The weight of the product
 *               manifacturer:
 *                 type: boolean
 *                 description: Whether the product is from the manufacturer
 *               status:
 *                 type: string
 *                 enum: [hot, new]
 *                 default: new
 *                 description: The status of the product (hot or new)
 *               image:
 *                 type: string
 *                 description: The URL of the product image
 *               brand:
 *                 type: string
 *                 description: The ID of the brand to which the product belongs
 *             required:
 *               - name
 *               - categoryId
 *               - userId
 *               - description
 *               - colors
 *               - size
 *               - quantity
 *               - price
 *               - image
 *               - brand
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 */

/**
 * @openapi
 * /api/v1/product/update/{id}:
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
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
 *                 description: The new name of the product
 *               categoryId:
 *                 type: string
 *                 description: The new ID of the category to which the product belongs
 *               description:
 *                 type: string
 *                 description: The new description of the product
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The new array of available colors for the product
 *               size:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The new array of available sizes for the product
 *               quantity:
 *                 type: number
 *                 minimum: 0
 *                 description: The new quantity of the product available
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: The new price of the product
 *               previous_price:
 *                 type: number
 *                 minimum: 0
 *                 description: The new previous price of the product (if applicable)
 *               discount:
 *                 type: number
 *                 description: The new discount percentage for the product
 *               weight:
 *                 type: number
 *                 description: The new weight of the product
 *               manifacturer:
 *                 type: boolean
 *                 description: Whether the product is now from the manufacturer
 *               status:
 *                 type: string
 *                 enum: [hot, new]
 *                 description: The new status of the product (hot or new)
 *               image:
 *                 type: string
 *                 description: The new URL of the product image
 *               brand:
 *                 type: string
 *                 description: The new ID of the brand to which the product belongs
 *             required:
 *               - name
 *               - categoryId
 *               - description
 *               - colors
 *               - size
 *               - quantity
 *               - price
 *               - image
 *               - brand
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '400':
 *         description: Bad request, check request body
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Product not found
 */

/**
 * @openapi
 * /api/v1/product/all-products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of products to retrieve per page.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search term to filter products.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field by which to sort the products.
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
 * /api/v1/product/similar-product/{categoryid}:
 *   get:
 *     summary: Get similar products based on a category
 *     tags: [Product]
 *     parameters:
 *       - name: categoryid
 *         in: path
 *         description: ID of the category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Category not found
 */

/**
 * @openapi
 * /api/v1/product/productById:
 *   get:
 *     summary: Get a product by ID (Requires customer or admin authentication)
 *     tags: [Product]
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
 *         description: Product not found
 *   components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

/**
 * @openapi
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Product not found
 */
/**
 * @openapi
 * /api/v1/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product retrived successfully
 *       '401':
 *         description: Unauthorized, authentication required
 *       '404':
 *         description: Product not found
 */

router.post('/create', productController.createProduct)
router.patch('/update/:id', productController.updateProduct)
router.get('/all-products', productController.getAll)
router.get('/similar-product/:categoryid', productController.similarProduct)
router.get(
  '/productById',
  auth('customer', 'admin'),
  productController.getProductByUserId,
)
router.delete('/:id', productController.deleteProduct)
router.get('/:id', productController.getsingleProduct)

export const ProductRouter = router
