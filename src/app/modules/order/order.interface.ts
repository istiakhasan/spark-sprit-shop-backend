import { Schema } from 'mongoose'
import { IProduct } from '../product/product.interface'
export type ExtendedInterface = IProduct & {
  purchaseQuantity: number
}
export type IOrder = {
  customerId: Schema.Types.ObjectId
  products: ExtendedInterface[]
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered'
  paymentMethod: 'cash on delivery' | 'ssl-commerce'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  address: string
  totalPrice: number
  discount: number
  transition_id: string
  paid: boolean
}
