import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { blogService } from './blog.service'

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.createBlog(req.body)
  sendResponse(res, {
    message: 'Blog create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const blogController = {
  createBlog,
}
