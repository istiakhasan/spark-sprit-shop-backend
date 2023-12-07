import mongoose from 'mongoose'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: {
    path: string | number
    message: string
  }[]
}

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: {
    path: string | number
    message: string
  }[] = Object.values(error.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError
