import mongoose, { Schema } from 'mongoose'
import { IOrderLog } from './orderlog.interface'

const orderLogSchema = new Schema<IOrderLog>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    log: [
      {
        status: {
          type: String,
          enum: ['pending', 'approved', 'processing', 'shipped', 'delivered'],
        },
        date: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const OrderLog = mongoose.model('orderlog', orderLogSchema)
