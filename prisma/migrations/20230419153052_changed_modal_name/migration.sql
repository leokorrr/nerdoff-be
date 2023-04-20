/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Passion" DROP CONSTRAINT "Passion_usersId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_usersId_fkey";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "ulid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "introduction" TEXT,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ulid_key" ON "User"("ulid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Passion" ADD CONSTRAINT "Passion_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
