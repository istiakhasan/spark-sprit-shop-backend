import { ICategory } from './category.interface'
import { Category } from './category.schema'

const createCategory = async (data: ICategory) => {
  const result = await Category.create(data)
  return result
}

export const categoryService = {
  createCategory,
}
