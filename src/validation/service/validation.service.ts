import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prismaService/prisma.service'
import { IsItemExistsInclude, IsItemExistsWhere } from '../types'

@Injectable()
export class ValidationService {
  constructor(private prisma: PrismaService) {}

  async isItemExists(params: {
    where: IsItemExistsWhere
    include: IsItemExistsInclude
    moduleName: string
  }) {
    const { where, include, moduleName } = params
    console.log(where)

    try {
      const item = await this.prisma[moduleName].findUnique({
        where,
        include,
      })

      if (item) return true

      return false
    } catch (error) {
      console.log(error)
    }
  }

  // TODO: https://trello.com/c/pO2a381g/16-come-uo-with-better-variable-name
  async isItemExistsWithSameId(params: {
    where: IsItemExistsWhere
    include: IsItemExistsInclude
    moduleName: string
    id: string
  }) {
    const { id, where, include, moduleName } = params

    try {
      const item = await this.prisma[moduleName].findUnique({
        where,
        include,
      })

      if (!item || item?.ulid === id) return true

      return false
    } catch (error) {
      console.log(error)
    }
  }
}
