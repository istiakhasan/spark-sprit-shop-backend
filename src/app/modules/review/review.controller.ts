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
  console.log(req.query, 'query')
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await reviewService.getbyProductid(req.params.id, options)
  sendResponse(res, {
    message: ' Category retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

export const reviewController = {
  createReview,
  // getAllCategory,
  getbyProductid,
}
