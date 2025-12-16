/**
 * @fileoverview Comment-related DTOs and validation schemas.
 *
 * This module defines Zod schemas that are shared between the API and frontend.
 * Using the same schema ensures consistent validation across the entire stack.
 */
import { z } from "zod";

/**
 * Validation schema for creating a new comment.
 * Enforces content length limits and provides localized error messages.
 */
export const CreateCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Le commentaire ne peut pas être vide")
    .max(500, "Le commentaire est trop long"),
});

/**
 * TypeScript type inferred from the CreateCommentSchema.
 * Use this type for function parameters and React form state.
 */
export type CreateCommentDto = z.infer<typeof CreateCommentSchema>;
