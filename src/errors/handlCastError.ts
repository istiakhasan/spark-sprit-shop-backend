import mongoose from 'mongoose'

const handlCastError = (error: mongoose.CastError) => {
  const errors: {
    path: string | number
    message: string
  }[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  }
}
export default handlCastError
