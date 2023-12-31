import { Schema } from 'mongoose'

export type ICategory = {
  name: string
  image: string
  status: string
  userId: Schema.Types.ObjectId
}
