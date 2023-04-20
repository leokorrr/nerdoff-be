import { HttpException, Injectable } from '@nestjs/common'
import { Post, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prismaService/prisma.service'
import { notFoundMessage } from 'src/utils/errorMessages'
import { ValidationService } from 'src/validation/service/validation.service'

const DEFAULT_POSTS_INCLUDE = { users: true, passions: true }
@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  async getPosts(
    params: { where?: Prisma.PostWhereInput } = { where: {} },
  ): Promise<Post[]> {
    const { where } = params

    return this.prisma.post.findMany({
      where,
      include: DEFAULT_POSTS_INCLUDE,
      orderBy: [{ id: 'desc' }],
    })
  }

  async getPost(params: { where: Prisma.PostWhereUniqueInput }): Promise<Post> {
    const { where } = params

    return this.prisma.post.findUnique({
      where,
      include: DEFAULT_POSTS_INCLUDE,
    })
  }

  async createPost(params: { data: Prisma.PostCreateInput }): Promise<Post> {
    const { data } = params

    const post = await this.prisma.post.create({ data })

    if (post) {
      return post
    }

    throw new HttpException(notFoundMessage('Post'), 404)
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput
    data: Prisma.PostUpdateInput
  }): Promise<Post> {
    const { data, where } = params

    const isPostExists = await this.validationService.isItemExists({
      moduleName: 'post',
      where,
      include: DEFAULT_POSTS_INCLUDE,
    })

    if (isPostExists) {
      return this.prisma.post.update({
        data,
        where,
      })
    }

    throw new HttpException(notFoundMessage('Post'), 404)
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    const isPostExists = await this.validationService.isItemExists({
      moduleName: 'post',
      where,
      include: DEFAULT_POSTS_INCLUDE,
    })

    if (isPostExists) {
      return this.prisma.post.delete({ where })
    }

    throw new HttpException(notFoundMessage('Post'), 404)
  }
}
