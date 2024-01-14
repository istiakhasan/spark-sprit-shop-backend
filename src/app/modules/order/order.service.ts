/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'mongodb'
import { User } from '../user/user.model'
import { Order } from './order.schema'
//@ts-ignore
import SSLCommerzPayment from 'sslcommerz-lts'
import { getLiveServerUrl } from '../../../helpers/envConfig'
import mongoose, { SortOrder } from 'mongoose'
import { Product } from '../product/product.schema'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import { IPagination } from '../../../interface/commonInterface'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { OrderLog } from '../orderlog/orderlog.model'
const store_id = 'softp6565d0c57bd38'
const store_passwd = 'softp6565d0c57bd38@ssl'
const is_live = false //true for live, false for sandbox
const createOrder = async (data: any) => {
  const newData = { ...data }
  newData['address'] = data?.address?._id
  const userInfo = await User.findById(data?.customerId)
  const transition_id = new ObjectId().toString()
  const shipData: any = {
    total_amount: data?.totalPrice,
    currency: 'BDT',
    tran_id: transition_id, // use unique tran_id for each api call
    success_url: `${getLiveServerUrl()}/api/v1/order/payment/success/${transition_id}`,
    fail_url: 'http://localhost:3030/fail',
    cancel_url: 'http://localhost:3030/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: data?.paymentMethod,
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: userInfo?.name,
    cus_email: userInfo?.email,
    cus_add1: userInfo?.address,
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: userInfo?.phone,
    cus_fax: data?.address?.phone,
    ship_name: data?.address?.fulName,
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: data?.address?.city,
    ship_state: data?.address?.province,
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  }

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  const res = await sslcz.init(shipData)
  if (res?.status === 'SUCCESS') {
    const session = await mongoose.startSession()
    try {
      data?.products?.map(async (item: any) => {
        //@ts-ignore
        const id = item?._id
        // find product by _id
        const findProductQuantity = await Product.findById(id)
        if (!findProductQuantity) {
          throw new ApiError(httpStatus.FORBIDDEN, 'Something went wrong')
        }

        // update product quantity
        await Product.findByIdAndUpdate(
          id,
          {
            quantity: findProductQuantity?.quantity - item?.purchaseQuantity,
          },
          { new: true, session },
        )
      })
      await Order.create(
        [
          {
            ...newData,
            transition_id,
            paymentStatus: 'paid',
            paid: false,
          },
        ],
        { session },
      )
    } catch (error) {
      await session.abortTransaction()
      await session.endSession()
      throw error
    }
  }

  return { url: res?.GatewayPageURL }
}
const paymentSuccess = async (id: string) => {
  const order = await Order.findOneAndUpdate(
    { transition_id: id },
    { paid: true },
    { new: true },
  ).populate('address')

  const logData = {
    orderId: order?._id,
    log: [
      {
        status: order?.orderStatus,
        date: new Date(),
        // @ts-ignore
        address: `${order?.address?.province}-${order?.address?.city}-${order?.address?.area}-${order?.address?.address}`,
      },
    ],
  }

  console.log(logData, 'log data')

  await OrderLog.create(logData)
  return order
}
const orderSummary = async (id: string) => {
  const order = await Order.findOne({ transition_id: id }).populate(
    'customerId',
  )
  return order
}

// get orders by user id
const getOrderById = async (
  user: JwtPayload | null,
  options: IPagination,
  filters: any,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder === 'desc' ? -1 : 1
  }

  const { searchTerm } = filters
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: ['transition_id'].map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  andCondition.push({ customerId: user?._id })

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await Order.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Order.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
// get all orders
const getAllOrders = async (
  // user: JwtPayload | null,
  options: IPagination,
  filters: any,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder === 'desc' ? -1 : 1
  }

  const { searchTerm, status } = filters
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: ['transition_id'].map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (status && status === '1') {
    andCondition.push({ orderStatus: 'pending' })
  } else if (status && status === '2') {
    andCondition.push({ orderStatus: 'processing' })
  } else if (status && status === '3') {
    andCondition.push({ orderStatus: 'shipped' })
  } else if (status && status === '4') {
    andCondition.push({ orderStatus: 'delivered' })
  } else if (status && status === '5') {
    andCondition.push({ orderStatus: 'approved' })
  }

  // andCondition.push({ customerId: user?._id })

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await Order.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await Order.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateStatus = async (status: string, id: string, userId: string) => {
  if (status === 'pending') {
    status = 'approved'
  } else if (status === 'approved') {
    status = 'processing'
  } else if (status === 'processing') {
    status = 'shipped'
  } else if (status === 'shipped') {
    status = 'delivered'
  }
  const findUser = await User.findById(userId)
  const result = await Order.findOneAndUpdate(
    { _id: id },
    {
      orderStatus: status,
    },
    { new: true },
  ).populate('')

  const logData = {
    status: status,
    date: new Date(),
    // @ts-ignore
    address: `${findUser?.city}-${findUser?.post_code} , ${findUser?.country?.label}`,
  }

  await OrderLog.updateOne(
    { orderId: result?._id },
    {
      $push: { ['log']: logData },
    },
  )

  return result
}

export const orderService = {
  createOrder,
  paymentSuccess,
  orderSummary,
  getOrderById,
  getAllOrders,
  updateStatus,
}
