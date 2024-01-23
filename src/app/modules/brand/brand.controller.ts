import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { brandService } from './brand.service'
import pick from '../../../shared/pick'

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.createBrand(req.body)
  sendResponse(res, {
    message: 'Brand create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const getBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.getBrand()
  sendResponse(res, {
    message: 'Brand retrived successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

const getById = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm'])
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await brandService.getById(req.user, options, filters)
  sendResponse(res, {
    message: ' Brand retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  })
})
const updateBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.updateBrand(req.params.brandId, req.body)
  sendResponse(res, {
    message: ' Brand updated  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
export const brandController = {
  createBrand,
  getBrand,
  getById,
  updateBrand,
}
