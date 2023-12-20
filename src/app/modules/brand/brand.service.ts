import { IBrand } from './brand.interface'
import { Brand } from './brand.schema'

const createBrand = async (data: IBrand) => {
  const result = await Brand.create(data)
  return result
}

export const brandService = {
  createBrand,
}
