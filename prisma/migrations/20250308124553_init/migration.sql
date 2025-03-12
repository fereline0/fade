/*
  Warnings:

  - A unique constraint covering the columns `[position]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Role_position_key" ON "Role"("position");
