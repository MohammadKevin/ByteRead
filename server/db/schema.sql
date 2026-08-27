-- ============================================================
-- SQL SCHEMA & SEEDING UNTUK BYTEREAD (DomaiNesia phpMyAdmin)
-- Database: `budayaki_byteread`
-- ============================================================

-- 1. Buat Tabel `users`
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(191) PRIMARY KEY,
  `email` VARCHAR(191) UNIQUE NOT NULL,
  `username` VARCHAR(191) UNIQUE NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `avatarSeed` INT DEFAULT 1,
  `level` INT DEFAULT 1,
  `levelTitle` VARCHAR(191) DEFAULT 'Level 1: Page Novice 📖',
  `xp` INT DEFAULT 0,
  `totalMinutesRead` INT DEFAULT 0,
  `totalHoursSaved` FLOAT DEFAULT 0,
  `quizAccuracyAverage` FLOAT DEFAULT 0,
  `currentStreak` INT DEFAULT 0,
  `longestStreak` INT DEFAULT 0,
  `lastReadDate` VARCHAR(50),
  `streakFreezesAvailable` INT DEFAULT 1,
  `isFreezeActive` BOOLEAN DEFAULT FALSE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Buat Tabel `user_bookmarks`
CREATE TABLE IF NOT EXISTS `user_bookmarks` (
  `id` VARCHAR(191) PRIMARY KEY,
  `userId` VARCHAR(191) NOT NULL,
  `bookId` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `user_book_idx` (`userId`, `bookId`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Buat Tabel `saved_quote_snapshots`
CREATE TABLE IF NOT EXISTS `saved_quote_snapshots` (
  `id` VARCHAR(191) PRIMARY KEY,
  `userId` VARCHAR(191) NOT NULL,
  `bookId` VARCHAR(191) NOT NULL,
  `bookTitle` VARCHAR(191) NOT NULL,
  `author` VARCHAR(191) NOT NULL,
  `quote` TEXT NOT NULL,
  `themeStyle` VARCHAR(50) DEFAULT 'FRESH_BLUE',
  `savedAt` VARCHAR(100) DEFAULT 'Hari ini',
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Buat Tabel `user_book_progress`
CREATE TABLE IF NOT EXISTS `user_book_progress` (
  `id` VARCHAR(191) PRIMARY KEY,
  `userId` VARCHAR(191) NOT NULL,
  `bookId` VARCHAR(191) NOT NULL,
  `status` VARCHAR(50) DEFAULT 'IN_PROGRESS',
  `totalSecondsRead` INT DEFAULT 0,
  `isQuizPassed` BOOLEAN DEFAULT FALSE,
  `quizScore` INT DEFAULT 0,
  `xpEarned` INT DEFAULT 0,
  `lastReadAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `user_prog_idx` (`userId`, `bookId`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Seed Akun Demo: Alex Reader (password: password123)
INSERT INTO `users` (
  `id`, `email`, `username`, `name`, `password`, `avatarSeed`, `level`, `levelTitle`, `xp`, `totalMinutesRead`, `totalHoursSaved`, `quizAccuracyAverage`, `currentStreak`, `longestStreak`, `lastReadDate`
) VALUES (
  'user-demo-01',
  'alex@byteread.app',
  '@alex_reads',
  'Alex Reader',
  '$2b$10$0QfL8Nwk6RD8TEUI3ErsXODPPdcZEzTSz5lR4dBqDJtLGGoDfUfka',
  42,
  3,
  'Level 3: Byte Synthesizer ⚡',
  380,
  9,
  6.5,
  90,
  3,
  5,
  '2026-08-27'
) ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 6. Seed Demo Bookmarks
INSERT IGNORE INTO `user_bookmarks` (`id`, `userId`, `bookId`)
VALUES
  ('bm-1', 'user-demo-01', 'book-atomic-habits'),
  ('bm-2', 'user-demo-01', 'book-deep-work');
