import { Module } from '@nestjs/common'
import { PassionsController } from './controllers/passions.controller'
import { PassionsService } from './services/passions.service'
import { ValidationService } from 'src/validation/service/validation.service'
import { PrismaService } from 'src/prismaService/prisma.service'

@Module({
  controllers: [PassionsController],
  providers: [PassionsService, ValidationService, PrismaService],
})
export class PassionsModule {}
