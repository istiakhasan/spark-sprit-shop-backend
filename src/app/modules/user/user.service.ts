import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const createUser = async (data: IUser) => {
  if (!data.role) {
    data.role = 'customer'
  }
  const { userId, role, phone } = data
  const isUserExist = await User.findOne({ email: data.email })
  //   generate customer id
  const findLastCustomer = await User.findOne(
    {
      role: 'customer',
    },
    { userId: 1, _id: 0 },
  ).sort({ createdAt: -1 })

  const lastCustomerId = findLastCustomer
    ? findLastCustomer?.userId?.substring(6)
    : undefined
  const currentId = lastCustomerId || (0).toString().padStart(5, '0')
  console.log(findLastCustomer)
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  //20 25
  const finalId = `c-${new Date()
    .getFullYear()
    .toString()
    .substring(2)}${new Date().getMonth()}${incrementedId}`
  data.userId = finalId
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist')
  }

  const accessToken = jwtHelpers.createToken(
    { userId, role, phone },
    config.secret as Secret,
    config.expires_in as string,
  )
  const refreshToken = jwtHelpers.createToken(
    { userId, role, phone },
    config.refresh_secret as Secret,
    config.refresh_expires_in as string,
  )
  const user = await User.create(data)
  return {
    accessToken,
    refreshToken,
    user,
  }
}

export const userService = {
  createUser,
}
