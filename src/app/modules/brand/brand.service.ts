/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken'
import { IBrand } from './brand.interface'
import { Brand } from './brand.schema'
import { IPagination } from '../../../interface/commonInterface'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createBrand = async (data: IBrand) => {
  const result = await Brand.create(data)
  return result
}
const getBrand = async () => {
  const result = await Brand.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'brand',
        as: 'brands',
      },
    },

    { $addFields: { totalProduct: { $size: '$brands' } } },
    { $project: { brands: 0 } },
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
  const result = await Brand.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('userId')
  const total = await Brand.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateBrand = async (id: string, data: Partial<IBrand>) => {
  const result = await Brand.findByIdAndUpdate(id, data, { new: true })
  return result
}
export const brandService = {
  createBrand,
  getBrand,
  getById,
  updateBrand,
}
