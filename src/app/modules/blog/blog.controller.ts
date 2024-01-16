import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { blogService } from './blog.service'
import pick from '../../../shared/pick'

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.createBlog(req.body)
  sendResponse(res, {
    message: 'Blog create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm'])
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await blogService.getAll(req.user, options, filters)
  sendResponse(res, {
    message: ' Blog  retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.updateBlog(req.params.id, req.body)
  sendResponse(res, {
    message: ' Blog  updated  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const getblogbyid = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getblogbyid(req.params.id)
  sendResponse(res, {
    message: ' Blog  retrived  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
export const blogController = {
  createBlog,
  getAll,
  updateBlog,
  getblogbyid,
}
