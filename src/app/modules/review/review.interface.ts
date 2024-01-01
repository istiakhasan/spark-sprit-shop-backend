import { Schema } from 'mongoose'

export type IReview = {
  userId: Schema.Types.ObjectId
  productId: Schema.Types.ObjectId
  review: string
  rating: number
  title: string
}
