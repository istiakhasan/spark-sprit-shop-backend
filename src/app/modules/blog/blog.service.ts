/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken'
import { IBlog } from './blog.interface'
import { Blog } from './blog.schema'
import { IPagination } from '../../../interface/commonInterface'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createBlog = async (data: IBlog) => {
  const result = await Blog.create(data)
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
  const result = await Blog.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('userId category')
  const total = await Blog.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateBlog = async (id: string, data: IBlog) => {
  const result = await Blog.findByIdAndUpdate(id, data, { new: true })
  return result
}
const getblogbyid = async (id: string) => {
  const result = await Blog.findById(id)
  return result
}

export const blogService = {
  createBlog,
  getAll,
  updateBlog,
  getblogbyid,
}
