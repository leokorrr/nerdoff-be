import { Module } from '@nestjs/common'
import { PassionsController } from './controllers/passions.controller'
import { PassionsService } from './services/passions.service'

@Module({
  controllers: [PassionsController],
  providers: [PassionsService],
})
export class PassionsModule {}
