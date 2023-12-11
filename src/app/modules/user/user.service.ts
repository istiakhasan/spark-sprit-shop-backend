import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import { genarateCustomerId } from './user.util'

const createUser = async (data: IUser) => {
  if (!data.role) {
    data.role = 'customer'
  }
  const { userId, role, phone } = data
  const isUserExist = await User.findOne({ email: data.email })
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist')
  }
  //   generate customer id
  const finalId = await genarateCustomerId(data.role)
  data.userId = finalId
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
const login = async (data: { phone: string; password: string }) => {
  const isUserExist = await User.findOne({ phone: data.phone })
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not exist')
  }

  // const { id: userId, email, password: savePassword, role } = isUserExist;
  const { userId, phone, password: savePassword, role } = isUserExist
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
  if (data.password !== savePassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  return {
    accessToken,
    refreshToken,
  }
}

export const userService = {
  createUser,
  login,
}