/*
  Warnings:

  - You are about to drop the column `access_token` on the `user` table. All the data in the column will be lost.
  - Added the required column `otp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `access_token`,
    ADD COLUMN `isValidOtp` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `otp` TEXT NOT NULL;
