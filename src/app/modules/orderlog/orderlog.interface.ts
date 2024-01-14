import { Schema } from 'mongoose'

export type IOrderLog = {
  orderId: Schema.Types.ObjectId
  log: {
    status: 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered'
    date: string
    address: string
  }[]
}
