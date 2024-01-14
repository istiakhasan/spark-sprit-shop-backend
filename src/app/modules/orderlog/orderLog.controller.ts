import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { orderLogService } from './orderLog.service'

const createOrderLogById = catchAsync(async (req: Request, res: Response) => {
  const result = await orderLogService.createOrderLogById(req.body)
  sendResponse(res, {
    message: 'Log create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const getOrderLogById = catchAsync(async (req: Request, res: Response) => {
  const result = await orderLogService.getOrderLogById(req.params.id)
  sendResponse(res, {
    message: 'Log retrived successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const orderLogController = {
  createOrderLogById,
  getOrderLogById,
}
