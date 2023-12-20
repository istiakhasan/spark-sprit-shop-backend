/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IProduct } from './product.interface'
import { Product } from './product.schema'
type IPagination = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
const createProduct = async (data: IProduct) => {
  const result = await Product.create(data)
  return result
}
const getAll = async (options: IPagination, filters: any) => {
  try {
    const { limit, page, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(options)
    const { searchTerm, ...filtersData } = filters
    console.log(filtersData)
    // const populateCategory = {
    //   path: 'categoryId',
    //   match: { name: { $regex: 'Menn', $options: 'i' } },
    //   select: 'name',
    // };

    const andCondition = []

    console.log(searchTerm, 'search term ')

    if (searchTerm) {
      andCondition.push({
        $or: [
          ...['name', 'status'].map(field => ({
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          })),
        ],
      })
    }

    const sortConditions: { [key: string]: SortOrder } = {}
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder
    }

    const whereConditions =
      andCondition.length > 0 ? { $and: andCondition } : {}
    console.log(whereConditions)

    const result = await Product.find(whereConditions)
      .populate('userId')
      .populate('brand')
      .populate('categoryId') // Populate category here
      .select('name image price previous_price status categoryId')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await Product.countDocuments(whereConditions)

    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
  } catch (error) {
    // Handle errors here
    console.error('Error in getAll:', error)
    throw error
  }
}

export const productService = {
  createProduct,
  getAll,
}
