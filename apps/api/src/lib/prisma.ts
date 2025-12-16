/**
 * @fileoverview Prisma client singleton with PostgreSQL adapter.
 *
 * Implements the singleton pattern to prevent multiple PrismaClient instances
 * during development hot-reloads, which would exhaust database connections.
 * Uses the native `pg` driver via @prisma/adapter-pg for optimal performance.
 *
 * @see {@link https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient}
 */
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

// Connection pool manages PostgreSQL connections efficiently
const pool = new Pool({ connectionString });

// Prisma adapter bridges PrismaClient with the native pg driver
const adapter = new PrismaPg(pool);

// Attach PrismaClient to globalThis to persist across hot-reloads
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * Singleton Prisma client instance.
 * Reuses existing instance in development to prevent connection exhaustion.
 */
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

// Cache instance globally in non-production environments
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
