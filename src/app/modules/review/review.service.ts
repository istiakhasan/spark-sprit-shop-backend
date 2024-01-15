/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IPagination } from '../../../interface/commonInterface'
import { IReview } from './review.interface'
import { Review } from './review.schema'
import { ObjectId } from 'mongodb'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createReview = async (data: IReview) => {
  const isAlreadyReviewed = await Review.findOne({
    productId: data?.productId,
    userId: data?.userId,
  })
  if (isAlreadyReviewed) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You already review this product',
    )
  }
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

  const ratingAggregation = await Review.aggregate([
    { $match: whereConditions },
    {
      $group: {
        _id: null,
        ratingSum: { $sum: '$rating' },
      },
    },
  ])
  const totalRating = ratingAggregation
  return {
    meta: {
      page,
      limit,
      total,
      totalRating,
    },
    data: result,
  }
}
const totalRating = async (id: string) => {
  const result = await Review.aggregate([
    { $match: { productId: new ObjectId(id) } },
    {
      $group: {
        _id: null,
        rating: { $sum: '$rating' },
        totalReviewer: { $sum: 1 },
      },
    },
  ])
  return result
}

export const reviewService = {
  createReview,
  getbyProductid,
  totalRating,
}
