import { Model, Schema } from 'mongoose'

export type IProduct = {
  name: string
  categoryId: Schema.Types.ObjectId
  description?: string
  userId: Schema.Types.ObjectId
  colors?: string
  size: string
  quantity: number
  price: number
  previous_price?: number
  discount?: number
  weight?: number
  manifacturer: boolean
  image: string
  status: 'hot' | 'new'
  brand?: Schema.Types.ObjectId
}

type IProductMethod = {
  fullName(): string
}

export type UserModel = Model<IProduct, Record<string, unknown>, IProductMethod>
