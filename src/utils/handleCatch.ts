import { HttpException, HttpStatus } from '@nestjs/common'
import { GENERIC_ERROR_MESSAGE } from './errorMessages'

export const handleCatch = (error?) => {
  const response = error?.response ?? GENERIC_ERROR_MESSAGE
  const statusCode = error?.status ?? HttpStatus.BAD_REQUEST
  throw new HttpException(response, statusCode)
}
