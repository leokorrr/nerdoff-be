import { HttpException, Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prismaService/prisma.service'
import { hashData } from 'src/utils/dataEncryption'
import { alreadyExistsMessage, notFoundMessage } from 'src/utils/errorMessages'
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

    console.log(data)

    const isUsernameTakenPromise = this.validationService.isItemExists({
      moduleName: 'user',
      where: { username: data.username },
      include: { posts: false, passions: false },
    })

    const isEmailTakenPromise = this.validationService.isItemExists({
      moduleName: 'user',
      where: { email: data.email },
      include: { posts: false, passions: false },
    })

    const [isUsernameTaken, isEmailTaken] = await Promise.all([
      isUsernameTakenPromise,
      isEmailTakenPromise,
    ])

    if (isUsernameTaken) {
      throw new HttpException(alreadyExistsMessage('User', 'username'), 404)
    }

    if (isEmailTaken) {
      throw new HttpException(alreadyExistsMessage('User', 'email'), 404)
    }

    const hashedPassword = await hashData(data.password)

    const newUser = { ...data, password: hashedPassword }

    const user = await this.prisma.user.create({ data: newUser })

    if (!user) {
      throw new HttpException(notFoundMessage('User'), 404)
    }

    return user
  }
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
    id: string
  }): Promise<User> {
    const { data, where, id } = params

    // TODO: https://trello.com/c/vev1HWfN/14-same-username-validation
    // TODO: https://trello.com/c/ijgV9YQq/15-same-email-validation
    const isUserExistsPromise = this.validationService.isItemExists({
      moduleName: 'user',
      where,
      include: DEFAULT_USERS_INCLUDE,
    })

    // Check if we are updating unique constraints for user that already have them
    // TODO: https://trello.com/c/pO2a381g/16-come-uo-with-better-variable-name
    const isUserWithSameUsernameIsSamePromise =
      this.validationService.isItemExistsWithSameId({
        moduleName: 'user',
        where: { username: String(data.username) },
        include: { posts: false, passions: false },
        id,
      })

    const isUserWithSameEmailIsSamePromise =
      this.validationService.isItemExistsWithSameId({
        moduleName: 'user',
        where: { email: String(data.email) },
        include: { posts: false, passions: false },
        id,
      })

    const [
      isUserExists,
      isUserWithSameUsernameIsSame,
      isUserWithSameEmailIsSame,
    ] = await Promise.all([
      isUserExistsPromise,
      isUserWithSameUsernameIsSamePromise,
      isUserWithSameEmailIsSamePromise,
    ])

    if (!isUserExists) {
      throw new HttpException(notFoundMessage('User'), 404)
    }

    if (!isUserWithSameUsernameIsSame) {
      throw new HttpException(alreadyExistsMessage('User', 'username'), 404)
    }

    if (!isUserWithSameEmailIsSame) {
      throw new HttpException(alreadyExistsMessage('User', 'email'), 404)
    }

    return this.prisma.user.update({
      data,
      where,
    })
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
