import express from 'express'
import { reviewController } from './review.controller'

// import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/create', reviewController.createReview)
// router.get('/get-all', categoryController.getAllCategory)
router.get('/getbyProductid/:id', reviewController.getbyProductid)

export const reviewRouter = router