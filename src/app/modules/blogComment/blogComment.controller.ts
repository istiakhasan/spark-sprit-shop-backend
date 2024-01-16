import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { blogCommentService } from './blogComment.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const insertComment = catchAsync(async (req: Request, res: Response) => {
  const result = await blogCommentService.insertComment(req.body)
  sendResponse(res, {
    message: ' Success',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const getcommentbyblog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogCommentService.getcommentbyblog(req.params.id)
  sendResponse(res, {
    message: ' Comment retrived successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
export const blogCommentController = {
  insertComment,
  getcommentbyblog,
}
