import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { JwtPayload, Secret } from 'jsonwebtoken'
import { genarateCustomerId } from './user.util'
import bcrypt from 'bcrypt'

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
  const user = await User.create(data)
  const { _id } = user
  const accessToken = jwtHelpers.createToken(
    { userId, role, phone, _id },
    config.secret as Secret,
    config.expires_in as string,
  )
  const refreshToken = jwtHelpers.createToken(
    { userId, role, phone, _id },
    config.refresh_secret as Secret,
    config.refresh_expires_in as string,
  )

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
  const { userId, phone, password: savePassword, role, _id } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userId, role, phone, _id },
    config.secret as Secret,
    config.expires_in as string,
  )
  const refreshToken = jwtHelpers.createToken(
    { userId, role, phone, _id },
    config.refresh_secret as Secret,
    config.refresh_expires_in as string,
  )
  const isPasswordMatch = await bcrypt.compare(data?.password, savePassword)
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  return {
    accessToken,
    refreshToken,
  }
}

const getProfileInfo = async (user: JwtPayload | null) => {
  if (user?._id) {
    const result = await User.findById(user._id)
    return result
  }
}
const updateProfile = async (user: JwtPayload | null, data: Partial<IUser>) => {
  if (user?._id) {
    const result = await User.findByIdAndUpdate(user._id, data, { new: true })
    return result
  }
}

export const userService = {
  createUser,
  login,
  getProfileInfo,
  updateProfile,
}
