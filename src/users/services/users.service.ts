import { HttpException, Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prismaService/prisma.service'
import { hashData } from 'src/utils/dataEncryption'
import { notFoundMessage } from 'src/utils/errorMessages'
import { ValidationService } from 'src/validation/service/validation.service'

const DEFAULT_USERS_INCLUDE = { posts: true, passions: true }
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async getUsers(
    params: { where?: Prisma.UserWhereInput } = { where: {} },
  ): Promise<User[]> {
    const { where } = params

    return this.prisma.user.findMany({
      where,
      include: DEFAULT_USERS_INCLUDE,
      orderBy: [{ id: 'desc' }],
    })
  }

  async getUser(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    const { where } = params

    return this.prisma.user.findUnique({
      where,
      include: DEFAULT_USERS_INCLUDE,
    })
  }

  async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params

    const hashedPassword = await hashData(data.password)

    const newUser = { ...data, password: hashedPassword }

    const user = await this.prisma.user.create({ data: newUser })

    // TODO: https://trello.com/c/vev1HWfN/14-same-username-validation
    // TODO:https://trello.com/c/ijgV9YQq/15-same-email-validation

    if (user) {
      return user
    }

    throw new HttpException(notFoundMessage('User'), 404)
  }
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { data, where } = params

    // TODO: https://trello.com/c/vev1HWfN/14-same-username-validation
    // TODO: https://trello.com/c/ijgV9YQq/15-same-email-validation
    const isUserExists = await this.validationService.isItemExists({
      moduleName: 'user',
      where,
      include: DEFAULT_USERS_INCLUDE,
    })

    if (isUserExists) {
      return this.prisma.user.update({
        data,
        where,
      })
    }

    throw new HttpException(notFoundMessage('User'), 404)
  }

  async deleteUser(where: Prisma.PostWhereUniqueInput): Promise<User> {
    const isUserExists = await this.validationService.isItemExists({
      moduleName: 'user',
      where,
      include: DEFAULT_USERS_INCLUDE,
    })

    if (isUserExists) {
      return this.prisma.user.delete({ where })
    }

    throw new HttpException(notFoundMessage('User'), 404)
  }
}
