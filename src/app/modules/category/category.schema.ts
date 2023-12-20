import mongoose, { Schema } from 'mongoose'
import { ICategory } from './category.interface'

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    status: {
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

export const Category = mongoose.model('Category', categorySchema)
