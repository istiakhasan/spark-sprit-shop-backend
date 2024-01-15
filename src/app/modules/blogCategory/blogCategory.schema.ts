import mongoose, { Schema } from 'mongoose'
import { IBlogCategory } from './blogCategory.interface'

const blogSchema = new Schema<IBlogCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

export const BlogCategory = mongoose.model('BlogCategory', blogSchema)
