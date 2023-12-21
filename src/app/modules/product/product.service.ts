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
    const andCondition = []
    if (searchTerm) {
      andCondition.push({
        $or: [
          ...['name', 'status', 'category.name'].map(field => ({
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          })),
        ],
      })
    }

    if (filtersData?.category) {
      const categoryValues = JSON.parse(filtersData.category)
      if (Array.isArray(categoryValues) && categoryValues.length > 0) {
        andCondition.push({
          $or: [
            ...categoryValues.map(field => ({
              ['category.name']: {
                $eq: field,
              },
            })),
          ],
        })
      }
    }
    if (filtersData?.brands) {
      const brandsValue = JSON.parse(filtersData.brands)
      if (Array.isArray(brandsValue) && brandsValue.length > 0) {
        andCondition.push({
          $or: [
            ...brandsValue.map(field => ({
              ['brands.name']: {
                $eq: field,
              },
            })),
          ],
        })
      }
    }
    if (filtersData?.colors) {
      const colorsValues = JSON.parse(filtersData.colors)
      if (Array.isArray(colorsValues) && colorsValues.length > 0) {
        andCondition.push({
          $or: [
            ...colorsValues.map(field => ({
              colors: field,
            })),
          ],
        })
      }
    }
    if (filtersData.minPrice) {
      andCondition.push({
        price: {
          $gte: Number(filtersData.minPrice),
        },
      })
    }
    if (filtersData.maxPrice) {
      andCondition.push({
        price: {
          $lte: Number(filtersData.maxPrice),
        },
      })
    }

    const sortConditions: { [key: string]: SortOrder } = {}
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder === 'desc' ? -1 : 1
    }

    const whereConditions =
      andCondition.length > 0 ? { $and: andCondition } : {}
    const aggregatePipeline: any = [
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brands',
        },
      },
      { $match: whereConditions },
      { $unwind: '$category' },
      { $unwind: '$brands' },
      { $sort: sortConditions },
      { $skip: skip },
      { $limit: limit },
    ]
    const aggregatePipelineForTotal: any = [
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brands',
        },
      },
      { $match: whereConditions },
      { $count: 'total' },
    ]

    const result = await Product.aggregate(aggregatePipeline).exec()
    const calculateTotal = await Product.aggregate(
      aggregatePipelineForTotal,
    ).exec()
    const total = calculateTotal.length > 0 ? calculateTotal[0].total : 0

    return {
      meta: {
        page,
        limit,
        total,
        whereConditions,
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