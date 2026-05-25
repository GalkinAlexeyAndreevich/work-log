/*
  Warnings:

  - You are about to drop the column `work_type_name` on the `work_entries` table. All the data in the column will be lost.
  - Added the required column `work_type_id` to the `work_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `work_entries` DROP COLUMN `work_type_name`,
    ADD COLUMN `work_type_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `work_types` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `work_types_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `work_entries` ADD CONSTRAINT `work_entries_work_type_id_fkey` FOREIGN KEY (`work_type_id`) REFERENCES `work_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
