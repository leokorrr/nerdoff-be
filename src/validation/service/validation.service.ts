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
}
