/*
  Warnings:

  - A unique constraint covering the columns `[habitId,date]` on the table `CheckIn` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CheckIn_habitId_key";

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_habitId_date_key" ON "CheckIn"("habitId", "date");
