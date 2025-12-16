/**
 * @fileoverview Base ESLint configuration for the monorepo.
 *
 * This configuration provides shared ESLint rules that can be
 * extended by individual packages.
 *
 * @module config/eslint/base
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    rules: {
        // TypeScript handles these
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

        // Best practices
        "no-console": ["warn", { allow: ["warn", "error"] }],
        "prefer-const": "error",
        "no-var": "error",

        // Code style
        "eqeqeq": ["error", "always"],
        "curly": ["error", "all"],
    },
    ignorePatterns: ["node_modules/", "dist/", ".turbo/"],
};
