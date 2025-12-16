/**
 * @fileoverview Example test file to verify Vitest setup.
 *
 * This test demonstrates basic Vitest usage.
 * Delete or modify this file when adding real tests.
 *
 * @module __tests__/example
 */
import { describe, it, expect } from "vitest";

describe("Example Test Suite", () => {
    it("should pass a basic test", () => {
        expect(1 + 1).toBe(2);
    });

    it("should handle string operations", () => {
        const greeting = "Hello, World!";
        expect(greeting).toContain("Hello");
        expect(greeting.length).toBeGreaterThan(0);
    });

    it("should work with async operations", async () => {
        const promise = Promise.resolve("success");
        await expect(promise).resolves.toBe("success");
    });
});
