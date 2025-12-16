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
import { logger } from "./lib/logger";

const app = new Hono();

/**
 * CORS configuration for authentication.
 * 
 * credentials: true - Required for Better Auth to send/receive cookies
 * origin - Must match the frontend origin exactly (from env)
 * allowHeaders - Required headers for auth requests
 */
app.use(
  "/*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

/**
 * Global error handler.
 * 
 * Catches all unhandled errors and returns a structured JSON response.
 * In development, includes the error message; in production, hides details.
 */
app.onError((err, c) => {
  logger.error({ err, path: c.req.path, method: c.req.method }, "Unhandled error");

  const isDev = process.env.NODE_ENV !== "production";

  return c.json(
    {
      error: "Internal Server Error",
      message: isDev ? err.message : "An unexpected error occurred",
      ...(isDev && { stack: err.stack }),
    },
    500
  );
});

/**
 * 404 Not Found handler.
 */
app.notFound((c) => {
  return c.json(
    {
      error: "Not Found",
      message: `Route ${c.req.path} not found`,
    },
    404
  );
});

/**
 * Health check endpoint.
 * 
 * Returns service status for monitoring and load balancer health checks.
 */
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * Mount feature modules.
 * 
 * - /api/v1/auth/* - Better Auth authentication endpoints
 * - /api/v1/comment/* - Comment CRUD operations
 */
const routes = app
  .route("/api/v1/auth", authRoute)
  .route("/api/v1/comment", commentsRoute);

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
