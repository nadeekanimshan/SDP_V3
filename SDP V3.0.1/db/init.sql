-- Optional MySQL initialization.
-- Prisma will create tables using `prisma db push`, so we only set DB defaults here.

CREATE DATABASE IF NOT EXISTS `sdp`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

ALTER DATABASE `sdp`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

