import express from 'express'
import { userController } from './user.controller'
import auth from '../../middlewares/auth'
const router = express.Router()

router.post('/create', userController.createUser)
router.post('/login', userController.login)
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
