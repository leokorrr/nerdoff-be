import { IsNotEmpty } from 'class-validator'

export class PassionDto {
  @IsNotEmpty()
  title: string

  postId: string

  userId: string
}
