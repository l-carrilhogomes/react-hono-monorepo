/**
 * @fileoverview Type-safe API client for the Hono backend.
 *
 * Uses hono/client which provides full TypeScript inference based on the
 * API's route definitions. The `AppType` import from @repo/api ensures
 * that all API calls are type-checked at compile time.
 *
 * @example
 * ```ts
 * const response = await client.comments.$get();
 * const data = await response.json(); // Fully typed!
 * ```
 */
import { hc } from "hono/client";
import type { AppType } from "@repo/api";

/** API base URL - defaults to localhost in development */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/** Type-safe Hono RPC client instance */
export const client = hc<AppType>(API_URL);
