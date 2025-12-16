/**
 * @fileoverview Better Auth React client for frontend authentication.
 *
 * This module creates and exports the Better Auth client instance
 * configured for the React frontend. It provides authentication methods
 * (signIn, signUp, signOut) and the useSession hook.
 *
 * @module lib/auth-client
 * @see https://www.better-auth.com/docs/concepts/client
 */
import { createAuthClient } from "better-auth/react";

/**
 * API base URL.
 * Defaults to localhost:3000 in development.
 * Can be overridden via VITE_API_URL environment variable.
 */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Better Auth client instance.
 *
 * Provides:
 * - signIn.email() - Sign in with email/password
 * - signUp.email() - Sign up with email/password
 * - signOut() - Sign out
 * - useSession() - React hook for session state
 *
 * @example
 * ```tsx
 * import { authClient } from "./lib/auth-client";
 *
 * // Sign in
 * await authClient.signIn.email({ email, password });
 *
 * // Use session in component
 * const { data: session } = authClient.useSession();
 * ```
 */
export const authClient = createAuthClient({
    baseURL: API_URL,
    basePath: "/api/v1/auth",
});
