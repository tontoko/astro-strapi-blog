CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`comment` text NOT NULL,
	`post_id` integer NOT NULL
);
