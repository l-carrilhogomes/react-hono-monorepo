/**
 * @fileoverview Protected route wrapper component.
 *
 * This component wraps pages that require authentication.
 * It checks if the user is authenticated and redirects to login if not.
 * Use this to protect any route without repeating authentication logic.
 *
 * @module components/auth/ProtectedRoute
 *
 * @example
 * ```tsx
 * // In a route file:
 * import { ProtectedRoute } from "../components/auth/ProtectedRoute";
 *
 * function DashboardPage() {
 *   return (
 *     <ProtectedRoute>
 *       <div>Protected content here</div>
 *     </ProtectedRoute>
 *   );
 * }
 * ```
 */
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "../../lib/auth-client";

/**
 * Props for ProtectedRoute component.
 */
interface ProtectedRouteProps {
    /** Child components to render when authenticated */
    children: ReactNode;
    /** Path to redirect to if not authenticated (default: /login) */
    redirectTo?: string;
}

/**
 * Protected route wrapper.
 *
 * Checks authentication status and redirects to login if user is not authenticated.
 * Shows loading state while checking authentication.
 *
 * @param props - Component props
 * @returns Protected content or loading/redirect
 */
export function ProtectedRoute({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) {
    const navigate = useNavigate();
    const { data: session, isPending } = authClient.useSession();

    /**
     * Redirect to login if not authenticated.
     * Runs when session state changes.
     */
    useEffect(() => {
        if (!isPending && !session) {
            navigate({ to: redirectTo });
        }
    }, [isPending, session, navigate, redirectTo]);

    // Show loading while checking authentication
    if (isPending) {
        return <div>Loading...</div>;
    }

    // Not authenticated - will redirect
    if (!session) {
        return null;
    }

    // Authenticated - render children
    return <>{children}</>;
}
