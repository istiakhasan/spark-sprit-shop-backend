import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { orderService } from './order.service'

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.createOrder(req.body)
  sendResponse(res, {
    message: 'Order create successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})
const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.paymentSuccess(req.params.id)
  if (result) {
    res.redirect('http://localhost:3000/')
  }
  // sendResponse(res, {
  //   message: 'Payment successfully',
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   data: result,
  // })
})

export const orderController = {
  createOrder,
  paymentSuccess,
}
