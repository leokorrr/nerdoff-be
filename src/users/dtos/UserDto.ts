import { IsNotEmpty, MinLength } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @MinLength(10)
  password: string

  name: string

  surname: string

  age: number

  gender: string

  introduction: string

  location: string

  // TODO: posts
  // TODO: passions
}
