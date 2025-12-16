/**
 * @fileoverview API Integration Tests
 *
 * Tests for the Hono API endpoints including health check,
 * comments CRUD, and error handling.
 *
 * @module __tests__/api
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import app from "../index";

// Mock the comment service to avoid database calls
vi.mock("../modules/comment/comment.service", () => ({
  getAllComments: vi.fn(),
  getCommentById: vi.fn(),
  createComment: vi.fn(),
}));

import * as commentService from "../modules/comment/comment.service";

describe("API Integration Tests", () => {
  describe("Health Check", () => {
    it("GET /health should return 200 OK", async () => {
      const res = await app.fetch(new Request("http://localhost/health"));
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data).toHaveProperty("status", "ok");
      expect(data).toHaveProperty("uptime");
      expect(data).toHaveProperty("timestamp");
    });
  });

  describe("404 Handler", () => {
    it("should return 404 for unknown routes", async () => {
      const res = await app.fetch(
        new Request("http://localhost/unknown-route"),
      );
      expect(res.status).toBe(404);
      const data = await res.json();
      expect(data).toHaveProperty("error", "Not Found");
    });
  });

  describe("Comments API", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("GET /api/v1/comment should return all comments", async () => {
      const mockComments = [
        { id: 1, content: "Hello" },
        { id: 2, content: "World" },
      ];
      vi.mocked(commentService.getAllComments).mockResolvedValue(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockComments as any,
      );

      const res = await app.fetch(
        new Request("http://localhost/api/v1/comment"),
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(mockComments);
    });

    it("GET /api/v1/comment/:id should return a comment", async () => {
      const mockComment = { id: 1, content: "Hello" };
      vi.mocked(commentService.getCommentById).mockResolvedValue(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockComment as any,
      );

      const res = await app.fetch(
        new Request("http://localhost/api/v1/comment/1"),
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(mockComment);
    });

    it("GET /api/v1/comment/:id should return 404 if not found", async () => {
      vi.mocked(commentService.getCommentById).mockResolvedValue(null);

      const res = await app.fetch(
        new Request("http://localhost/api/v1/comment/999"),
      );
      expect(res.status).toBe(404);
    });

    it("GET /api/v1/comment/:id should return 400 for invalid ID", async () => {
      const res = await app.fetch(
        new Request("http://localhost/api/v1/comment/invalid"),
      );
      expect(res.status).toBe(400);
    });

    it("POST /api/v1/comment should create a comment", async () => {
      const newComment = { id: 3, content: "New Comment" };
      vi.mocked(commentService.createComment).mockResolvedValue(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newComment as any,
      );

      const res = await app.fetch(
        new Request("http://localhost/api/v1/comment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: "New Comment" }),
        }),
      );

      expect(res.status).toBe(201);
      expect(await res.json()).toEqual(newComment);
    });
  });
});
