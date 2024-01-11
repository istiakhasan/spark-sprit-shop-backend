import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { orderService } from './order.service'
import { getBaseUrl } from '../../../helpers/envConfig'
import pick from '../../../shared/pick'

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
    res.redirect(`${getBaseUrl()}/order-summary/${result?.transition_id}`)
  }
})
const orderSummary = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.orderSummary(req.params.id)
  sendResponse(res, {
    message: 'Order retrived successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

// get order by id
const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm'])
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await orderService.getOrderById(req.user, options, filters)
  sendResponse(res, {
    message: ' Orders retrive  successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  })
})
// get all orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'status'])
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder'])
  const result = await orderService.getAllOrders(
    // req.user,
    options,
    filters,
  )
  sendResponse(res, {
    message: ' Orders retrived  successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: result.meta,
    data: result.data,
  })
})
const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.updateStatus(
    req.query.status as string,
    req.params.id,
  )
  sendResponse(res, {
    message: ' Status updated  successfully',
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  })
})

export const orderController = {
  createOrder,
  paymentSuccess,
  orderSummary,
  getOrderById,
  getAllOrders,
  updateStatus,
}
