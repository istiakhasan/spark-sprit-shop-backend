import mongoose, { Schema } from 'mongoose'
import { IOrder } from './order.interface'
const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        type: Object,
        required: true,
      },
    ],
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      enum: ['cash on delivery', 'ssl-commerce'],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    transition_id: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Order = mongoose.model('Order', orderSchema)
