import express from 'express'
import { userController } from './user.controller'
const router = express.Router()

router.post('/create', userController.createUser)
router.post('/login', userController.login)

export const UserRouter = router
