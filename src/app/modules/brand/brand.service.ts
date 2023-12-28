import { IBrand } from './brand.interface'
import { Brand } from './brand.schema'

const createBrand = async (data: IBrand) => {
  const result = await Brand.create(data)
  return result
}
const getBrand = async () => {
  const result = await Brand.find()
  return result
}

export const brandService = {
  createBrand,
  getBrand,
}
