import { Schema } from 'mongoose'
export type IBlogCategory = {
  name: string
  userId: Schema.Types.ObjectId
}
