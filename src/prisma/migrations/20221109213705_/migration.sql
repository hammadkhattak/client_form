/*
  Warnings:

  - Made the column `aestheticSequels` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `daysTreatment` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `permanentWorkIncapacity` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `psychologicalSequelae` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surgicalInterventions` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `typeOfInjury` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isValidOTP` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `totalPrice` INTEGER NOT NULL DEFAULT 0,
    MODIFY `aestheticSequels` VARCHAR(255) NOT NULL,
    MODIFY `daysTreatment` VARCHAR(255) NOT NULL,
    MODIFY `permanentWorkIncapacity` VARCHAR(255) NOT NULL,
    MODIFY `psychologicalSequelae` VARCHAR(255) NOT NULL,
    MODIFY `surgicalInterventions` VARCHAR(255) NOT NULL,
    MODIFY `typeOfInjury` VARCHAR(255) NOT NULL;
