CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `mobile` VARCHAR(20) NULL,
    `password` VARCHAR(191) NULL,
    `tokenRevokeTime` DATETIME NULL DEFAULT NOW(),
    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_mobile_key`(`mobile`),
    PRIMARY KEY (`id`)
);

CREATE TABLE `OneTimeLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NULL,
    `isVerfied` BIT DEFAULT 0,
	`expiresAt` DATETIME,
    PRIMARY KEY (`id`)
);