import express from 'express'
import { categoryController } from './category.controller'

const router = express.Router()

router.post('/create', categoryController.createCategory)
router.get('/get-all', categoryController.getAllCategory)

export const CategoryRouter = router
