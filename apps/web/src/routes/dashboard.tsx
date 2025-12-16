/**
 * @fileoverview Dashboard page route (protected).
 *
 * This is a protected route that requires authentication.
 * Users are redirected here after successful login/register.
 * Uses ProtectedRoute wrapper to handle authentication check.
 *
 * @module routes/dashboard
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { authClient } from "../lib/auth-client";
import Button from "../components/ui/Button";

/**
 * Route definition for /dashboard.
 * Uses TanStack Router file-based routing.
 */
export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

/**
 * Dashboard page component.
 *
 * Displays user information and provides sign out functionality.
 * Wrapped in ProtectedRoute to ensure only authenticated users can access.
 *
 * @returns React component
 */
function DashboardPage() {
  const { data: session } = authClient.useSession();

  /**
   * Handle user sign out.
   * Redirects to login page after sign out.
   */
  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* User info */}
        {session && (
          <div className="mb-6">
            <p>Welcome, {session.user.name}!</p>
            <p>Email: {session.user.email}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <Link to="/">
            <Button label="Home" type="button" />
          </Link>
          <Button label="Sign Out" type="button" onClick={handleSignOut} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
