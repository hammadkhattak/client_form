/*
  Warnings:

  - You are about to drop the column `isValidOtp` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `otp` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Int`.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `isValidOtp`,
    ADD COLUMN `aestheticSequels` TEXT NULL,
    ADD COLUMN `daysTreatment` VARCHAR(255) NULL,
    ADD COLUMN `isFormComplete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isOTPSent` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `permanentWorkIncapacity` TEXT NULL,
    ADD COLUMN `psychologicalSequelae` TEXT NULL,
    ADD COLUMN `surgicalInterventions` VARCHAR(255) NULL,
    ADD COLUMN `typeOfInjury` VARCHAR(255) NULL,
    MODIFY `otp` INTEGER NOT NULL;
