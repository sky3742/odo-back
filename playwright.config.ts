import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  expect: { timeout: 10000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  globalSetup: "./e2e/global-setup.ts",
  webServer: {
    command: "pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    env: { ...process.env, TURSO_DATABASE_URL: "file:./data/e2e.db" },
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
