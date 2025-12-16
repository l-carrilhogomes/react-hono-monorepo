/**
 * @fileoverview Comment REST API routes.
 *
 * Defines the following endpoints:
 * - GET  /comments     - List all comments
 * - GET  /comments/:id - Get a single comment by ID
 * - POST /comments     - Create a new comment (validated via Zod)
 *
 * All routes use the comment service layer for database operations.
 */
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CreateCommentSchema } from "@repo/dtos";
import {
  createComment,
  getAllComments,
  getCommentById,
} from "../comment/comment.service";

const router = new Hono();

export const commentsRoute = router
  // GET /comments - Retrieve all comments
  .get("/", async (c) => {
    const comments = await getAllComments();
    return c.json(comments);
  })

  // GET /comments/:id - Retrieve a specific comment
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"), 10);

    if (isNaN(id)) {
      return c.json({ error: "Invalid ID" }, 400);
    }

    const comment = await getCommentById(id);

    if (!comment) {
      return c.json({ error: "Comment not found" }, 404);
    }

    return c.json(comment);
  })

  // POST /comments - Create a new comment with Zod validation
  .post("/", zValidator("json", CreateCommentSchema), async (c) => {
    const dto = c.req.valid("json");
    const newComment = await createComment(dto);
    return c.json(newComment, 201);
  });
