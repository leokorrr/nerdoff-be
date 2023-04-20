import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { PostsService } from '../services/posts.service'
import { handleCatch } from 'src/utils/handleCatch'
import { Post as UserPost } from '@prisma/client'
import { PostDto } from '../dtos/PostDto'
import { ulid } from 'ulid'

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('')
  async getPosts(@Query() query): Promise<UserPost[]> {
    try {
      const posts = await this.postsService.getPosts({
        where: {
          userId: query?.userId,
        },
      })

      return posts
    } catch (error) {
      handleCatch(error)
    }
  }

  @Get(':ulid')
  async getPost(@Param('ulid') ulid: string): Promise<UserPost> {
    try {
      const post = await this.postsService.getPost({
        where: { ulid },
      })

      return post
    } catch (error) {
      handleCatch(error)
    }
  }

  @Post()
  async createPost(@Body() createPostDto: PostDto): Promise<UserPost> {
    const { userId = '', ...createPostData } = createPostDto

    try {
      const post = await this.postsService.createPost({
        data: {
          ulid: ulid(),
          users: userId ? { connect: { ulid: userId } } : {},
          ...createPostData,
        },
      })

      return post
    } catch (error) {
      handleCatch(error)
    }
  }

  @Put(':ulid')
  async updatePost(
    @Param('ulid') ulid: string,
    @Body() updatePostDto: PostDto,
  ): Promise<UserPost> {
    const { userId = '', ...updatePostData } = updatePostDto

    try {
      const post = await this.postsService.updatePost({
        where: { ulid },
        data: {
          users: userId ? { connect: { ulid: userId } } : {},
          ...updatePostData,
        },
      })

      return post
    } catch (error) {
      handleCatch(error)
    }
  }

  @Delete(':ulid')
  @HttpCode(204)
  async deletePost(@Param('ulid') ulid: string): Promise<void> {
    try {
      await this.postsService.deletePost({ ulid })
    } catch (error) {
      handleCatch(error)
    }
  }
}
