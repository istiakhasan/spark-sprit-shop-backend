import mongoose, { Schema } from 'mongoose'
import { IReview } from './review.interface'

const reviewSchema = new Schema<IReview>(
  {
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      max: 5,
      min: 0,
    },
    review: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
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

export const Review = mongoose.model('Review', reviewSchema)
