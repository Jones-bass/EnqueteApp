/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Poll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Options" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "pollId" TEXT NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Poll_title_key" ON "Poll"("title");

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
