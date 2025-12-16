/**
 * @fileoverview Authentication DTOs and validation schemas.
 *
 * This module defines Zod schemas for authentication operations that are
 * shared between the API and frontend. Using the same schema ensures
 * consistent validation across the entire stack.
 *
 * @module authSchema
 * @see https://github.com/colinhacks/zod
 */
import { z } from "zod";

// =============================================================================
// SIGN UP
// =============================================================================

/**
 * Validation schema for user registration.
 *
 * Fields:
 * - email: Valid email format required
 * - password: Minimum 8 characters for security
 * - name: Non-empty string required
 */
export const SignUpSchema = z.object({
    /** User's email address - must be valid email format */
    email: z.email("Invalid email address"),
    /** User's password - minimum 8 characters for security */
    password: z.string().min(8, "Password must be at least 8 characters"),
    /** User's display name - cannot be empty */
    name: z.string().min(1, "Name is required"),
});

/**
 * TypeScript type inferred from SignUpSchema.
 * Use for function parameters and React form state.
 *
 * @example
 * ```ts
 * const formData: SignUpDto = { email: "user@example.com", password: "********", name: "John" };
 * ```
 */
export type SignUpDto = z.infer<typeof SignUpSchema>;

// =============================================================================
// SIGN IN
// =============================================================================

/**
 * Validation schema for user login.
 *
 * Fields:
 * - email: Valid email format required
 * - password: Non-empty string required
 */
export const SignInSchema = z.object({
    /** User's email address - must be valid email format */
    email: z.email("Invalid email address"),
    /** User's password - cannot be empty */
    password: z.string().min(1, "Password is required"),
});

/**
 * TypeScript type inferred from SignInSchema.
 * Use for function parameters and React form state.
 *
 * @example
 * ```ts
 * const credentials: SignInDto = { email: "user@example.com", password: "********" };
 * ```
 */
export type SignInDto = z.infer<typeof SignInSchema>;
