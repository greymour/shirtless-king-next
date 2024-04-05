CREATE TABLE `inventoryItems` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`price` integer,
	`image` text,
	`createdAt` timestamp,
	`updatedAt` timestamp
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`isExpired` integer DEFAULT false,
	`createdAt` timestamp,
	`updatedAt` timestamp,
	`uuid` text
);
--> statement-breakpoint
CREATE TABLE `sizes` (
	`id` integer PRIMARY KEY NOT NULL,
	`size` text NOT NULL,
	`stockCount` integer DEFAULT 0 NOT NULL,
	`inventoryItemId` integer,
	`createdAt` timestamp,
	`updatedAt` timestamp,
	FOREIGN KEY (`inventoryItemId`) REFERENCES `inventoryItems`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`isSuperAdmin` integer DEFAULT false,
	`createdAt` timestamp,
	`updatedAt` timestamp,
	`sessionId` integer,
	FOREIGN KEY (`sessionId`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `inventoryItems` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailIdx` ON `users` (`email`);