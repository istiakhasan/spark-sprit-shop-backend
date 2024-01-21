import express from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'
const router = express.Router()

/**
 * @openapi
 * tags:
 *     name: User
 *     description: User and auth operation
 */
/**
 * @openapi
 * tags:
 *   name: User
 *   description: User Operation
 */

/**
 * @openapi
 * /api/v1/user/create:
 *   post:
 *     tags: [User]
 *     summary: Create a new user.
 *     description: Endpoint to create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *                 example: "David John"
 *                 required: true
 *               address:
 *                 type: string
 *                 description: The address of the user.
 *                 example: "address"
 *                 required: true
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "email"
 *                 required: true
 *               image:
 *                 type: string
 *                 description: The image of the user.
 *                 example: "image"
 *                 required: true
 *               phone:
 *                 type: string
 *                 description: The phone of the user.
 *                 example: "phone"
 *                 required: true
 *               age:
 *                 type: string
 *                 description: The age of the user.
 *                 example: "age"
 *                 required: true
 *               role:
 *                 type: string
 *                 enum: [admin, customer, seller, super_admin]
 *                 description: The role of the user.
 *                 default: customer
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *                 description: The gender of the user.
 *                 required: true
 *               bioData:
 *                 type: string
 *                 description: The bio of the user.
 *                 required: true
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 required: true
 *               city:
 *                 type: string
 *                 description: The city of the user.
 *                 required: true
 *               post_code:
 *                 type: string
 *                 description: The post_code of the user.
 *                 required: true
 *               delivery_address:
 *                 type: string
 *                 description: The delivery_address of the user.
 *               date_of_birth:
 *                 type: string
 *                 description: The date_of_birth of the user.
 *                 required: true
 *     responses:
 *       '200':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: User created successfully.
 *               user:
 *                 name: "David John"
 *                 address: "address"
 *                 email: "email"
 *                 image: "image"
 *                 phone: "phone"
 *                 age: "age"
 *                 role: "customer"
 *                 gender: "male"
 *       '400':
 *         description: Bad request. Invalid user data.
 *         content:
 *           application/json:
 *             example:
 *               message: Bad request. Invalid user data.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error. Please try again later.
 */
router.post('/create', userController.createUser)

/**
 * @openapi
 *  /api/v1/user/login:
 *    post:
 *      summary: User login by phone and password
 *      description:  End point to log in registered user
 *      tags:  [User]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  phone:
 *                    type: string
 *                    description: Registered phone number.
 *                    example: "01202154785"
 *                  password:
 *                    type: string
 *                    description: registered user password.
 *                    example: "*********"
 *      responses:
 *       '200':
 *        description:  Login in user  successfully.
 *       '400':
 *        description:  Bad request. Check the request payload.
 *       '404':
 *        description:  User  not found.
 *       '500':
 *        description:  Internal server error. Something went wrong.
 */
router.post('/login', userController.login)
/**
 * @openapi
 *  /api/v1/user/profile:
 *    get:
 *      summary: Get user profile information
 *      description: Retrieve the profile information of the authenticated user.
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Successful retrieval of user profile information.
 *        '401':
 *          description: Unauthorized. User not authenticated.
 *        '403':
 *          description: Forbidden. User does not have the necessary role.
 *        '500':
 *          description: Internal server error. Something went wrong.
 *
 *    patch:
 *      summary: Update user profile information
 *      description: Update the profile information of the authenticated user.
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    description: New user name.
 *                    example: "John Doe"
 *                  image:
 *                    type: string
 *                    description: image url here.
 *                    example: "image url "
 *      responses:
 *        '200':
 *          description: Successful update of user profile information.
 *        '400':
 *          description: Bad request. Check the request payload.
 *        '401':
 *          description: Unauthorized. User not authenticated.
 *        '403':
 *          description: Forbidden. User does not have the necessary role.
 *        '500':
 *          description: Internal server error. Something went wrong.
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 */

router.get(
  '/profile',
  auth('customer', 'admin', 'super-user'),
  userController.getProfileInfo,
)
router.patch(
  '/profile',
  auth('customer', 'admin', 'super-user'),
  userController.updateProfile,
)

export const UserRouter = router
