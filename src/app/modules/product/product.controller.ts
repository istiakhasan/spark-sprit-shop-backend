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
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.deleteProduct(req.params.id as string)
  sendResponse(res, {
    message: 'Product Deleted successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const getsingleProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getsingleProduct(req.params.id as string)
  sendResponse(res, {
    message: 'Product retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const similarProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.similarProduct(
    req.params.categoryid as string,
  )
  sendResponse(res, {
    message: 'Similar Product retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const productController = {
  createProduct,
  getAll,
  deleteProduct,
  getsingleProduct,
  similarProduct,
}
