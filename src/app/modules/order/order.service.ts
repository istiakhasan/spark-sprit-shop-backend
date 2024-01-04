/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'mongodb'
import { User } from '../user/user.model'
import { IOrder } from './order.interface'
import { Order } from './order.schema'
//@ts-ignore
import SSLCommerzPayment from 'sslcommerz-lts'
const store_id = 'softp6565d0c57bd38'
const store_passwd = 'softp6565d0c57bd38@ssl'
const is_live = false //true for live, false for sandbox
const createOrder = async (data: IOrder) => {
  const userInfo = await User.findById(data?.customerId)
  const transition_id = new ObjectId().toString()
  const shipData: any = {
    total_amount: data?.totalPrice,
    currency: 'BDT',
    tran_id: transition_id, // use unique tran_id for each api call
    success_url: `http://localhost:5000/api/v1/order/payment/success/${transition_id}`,
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
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  }

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  const res = await sslcz.init(shipData)
  if (res?.status === 'SUCCESS') {
    await Order.create({
      ...data,
      transition_id,
      paymentStatus: 'paid',
      paid: false,
    })
  }

  return { url: res?.GatewayPageURL }
}
const paymentSuccess = async (id: string) => {
  const order = await Order.findOneAndUpdate(
    { transition_id: id },
    { paid: true },
    { new: true },
  )
  return order
}
export const orderService = {
  createOrder,
  paymentSuccess,
}
