-- CreateTable
CREATE TABLE "Passion" (
    "id" SERIAL NOT NULL,
    "ulid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "postsId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usersId" INTEGER,

    CONSTRAINT "Passion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "ulid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL,
    "locations" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usersId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
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

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passion_ulid_key" ON "Passion"("ulid");

-- CreateIndex
CREATE UNIQUE INDEX "Passion_title_key" ON "Passion"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Post_ulid_key" ON "Post"("ulid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_ulid_key" ON "Users"("ulid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Passion" ADD CONSTRAINT "Passion_postsId_fkey" FOREIGN KEY ("postsId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Passion" ADD CONSTRAINT "Passion_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
