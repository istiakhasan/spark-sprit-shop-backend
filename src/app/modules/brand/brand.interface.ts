import { Schema } from 'mongoose'

export type IBrand = {
  name: string
  logo: string
  userId: Schema.Types.ObjectId
}
