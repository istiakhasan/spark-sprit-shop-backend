import { Schema } from 'mongoose'
export type IBlog = {
  title: string
  description: string
  image: string
  category: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
}
