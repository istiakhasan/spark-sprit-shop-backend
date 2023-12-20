import express from 'express'
import { categoryController } from './category.controller'

const router = express.Router()

router.post('/create', categoryController.createCategory)

export const CategoryRouter = router
