/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { ICategory } from './category.interface'
import { Category } from './category.schema'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IPagination } from '../../../interface/commonInterface'
import { JwtPayload } from 'jsonwebtoken'

const createCategory = async (data: ICategory) => {
  const result = await Category.create(data)
  return result
}
const getAllCategory = async () => {
  const result = await Category.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'categoryId',
        as: 'products',
      },
    },
    {
      $addFields: {
        productsCount: { $size: '$products' },
      },
    },
    {
      $project: { products: 0 },
    },
  ])
  return result
}

const getById = async (
  user: JwtPayload | null,
  options: IPagination,
  filters: any,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder === 'desc' ? -1 : 1
  }

  const { searchTerm } = filters
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: ['name'].map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  andCondition.push({ userId: user?._id })

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await Category.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('userId')
  const total = await Category.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const categoryService = {
  createCategory,
  getAllCategory,
  getById,
}
