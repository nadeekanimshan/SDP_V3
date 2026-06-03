# Database (Docker) - MySQL

Prisma in `backend/config/database/prisma/schema.prisma` is configured with `provider = "mysql"`.

## Start MySQL
1. Create a `.env` file inside `SDP V3.0.1` using `SDP V3.0.1/.env.example`.
2. From `SDP V3.0.1`, run:

   ```powershell
   docker compose up -d
   ```

## Create DB tables (Prisma)
1. Create a `.env` file inside `backend` using `SDP V3.0.1/backend/.env.example`.
2. From `backend`, run:

   ```powershell
   npm install
   npm run db:push
   ```

## Seed database (User, UserType, Class, Event)
From `backend`, run:

   ```powershell
   npm run db:seed
   ```

This seeds:
- **UserType**: ADMIN, USER
- **User**: Admin (john@gmail.com / admin1234), User (lucy@gmail.com / user1234)
- **Class**, **Event** (if configured)

## Useful URLs
- MySQL: `localhost:${MYSQL_PORT}` (as exposed by docker compose)
- Prisma expects `DATABASE_URL` to point to this MySQL.

