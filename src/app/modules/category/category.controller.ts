import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { categoryService } from './category.service'

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

export const categoryController = {
  createCategory,
  getAllCategory,
}
