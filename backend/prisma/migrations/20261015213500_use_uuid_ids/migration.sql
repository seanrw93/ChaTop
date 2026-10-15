-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_ibfk_2`;

-- DropForeignKey
ALTER TABLE `rentals` DROP FOREIGN KEY `rentals_ibfk_1`;

-- AlterTable
ALTER TABLE `messages` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `rental_id` CHAR(36) NOT NULL,
    MODIFY `user_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `rentals` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    MODIFY `owner_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`rental_id`) REFERENCES `rentals`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rentals` ADD CONSTRAINT `rentals_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

