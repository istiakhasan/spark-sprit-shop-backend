import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { blogCategoryService } from './blogCategory.service'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import pick from '../../../shared/pick'

const createBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await blogCategoryService.createBlogCategory(req.body)
  sendResponse(res, {
    message: 'Blog Category create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm'])
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await blogCategoryService.getAll(req.user, options, filters)
  sendResponse(res, {
    message: ' Blog Category retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  })
})
const updateBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await blogCategoryService.updateBlogCategory(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    message: ' Blog Category updated  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const blogCategoryController = {
  createBlogCategory,
  getAll,
  updateBlogCategory,
}
