import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { addressBookService } from './addressBook.service'

const createAddress = catchAsync(async (req: Request, res: Response) => {
  const result = await addressBookService.createAddress(req.body)
  sendResponse(res, {
    message: 'Address create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
// const getBrand = catchAsync(async (req: Request, res: Response) => {
//   const result = await brandService.getBrand()
//   sendResponse(res, {
//     message: 'Brand retrived successfully',
//     statusCode: httpStatus.OK,
//     success: true,
//     data: result,
//   })
// })

const getById = catchAsync(async (req: Request, res: Response) => {
  const result = await addressBookService.getById(req.user)
  sendResponse(res, {
    message: ' Address retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const updateAddress = catchAsync(async (req: Request, res: Response) => {
  const result = await addressBookService.updateAddress(req.body)
  sendResponse(res, {
    message: ' Address update  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const addressBookController = {
  createAddress,
  updateAddress,
  getById,
}
