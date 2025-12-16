/**
 * @fileoverview Better Auth configuration with Prisma adapter.
 *
 * This module configures the Better Auth instance for authentication.
 * It uses the Prisma adapter for database persistence with PostgreSQL.
 *
 * @module lib/auth
 * @see https://www.better-auth.com/docs/installation
 * @see https://www.better-auth.com/docs/adapters/prisma
 */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

/**
 * Better Auth instance configuration.
 *
 * Current configuration:
 * - Database: PostgreSQL via Prisma adapter
 * - Email/password authentication: enabled
 * - Trusted origins: local frontend (port 5173)
 */
export const auth = betterAuth({
    /**
     * Database configuration.
     * Uses Prisma adapter with PostgreSQL provider.
     */
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    /**
     * Trusted origins for CORS.
     * These domains are allowed to make authentication requests.
     */
    trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],

    /**
     * Email/password authentication configuration.
     * Allows users to sign up and sign in with email/password.
     */
    emailAndPassword: {
        enabled: true,
    },
});

/**
 * Type definitions for Hono authentication context.
 *
 * These types are used in middlewares and routes to access
 * user and session data in a type-safe manner.
 */
export type AuthType = {
    /** Authenticated user or null if not authenticated */
    user: typeof auth.$Infer.Session.user | null;
    /** Active session or null if not authenticated */
    session: typeof auth.$Infer.Session.session | null;
};
