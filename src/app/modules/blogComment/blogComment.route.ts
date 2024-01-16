import express from 'express'
import { blogCommentController } from './blogComment.controller'

const router = express.Router()
router.post('/create', blogCommentController.insertComment)
router.get('/getcommentbyblog/:id', blogCommentController.getcommentbyblog)
// router.get('/get-all', blogController.getAll)
// router.get('/getblogbyid/:id', blogController.getblogbyid)
// router.patch('/:id', blogController.updateBlog)
export const blogCommentRouter = router
