/**
 * @fileoverview Login page route.
 *
 * Route component for the /login path.
 * Renders the LoginForm component and provides navigation to register.
 *
 * @module routes/login
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { LoginForm } from "../components/auth/LoginForm";

/**
 * Route definition for /login.
 * Uses TanStack Router file-based routing.
 */
export const Route = createFileRoute("/login")({
    component: LoginPage,
});

/**
 * Login page component.
 *
 * Displays the login form with a link to the registration page.
 *
 * @returns React component
 */
function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <LoginForm />
            <p className="mt-4">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
