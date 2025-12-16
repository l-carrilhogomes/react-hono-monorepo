/**
 * @fileoverview Register form component.
 *
 * Reusable registration form that handles user sign up.
 * Uses react-hook-form for form state and validation with Zod schemas.
 * Uses existing UI components (Button, InputText) from components/ui.
 *
 * @module components/auth/RegisterForm
 */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignUpDto } from "@repo/dtos";
import { authClient } from "../../lib/auth-client";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import InputText from "../ui/InputText";
import Button from "../ui/Button";

/**
 * Props for the RegisterForm component.
 */
interface RegisterFormProps {
    /** Optional callback after successful registration */
    onSuccess?: () => void;
}

/**
 * Register form component.
 *
 * Handles user registration with name, email, and password.
 * Validates input using SignUpSchema from @repo/dtos.
 * Redirects to home page on successful registration.
 *
 * @param props - Component props
 * @returns React component
 */
export function RegisterForm({ onSuccess }: RegisterFormProps) {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Form configuration with Zod validation.
     * Uses SignUpSchema for field validation.
     */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpDto>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    /**
     * Handle form submission.
     * Attempts to register with Better Auth.
     */
    const onSubmit = async (data: SignUpDto) => {
        setError(null);
        setIsLoading(true);

        try {
            const result = await authClient.signUp.email({
                email: data.email,
                password: data.password,
                name: data.name,
            });

            if (result.error) {
                setError(result.error.message || "Registration failed");
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
            {/* Name field */}
            <div>
                <InputText
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    {...register("name")}
                />
                {errors.name && <span>{errors.name.message}</span>}
            </div>

            {/* Email field */}
            <div>
                <InputText
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            {/* Password field */}
            <div>
                <InputText
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>

            {/* Error message */}
            {error && <div>{error}</div>}

            {/* Submit button */}
            <Button
                label={isLoading ? "Creating account..." : "Sign Up"}
                disabled={isLoading}
                type="submit"
            />
        </form>
    );
}
