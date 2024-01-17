/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IPagination } from '../../../interface/commonInterface'
import { IBlogCategory } from './blogCategory.interface'
import { BlogCategory } from './blogCategory.schema'
import { JwtPayload } from 'jsonwebtoken'

const createBlogCategory = async (data: IBlogCategory) => {
  const result = await BlogCategory.create(data)
  return result
}

const getAll = async (
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

  // andCondition.push({ userId: user?._id })

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await BlogCategory.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('userId')
  const total = await BlogCategory.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateBlogCategory = async (id: string, data: IBlogCategory) => {
  const result = await BlogCategory.findByIdAndUpdate(id, data, { new: true })
  return result
}
const loadAllBlogCategory = async () => {
  // const result = await BlogCategory.find({}).sort({ createdAt: -1 })
  const result = await BlogCategory.aggregate([
    {
      $lookup: {
        from: 'blogs',
        localField: '_id',
        foreignField: 'category',
        as: 'product',
      },
    },
    {
      $addFields: {
        productLength: { $size: '$product' },
      },
    },
    { $project: { product: 0 } },
    { $sort: { createdAt: -1 } },
  ])
  return result
}

export const blogCategoryService = {
  createBlogCategory,
  getAll,
  updateBlogCategory,
  loadAllBlogCategory,
}
