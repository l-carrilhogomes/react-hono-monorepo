/**
 * @fileoverview Comment service layer.
 *
 * Contains business logic for comment operations. This layer abstracts
 * database operations from route handlers, making the code more testable
 * and maintainable.
 */
import type { CreateCommentDto } from "@repo/dtos";
import { prisma } from "../../lib/prisma";

/**
 * Creates a new comment in the database.
 * @param data - Validated comment data from the request
 * @returns The newly created comment record
 */
export const createComment = async (data: CreateCommentDto) => {
  return await prisma.comment.create({
    data: {
      comment: data.content,
    },
  });
};

/**
 * Retrieves all comments ordered by most recent first.
 * @returns Array of all comment records
 */
export const getAllComments = async () => {
  return await prisma.comment.findMany({
    orderBy: { id: "desc" },
  });
};

/**
 * Retrieves a single comment by its ID.
 * @param id - The comment's unique identifier
 * @returns The comment record or null if not found
 */
export const getCommentById = async (id: number) => {
  return await prisma.comment.findUnique({
    where: { id },
  });
};
