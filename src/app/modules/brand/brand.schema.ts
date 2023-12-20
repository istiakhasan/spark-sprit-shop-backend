import mongoose, { Schema } from 'mongoose'
import { IBrand } from './brand.interface'

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Brand = mongoose.model('brand', brandSchema)
