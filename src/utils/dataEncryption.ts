import * as argon2 from 'argon2'
import { handleCatch } from './handleCatch'

export const hashData = async (rawData: string) => {
  try {
    const hash = await argon2.hash(String(rawData))

    return hash
  } catch (error) {
    handleCatch()
  }
}

export const verifyHashedData = async (rawData: string, hashedData: string) => {
  try {
    const result = await argon2.verify(String(hashedData), String(rawData))

    return result
  } catch (error) {
    handleCatch()
  }
}
