-- DropForeignKey
ALTER TABLE `folder` DROP FOREIGN KEY `folder_parentId_fkey`;

-- DropIndex
DROP INDEX `folder_parentId_fkey` ON `folder`;

-- AddForeignKey
ALTER TABLE `folder` ADD CONSTRAINT `folder_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `folder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
