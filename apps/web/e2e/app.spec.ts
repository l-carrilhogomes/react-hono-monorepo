import { test, expect } from "@playwright/test";

/**
 * E2E Tests for the Application
 *
 * These tests verify core user flows and page navigation.
 */

test.describe("Homepage", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/React/);
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/");
    // Check for login link
    const loginLink = page.getByRole("link", { name: /login/i });
    await expect(loginLink).toBeVisible();
  });
});

test.describe("Login Page", () => {
  test("should navigate to login page", async ({ page }) => {
    await page.goto("/login");
    // Check for login form elements
    await expect(page.getByRole("heading", { name: /login/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/password/i).fill("wrongpassword");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Expect an error message
    await expect(page.getByText(/invalid|error|failed/i)).toBeVisible({
      timeout: 5000,
    });
  });
});

test.describe("Register Page", () => {
  test("should navigate to register page", async ({ page }) => {
    await page.goto("/register");
    await expect(
      page.getByRole("heading", { name: /register|sign up/i }),
    ).toBeVisible();
  });
});

test.describe("Protected Routes", () => {
  test("should redirect unauthenticated users from dashboard", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    // Should redirect to login
    await expect(page).toHaveURL(/login/);
  });
});
