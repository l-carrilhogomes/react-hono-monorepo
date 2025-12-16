/**
 * @fileoverview Login form component.
 *
 * Reusable login form that handles email/password authentication.
 * Uses react-hook-form for form state and validation with Zod schemas.
 *
 * @module components/auth/LoginForm
 */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, type SignInDto } from "@repo/dtos";
import { authClient } from "../../lib/auth-client";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

/**
 * Props for the LoginForm component.
 */
interface LoginFormProps {
    /** Optional callback after successful login */
    onSuccess?: () => void;
}

/**
 * Login form component.
 *
 * Handles user authentication with email/password.
 * Validates input using SignInSchema from @repo/dtos.
 * Redirects to home page on successful login.
 *
 * @param props - Component props
 * @returns React component
 */
export function LoginForm({ onSuccess }: LoginFormProps) {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Form configuration with Zod validation.
     * Uses SignInSchema for field validation.
     */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInDto>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    /**
     * Handle form submission.
     * Attempts to sign in with Better Auth.
     */
    const onSubmit = async (data: SignInDto) => {
        setError(null);
        setIsLoading(true);

        try {
            const result = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (result.error) {
                setError(result.error.message || "Login failed");
            } else {
                onSuccess?.();
                navigate({ to: "/" });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email field */}
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            {/* Password field */}
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>

            {/* Error message */}
            {error && <div>{error}</div>}

            {/* Submit button */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
}
