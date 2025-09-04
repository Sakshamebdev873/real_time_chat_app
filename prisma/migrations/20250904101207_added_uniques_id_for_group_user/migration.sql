/*
  Warnings:

  - A unique constraint covering the columns `[userId,groupId]` on the table `GroupUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupUser_userId_groupId_key" ON "public"."GroupUser"("userId", "groupId");
