import { IsNotEmpty } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  email: string

  name: string

  surname: string

  age: number

  gender: string

  introduction: string

  location: string

  // TODO: posts
  // TODO: passions
}
