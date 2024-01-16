import express from 'express'
import { blogController } from './blog.controller'

const router = express.Router()
router.post('/create', blogController.createBlog)
router.get('/get-all', blogController.getAll)
router.get('/getblogbyid/:id', blogController.getblogbyid)
router.patch('/:id', blogController.updateBlog)
export const blogRouter = router
