/**
 * @fileoverview Register page route.
 *
 * Route component for the /register path.
 * Renders the RegisterForm component and provides navigation to login.
 *
 * @module routes/register
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { RegisterForm } from "../components/auth/RegisterForm";

/**
 * Route definition for /register.
 * Uses TanStack Router file-based routing.
 */
export const Route = createFileRoute("/register")({
    component: RegisterPage,
});

/**
 * Register page component.
 *
 * Displays the registration form with a link to the login page.
 *
 * @returns React component
 */
function RegisterPage() {
    return (
        <div>
            <h1>Register</h1>
            <RegisterForm />
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
