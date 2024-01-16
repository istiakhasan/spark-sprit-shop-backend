import { Schema } from 'mongoose'
export type IBlogComment = {
  message: string
  blogId: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
}
