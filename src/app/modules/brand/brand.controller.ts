import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { brandService } from './brand.service'

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.createBrand(req.body)
  sendResponse(res, {
    message: 'Brand create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const brandController = {
  createBrand,
}
