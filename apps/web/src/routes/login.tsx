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
        <div>
            <h1>Login</h1>
            <LoginForm />
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
