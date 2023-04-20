import { HttpException, Injectable } from '@nestjs/common'
import { Passion, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prismaService/prisma.service'
import { notFoundMessage } from 'src/utils/errorMessages'
import { ValidationService } from 'src/validation/service/validation.service'

const DEFAULT_PASSION_INCLUDE = { users: false, posts: false }

@Injectable()
export class PassionsService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async getPassions(
    params: { where?: Prisma.PassionWhereInput } = { where: {} },
  ): Promise<Passion[]> {
    const { where } = params

    return this.prisma.passion.findMany({
      where,
      include: DEFAULT_PASSION_INCLUDE,
      orderBy: [{ id: 'desc' }],
    })
  }

  async getPassion(params: {
    where: Prisma.PassionWhereUniqueInput
  }): Promise<Passion> {
    const { where } = params

    return this.prisma.passion.findUnique({
      where,
      include: DEFAULT_PASSION_INCLUDE,
    })
  }

  async createPassion(params: {
    data: Prisma.PassionCreateInput
  }): Promise<Passion> {
    const { data } = params

    const passion = await this.prisma.passion.create({ data })

    if (passion) {
      return passion
    }

    throw new HttpException(notFoundMessage('Passion'), 404)
  }

  async updatePassion(params: {
    where: Prisma.PassionWhereUniqueInput
    data: Prisma.PassionUpdateInput
  }): Promise<Passion> {
    const { data, where } = params

    const isPassionExists = await this.validationService.isItemExists({
      moduleName: 'passion',
      where,
      include: DEFAULT_PASSION_INCLUDE,
    })

    if (isPassionExists) {
      return this.prisma.passion.update({
        data,
        where,
      })
    }

    throw new HttpException(notFoundMessage('Passion'), 404)
  }

  async deletePassion(where: Prisma.PassionWhereUniqueInput): Promise<Passion> {
    const isPassionExists = await this.validationService.isItemExists({
      moduleName: 'passion',
      where,
      include: DEFAULT_PASSION_INCLUDE,
    })

    if (isPassionExists) {
      return this.prisma.passion.delete({ where })
    }

    throw new HttpException(notFoundMessage('Passion'), 404)
  }
}
