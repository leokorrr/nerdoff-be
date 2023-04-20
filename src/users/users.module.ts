import { Module } from '@nestjs/common'
import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { ValidationService } from 'src/validation/service/validation.service'
import { PrismaService } from 'src/prismaService/prisma.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService, ValidationService, PrismaService],
})
export class UsersModule {}
