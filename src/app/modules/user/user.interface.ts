import { Model } from 'mongoose'

export type IUser = {
  userId: string
  name: string
  email: string
  image?: string
  phone?: string
  address?: string
  age?: number
  role: 'admin' | 'customer' | 'seller' | 'super_admin'
  bioData?: string
  password: string
  country: { label: string; value: string }
  city: string
  post_code?: string
  delivery_address?: string
}

type IUserMethods = {
  fullName(): string
}
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
