import { ZodError, ZodIssue } from 'zod'
const handleZodError = (error: ZodError) => {
  const statusCode = 400
  const errors: {
    path: string | number
    message: string
  }[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    }
  })
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleZodError
