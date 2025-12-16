import { test, expect } from "@playwright/test";

/**
 * E2E Tests for the Application
 *
 * These tests verify core user flows and page navigation.
 */

test.describe("Homepage", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");
    // Homepage shows "Hello '/'!"
    await expect(page.getByText('Hello "/"!')).toBeVisible();
  });
});

test.describe("Login Page", () => {
  test("should navigate to login page and display form", async ({ page }) => {
    await page.goto("/login");
    // Check for login heading
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    // Check for email input (by placeholder)
    await expect(page.getByPlaceholder("your@email.com")).toBeVisible();
    // Check for password input (by placeholder)
    await expect(page.getByPlaceholder("••••••••")).toBeVisible();
    // Check for submit button
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("should have link to register page", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("link", { name: "Register" })).toBeVisible();
  });
});

test.describe("Register Page", () => {
  test("should navigate to register page", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();
  });

  test("should have link to login page", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
  });
});

test.describe("Protected Routes", () => {
  test("should redirect unauthenticated users from dashboard to login", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    // Should redirect to login - wait for navigation
    await page.waitForURL("**/login");
    await expect(page).toHaveURL(/login/);
  });
});
