import { Response } from 'express'

type IResponse<T> = {
  success: boolean
  statusCode: number
  message: string
  meta?: {
    page: number
    limit: number
    count: number
  }
  data: T
}

const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  const responseData = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data,
  }

  res.status(data.statusCode).json(responseData)
}

export default sendResponse
