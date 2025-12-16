/**
 * @fileoverview Main API entry point for the Hono server.
 *
 * This module bootstraps the Hono application, configures global middleware,
 * and registers all route modules. The exported `AppType` provides end-to-end
 * type safety when consumed by the frontend via hono/client.
 *
 * @see {@link https://hono.dev/} Hono documentation
 */
import { Hono } from "hono";
import { cors } from "hono/cors";
import { commentsRoute } from "./modules/comment/comment.route";
import { authRoute } from "./modules/auth/auth.route";

const app = new Hono();

/**
 * CORS configuration for authentication.
 * 
 * credentials: true - Required for Better Auth to send/receive cookies
 * origin - Must match the frontend origin exactly
 * allowHeaders - Required headers for auth requests
 */
app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

/**
 * Mount feature modules.
 * 
 * - /api/auth/* - Better Auth authentication endpoints
 * - /comment/*  - Comment CRUD operations
 */
const routes = app
  .route("/api/auth", authRoute)
  .route("/comment", commentsRoute);

/**
 * Exported type representing the full API route structure.
 * Used by hono/client on the frontend for type-safe API calls.
 */
export type AppType = typeof routes;

// Bun server configuration
export default {
  port: 3000,
  fetch: app.fetch,
};

