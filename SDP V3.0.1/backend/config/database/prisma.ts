
import { PrismaClient } from "./prisma/generated/prisma/client";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Initializes a new instance of the PrismaClient with custom logging and datasource configuration.
 *
 * The logging configuration is determined based on the environment:
 * - In production, logging is disabled.
 * - In non-production environments, logging can be enabled for queries, info, warnings, and errors based on the `DATABASE_LOG` environment variable.
 *
 * The datasource configuration uses the database URL specified in the `DATABASE_URL` environment variable.
 *
 * @constant {PrismaClient} prisma - The PrismaClient instance configured with logging and datasource settings.
 */
const prisma = new PrismaClient({
  log: isProduction ? [] : ["query","info", "warn", "error"],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Handle Prisma Client disconnection on application shutdown
const disconnectPrisma = async () => {
  await prisma.$disconnect();
  console.log("Prisma Client disconnected");
};

process.on("SIGINT", async () => {
  await disconnectPrisma();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectPrisma();
  process.exit(0);
});

export { prisma };
export * from "./prisma/generated/prisma/client";
