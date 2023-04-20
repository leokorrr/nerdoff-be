import { Module } from '@nestjs/common'
import { ValidationService } from './service/validation.service'
import { PrismaService } from 'src/prismaService/prisma.service'

@Module({
  providers: [PrismaService, ValidationService],
})
export class ValidationModule {}
