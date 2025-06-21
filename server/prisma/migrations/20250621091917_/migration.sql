/*
  Warnings:

  - You are about to drop the column `completed` on the `CheckIn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CheckIn" DROP COLUMN "completed";

-- AlterTable
ALTER TABLE "Habit" ALTER COLUMN "reminder" SET DEFAULT false;
