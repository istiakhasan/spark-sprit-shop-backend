import mongoose, { Schema } from 'mongoose'
import { IBlogComment } from './blogComment.interface'

const blogCommentSchema = new Schema<IBlogComment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    message: {
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

export const BlogComment = mongoose.model('blogComment', blogCommentSchema)
