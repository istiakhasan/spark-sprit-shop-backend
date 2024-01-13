/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken'
import { AddressBook } from './addressBook.schema'
import { IAddressBook } from './addressBook.interface'

const createAddress = async (data: IAddressBook) => {
  if (data?.defaultDeliveryAddress) {
    await AddressBook.updateMany(
      { userId: data?.userId },
      {
        defaultDeliveryAddress: false,
      },
    )
  }
  const result = await AddressBook.create(data)
  return result
}
const getById = async (user: JwtPayload | null) => {
  const result = await AddressBook.find({ userId: user?._id }).sort({
    createdAt: -1,
  })

  return result
}
const updateAddress = async (
  data: IAddressBook & {
    _id: string
  },
) => {
  const { _id, ...rest } = data
  const result = await AddressBook.findByIdAndUpdate(_id, rest, { new: true })
  if (result && rest.defaultDeliveryAddress === true) {
    await AddressBook.updateMany(
      { $and: [{ userId: data?.userId }, { _id: { $ne: _id } }] },
      {
        defaultDeliveryAddress: false,
      },
    )
  }
  return result
}

export const addressBookService = {
  createAddress,
  updateAddress,
  getById,
}
