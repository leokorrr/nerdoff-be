import { Prisma } from '@prisma/client'

export type IsItemExistsWhere =
  | Prisma.PostWhereUniqueInput
  | Prisma.UserWhereUniqueInput
  | Prisma.UserWhereUniqueInput

export type IsItemExistsInclude =
  | Prisma.PostInclude
  | Prisma.PassionInclude
  | Prisma.UserInclude
