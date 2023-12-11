import { User } from './user.model'

export const genarateCustomerId = async (role: string): Promise<string> => {
  const findLastCustomer = await User.findOne(
    {
      role: role,
    },
    { userId: 1, _id: 0 },
  ).sort({ createdAt: -1 })
  const lastCustomerId = findLastCustomer
    ? findLastCustomer?.userId?.substring(6)
    : undefined
  const currentId = lastCustomerId || (0).toString().padStart(5, '0')
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  let firstCharechter: string = ''
  if (role === 'customer') {
    firstCharechter = 'C'
  } else if (role === 'admin') {
    firstCharechter = 'A'
  } else if (role === 'seller') {
    firstCharechter = 'S'
  } else if (role === 'super_admin') {
    firstCharechter = 'A'
  }
  const finalId = `${firstCharechter}-${new Date()
    .getFullYear()
    .toString()
    .substring(2)}${new Date().getMonth()}${incrementedId}`

  return finalId
}
