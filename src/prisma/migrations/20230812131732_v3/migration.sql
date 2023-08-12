/*
  Warnings:

  - You are about to drop the column `tagId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_tagId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "tagId";

-- DropTable
DROP TABLE "Tag";
