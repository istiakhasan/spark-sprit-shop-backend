import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
// import pick from '../../../shared/pick'
import { reviewService } from './review.service'
import pick from '../../../shared/pick'

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.createReview(req.body)
  sendResponse(res, {
    message: 'Review  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
// const getAllCategory = catchAsync(async (req: Request, res: Response) => {
//   const result = await categoryService.getAllCategory()
//   sendResponse(res, {
//     message: 'Category retrived successfully',
//     statusCode: httpStatus.OK,
//     success: true,
//     data: result,
//   })
// })

const getbyProductid = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await reviewService.getbyProductid(req.params.id, options)
  sendResponse(res, {
    message: ' Comment retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  })
})
const totalRating = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.totalRating(req.params.id)
  sendResponse(res, {
    message: ' Review retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const reviewController = {
  createReview,
  // getAllCategory,
  getbyProductid,
  totalRating,
}
