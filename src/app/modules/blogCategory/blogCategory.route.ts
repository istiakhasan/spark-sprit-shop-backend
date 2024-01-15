import express from 'express'
import { blogCategoryController } from './blogCategory.controller'

const router = express.Router()

router.post('/create', blogCategoryController.createBlogCategory)
router.get('/get-all', blogCategoryController.getAll)
router.patch('/:id', blogCategoryController.updateBlogCategory)

export const blogCategoryRouter = router
