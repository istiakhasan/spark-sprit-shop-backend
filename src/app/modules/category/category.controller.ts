import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { categoryService } from './category.service'
import pick from '../../../shared/pick'

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body)
  sendResponse(res, {
    message: 'Category create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategory()
  sendResponse(res, {
    message: 'Category retrived successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

const getById = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm'])
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await categoryService.getById(req.user, options, filters)
  sendResponse(res, {
    message: ' Category retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

export const categoryController = {
  createCategory,
  getAllCategory,
  getById,
}
