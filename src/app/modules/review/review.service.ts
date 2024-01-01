/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IPagination } from '../../../interface/commonInterface'
import { IReview } from './review.interface'
import { Review } from './review.schema'

const createReview = async (data: IReview) => {
  const result = await Review.create(data)
  return result
}

const getbyProductid = async (id: string, options: IPagination) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder === 'desc' ? -1 : 1
  }

  const andCondition = []

  andCondition.push({ productId: id })

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await Review.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('userId productId')
  const total = await Review.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const reviewService = {
  createReview,
  getbyProductid,
}
