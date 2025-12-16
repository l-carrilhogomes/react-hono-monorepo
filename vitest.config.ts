/**
 * @fileoverview Root Vitest configuration.
 *
 * This configuration is used for all test files across the monorepo.
 * Individual packages can extend this config if needed.
 *
 * @see https://vitest.dev/config/
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // Enable global test functions (describe, it, expect)
        globals: true,
        // Use jsdom for React component testing
        environment: "node",
        // Test file patterns
        include: ["**/*.{test,spec}.{ts,tsx}"],
        // Exclude node_modules and build outputs
        exclude: ["**/node_modules/**", "**/dist/**", "**/.turbo/**"],
        // Enable coverage reporting
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: ["**/node_modules/**", "**/dist/**", "**/*.d.ts"],
        },
    },
});
