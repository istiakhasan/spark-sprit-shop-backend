import { IOrderLog } from './orderlog.interface'
import { OrderLog } from './orderlog.model'

const createOrderLogById = async (data: IOrderLog) => {
  const result = await OrderLog.create(data)
  return result
}
const getOrderLogById = async (id: string) => {
  const result = await OrderLog.findOne({ orderId: id })
  return result
}
export const orderLogService = {
  createOrderLogById,
  getOrderLogById,
}
