/**
 * @fileoverview Rate limiter middleware for API protection.
 *
 * Limits the number of requests per IP address to prevent abuse.
 * Uses in-memory storage (for production, consider Redis).
 *
 * @module middleware/rateLimiter
 *
 * @example
 * ```ts
 * import { rateLimiter } from "../middleware/rateLimiter";
 *
 * app.use("/api/*", rateLimiter);
 * ```
 */
import { createMiddleware } from "hono/factory";
import { RateLimiterMemory } from "rate-limiter-flexible";

/**
 * Rate limiter instance.
 *
 * Default: 100 requests per minute per IP.
 * Adjust points and duration for different limits.
 */
const limiter = new RateLimiterMemory({
    points: 100, // Number of requests
    duration: 60, // Per 60 seconds
});

/**
 * Rate limiting middleware.
 *
 * Tracks requests by IP address and returns 429 when limit exceeded.
 * Adds rate limit headers to response.
 */
export const rateLimiter = createMiddleware(async (c, next) => {
    const ip = c.req.header("x-forwarded-for") || c.req.header("x-real-ip") || "unknown";

    try {
        const result = await limiter.consume(ip);

        // Add rate limit headers
        c.res.headers.set("X-RateLimit-Limit", "100");
        c.res.headers.set("X-RateLimit-Remaining", String(result.remainingPoints));
        c.res.headers.set("X-RateLimit-Reset", String(Math.ceil(result.msBeforeNext / 1000)));

        await next();
    } catch (rejRes) {
        // Rate limit exceeded
        const retryAfter = Math.ceil((rejRes as { msBeforeNext: number }).msBeforeNext / 1000);

        return c.json(
            {
                error: "Too Many Requests",
                message: "Rate limit exceeded. Please try again later.",
                retryAfter,
            },
            429,
            {
                "Retry-After": String(retryAfter),
                "X-RateLimit-Limit": "100",
                "X-RateLimit-Remaining": "0",
            }
        );
    }
});
