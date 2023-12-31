import express from 'express'
import { categoryController } from './category.controller'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/create', categoryController.createCategory)
router.get('/get-all', categoryController.getAllCategory)
router.get('/getbyid', auth('customer', 'admin'), categoryController.getById)

export const CategoryRouter = router
