/**
 * @fileoverview Authentication middleware for protected API routes.
 *
 * This middleware validates the user's session using Better Auth.
 * It sets the user and session on the Hono context for downstream handlers.
 *
 * @module middleware/requireAuth
 *
 * @example
 * ```ts
 * import { requireAuth } from "../middleware/requireAuth";
 *
 * const protectedRoute = new Hono()
 *   .use(requireAuth)
 *   .get("/profile", (c) => {
 *     const user = c.get("user");
 *     return c.json({ user });
 *   });
 * ```
 */
import { createMiddleware } from "hono/factory";
import { auth, type AuthType } from "../lib/auth";

/**
 * Middleware that requires authentication.
 *
 * Validates the session from request cookies/headers using Better Auth.
 * If the session is invalid or missing, returns a 401 Unauthorized response.
 * If valid, sets `user` and `session` on the Hono context.
 *
 * @returns Hono middleware
 */
export const requireAuth = createMiddleware<{
    Variables: AuthType;
}>(async (c, next) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!session) {
        return c.json(
            {
                error: "Unauthorized",
                message: "Authentication required to access this resource",
            },
            401
        );
    }

    // Set user and session on context for downstream handlers
    c.set("user", session.user);
    c.set("session", session.session);

    await next();
});
