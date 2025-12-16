/**
 * @fileoverview Better Auth route handler for authentication endpoints.
 *
 * This module exposes authentication endpoints at /api/auth/*.
 * Better Auth automatically handles the following routes:
 * - POST /api/auth/sign-up/email    : Sign up with email/password
 * - POST /api/auth/sign-in/email    : Sign in with email/password
 * - POST /api/auth/sign-out         : Sign out
 * - GET  /api/auth/session          : Get current session
 * - And more depending on enabled plugins...
 *
 * @module modules/auth/auth.route
 * @see https://hono.dev/examples/better-auth
 * @see https://www.better-auth.com/docs/integrations/hono
 */
import { Hono } from "hono";
import { auth } from "../../lib/auth";
import type { AuthType } from "../../lib/auth";

/**
 * Typed Hono router with authentication context variables.
 * strict: false allows trailing slashes to be ignored.
 */
const router = new Hono<{ Variables: AuthType }>({ strict: false });

/**
 * Authentication handler.
 *
 * Delegates all POST and GET requests to Better Auth.
 * The wildcard pattern /* captures all sub-paths.
 *
 * @example
 * POST /api/auth/sign-up/email
 * POST /api/auth/sign-in/email
 * GET  /api/auth/session
 */
export const authRoute = router.on(["POST", "GET"], "/*", (c) => {
    return auth.handler(c.req.raw);
});
