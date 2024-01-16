import { IBlogComment } from './blogComment.interface'
import { BlogComment } from './blogComment.schema'

const insertComment = async (data: IBlogComment) => {
  const result = await BlogComment.create(data)
  return result
}
const getcommentbyblog = async (id: string) => {
  const result = await BlogComment.find({ blogId: id }).populate('userId')
  return result
}

export const blogCommentService = {
  insertComment,
  getcommentbyblog,
}
