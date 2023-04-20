import { Module } from '@nestjs/common'
import { PostsController } from './controllers/posts.controller'
import { PostsService } from './services/posts.service'
import { ValidationService } from 'src/validation/service/validation.service'
import { PrismaService } from 'src/prismaService/prisma.service'

@Module({
  controllers: [PostsController],
  providers: [PostsService, ValidationService, PrismaService],
})
export class PostsModule {}
