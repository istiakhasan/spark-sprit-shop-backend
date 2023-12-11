import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
    },
    role: {
      type: String,
      enum: ['admin', 'customer', 'seller', 'super_admin'],
      default: 'customer',
    },
    bioData: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: {
        label: String,
        value: String,
      },
    },
    city: {
      type: String,
    },
    post_code: {
      type: String,
    },
    delivery_address: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

// userSchema.pre('save',async function(next){

// })

export const User = model<IUser, UserModel>('User', userSchema)
