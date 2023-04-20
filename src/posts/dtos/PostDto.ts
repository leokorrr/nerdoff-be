import { IsNotEmpty } from 'class-validator'

export class PostDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  isOnline: boolean

  locations: string[]

  userId: string

  // TODO: https://trello.com/c/vWJOQOUH/12-add-passions-to-post
}
