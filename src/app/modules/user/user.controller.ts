import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { userService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import config from '../../../config'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body)
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', result.refreshToken, cookieOptions)
  sendResponse(res, {
    message: 'Registration successfull',
    statusCode: httpStatus.OK,
    success: true,
    data: {
      accessToken: result.accessToken,
      data: result.user,
    },
  })
})
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.login(req.body)
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', result.refreshToken, cookieOptions)
  sendResponse(res, {
    message: 'Login successfull',
    statusCode: httpStatus.OK,
    success: true,
    data: { token: result.accessToken },
  })
})

export const userController = {
  createUser,
  login,
}
