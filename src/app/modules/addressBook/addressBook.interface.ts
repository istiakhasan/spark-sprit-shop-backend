import { Schema } from 'mongoose'

export type IAddressBook = {
  fulName: string
  phone: string
  province: string
  city: string
  area: string
  address: string
  defaultDeliveryAddress: boolean
  userId: Schema.Types.ObjectId
}
