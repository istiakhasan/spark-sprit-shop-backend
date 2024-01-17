import mongoose, { Schema } from 'mongoose'
import { IProduct } from './product.interface'

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },
    colors: [
      {
        type: String,
      },
    ],
    size: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      min: 0,
    },
    price: {
      type: Number,
      min: 0,
    },
    previous_price: {
      type: Number,
      min: 0,
    },
    discount: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    manifacturer: {
      type: Boolean,
    },
    status: {
      type: String,
      enum: ['hot', 'new'],
      default: 'new',
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'brand',
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

export const Product = mongoose.model('Product', productSchema)
