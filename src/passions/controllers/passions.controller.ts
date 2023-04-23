import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { PassionsService } from '../services/passions.service'
import { Passion } from '@prisma/client'
import { handleCatch } from 'src/utils/handleCatch'
import { PassionDto } from '../dtos/PassionDto'
import { ulid } from 'ulid'

@Controller('passions')
export class PassionsController {
  constructor(private passionsService: PassionsService) {}

  @Get('')
  async getPassions(@Query() query): Promise<Passion[]> {
    try {
      const passions = await this.passionsService.getPassions({
        where: {
          userId: query?.userId,
        },
      })

      return passions
    } catch (error) {
      handleCatch(error)
    }
  }

  @Get(':ulid')
  async getPassion(@Param('ulid') ulid: string): Promise<Passion> {
    try {
      const passion = await this.passionsService.getPassion({
        where: { ulid },
      })

      return passion
    } catch (error) {
      handleCatch(error)
    }
  }

  @Post()
  async createPassion(@Body() createPassionDto: PassionDto): Promise<Passion> {
    const { postId = '', userId = '', ...createPassionData } = createPassionDto

    try {
      const passion = await this.passionsService.createPassion({
        data: {
          ulid: ulid(),
          posts: postId ? { connect: { ulid: postId } } : {},
          users: userId ? { connect: { ulid: userId } } : {},
          ...createPassionData,
        },
      })

      return passion
    } catch (error) {
      handleCatch(error)
    }
  }

  @Put(':ulid')
  async updatePassion(
    @Param('ulid') ulid: string,
    @Body() updatePassionDto: PassionDto,
  ): Promise<Passion> {
    const { postId = '', userId = '', ...updatePassionData } = updatePassionDto

    try {
      const card = await this.passionsService.updatePassion({
        where: { ulid },
        data: {
          posts: postId ? { connect: { ulid: postId } } : {},
          users: userId ? { connect: { ulid: userId } } : {},
          ...updatePassionData,
        },
      })

      return card
    } catch (error) {
      handleCatch(error)
    }
  }

  @Delete(':ulid')
  @HttpCode(204)
  async deletePassion(@Param('ulid') ulid: string): Promise<void> {
    try {
      await this.passionsService.deletePassion({ ulid })
    } catch (error) {
      handleCatch(error)
    }
  }
}
