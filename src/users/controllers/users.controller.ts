import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { handleCatch } from 'src/utils/handleCatch'
import { ulid } from 'ulid'
import { UserDto } from '../dtos/UserDto'
import { UsersService } from '../services/users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  async getUsers(): Promise<User[]> {
    try {
      const users = await this.usersService.getUsers()

      return users
    } catch (error) {
      handleCatch(error)
    }
  }

  @Get(':ulid')
  async getUser(@Param('ulid') ulid: string): Promise<User> {
    try {
      const user = await this.usersService.getUser({
        where: { ulid },
      })

      return user
    } catch (error) {
      handleCatch(error)
    }
  }

  @Post()
  async createUser(@Body() createUserDto: UserDto): Promise<User> {
    const { ...createUserData } = createUserDto

    try {
      const user = await this.usersService.createUser({
        data: {
          ulid: ulid(),
          ...createUserData,
        },
      })

      return user
    } catch (error) {
      console.log(error)
      handleCatch(error)
    }
  }

  @Put(':ulid')
  async updateUser(
    @Param('ulid') ulid: string,
    @Body() updateUserDto: UserDto,
  ): Promise<User> {
    const { ...updatePassionData } = updateUserDto

    try {
      const user = await this.usersService.updateUser({
        where: { ulid },
        data: {
          ...updatePassionData,
        },
        id: ulid,
      })

      return user
    } catch (error) {
      handleCatch(error)
    }
  }

  @Delete(':ulid')
  @HttpCode(204)
  async deleteUser(@Param('ulid') ulid: string): Promise<void> {
    try {
      await this.usersService.deleteUser({ ulid })
    } catch (error) {
      handleCatch(error)
    }
  }
}
