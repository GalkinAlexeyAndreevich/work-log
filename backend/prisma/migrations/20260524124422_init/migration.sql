-- CreateTable
CREATE TABLE `work_entries` (
    `id` VARCHAR(191) NOT NULL,
    `completed_at` DATE NOT NULL,
    `work_type_name` VARCHAR(255) NOT NULL,
    `volume` DECIMAL(10, 2) NOT NULL,
    `unit` VARCHAR(50) NOT NULL,
    `executor_name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
