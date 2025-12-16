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

const app = new Hono();

// Enable CORS for all routes to allow cross-origin requests from the frontend
app.use("/*", cors());

// Mount feature modules - add new routes here as the API grows
const routes = app.route("/comment", commentsRoute);

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
