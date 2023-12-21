import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { productService } from './product.service'
import pick from '../../../shared/pick'

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.createProduct(req.body)
  sendResponse(res, {
    message: 'Product create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'minPrice',
    'maxPrice',
    'location',
    'searchTerm',
    'price',
    'category',
    'colors',
    'brands',
  ])
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await productService.getAll(options, filters)
  sendResponse(res, {
    message: 'Product retrived successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

export const productController = {
  createProduct,
  getAll,
}