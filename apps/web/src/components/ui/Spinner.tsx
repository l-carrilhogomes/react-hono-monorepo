/**
 * @fileoverview Reusable loading spinner component.
 *
 * A modern, animated spinner for loading states.
 * Uses CSS animations for smooth, performant rendering.
 *
 * @module components/ui/Spinner
 *
 * @example
 * ```tsx
 * import { Spinner } from "../components/ui/Spinner";
 *
 * function LoadingPage() {
 *   return <Spinner size="lg" />;
 * }
 * ```
 */

interface SpinnerProps {
    /** Size of the spinner (default: "md") */
    size?: "sm" | "md" | "lg";
    /** Additional CSS classes */
    className?: string;
}

/**
 * Loading spinner component.
 *
 * Displays an animated circular spinner.
 *
 * @param props - Component props
 * @returns React component
 */
export function Spinner({ size = "md", className = "" }: SpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
    };

    return (
        <div
            className={`
        ${sizeClasses[size]}
        border-gray-200
        border-t-blue-500
        rounded-full
        animate-spin
        ${className}
      `}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}

/**
 * Full-screen loading overlay.
 *
 * Centers a spinner in the middle of the screen.
 * Useful for page-level loading states.
 */
export function LoadingScreen() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner size="lg" />
        </div>
    );
}
