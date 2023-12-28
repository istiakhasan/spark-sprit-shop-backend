import { ICategory } from './category.interface'
import { Category } from './category.schema'

const createCategory = async (data: ICategory) => {
  const result = await Category.create(data)
  return result
}
const getAllCategory = async () => {
  const result = await Category.find().select('name  _id')
  return result
}

export const categoryService = {
  createCategory,
  getAllCategory,
}
