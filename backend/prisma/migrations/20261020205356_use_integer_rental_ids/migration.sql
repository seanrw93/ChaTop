/*
  Warnings:

  - You are about to alter the column `rental_id` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.
  - The primary key for the `rentals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `rentals` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_ibfk_1`;

-- AlterTable
ALTER TABLE `messages` MODIFY `rental_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rentals` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`rental_id`) REFERENCES `rentals`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
