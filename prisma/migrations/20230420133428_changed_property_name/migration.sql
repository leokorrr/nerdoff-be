/*
  Warnings:

  - You are about to drop the column `postsId` on the `Passion` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `Passion` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Passion" DROP CONSTRAINT "Passion_postsId_fkey";

-- DropForeignKey
ALTER TABLE "Passion" DROP CONSTRAINT "Passion_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_usersId_fkey";

-- AlterTable
ALTER TABLE "Passion" DROP COLUMN "postsId",
DROP COLUMN "usersId",
ADD COLUMN     "postId" INTEGER,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "usersId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Passion" ADD CONSTRAINT "Passion_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passion" ADD CONSTRAINT "Passion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
