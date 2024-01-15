import express from 'express'
import { blogController } from './blog.controller'

const router = express.Router()
router.post('/create', blogController.createBlog)

export const blogRouter = router
