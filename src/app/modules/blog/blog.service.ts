import { IBlog } from './blog.interface'
import { Blog } from './blog.schema'

const createBlog = async (data: IBlog) => {
  const result = await Blog.create(data)
  return result
}

export const blogService = {
  createBlog,
}
