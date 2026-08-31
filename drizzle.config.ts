import { defineConfig } from "drizzle-kit";

const tursoUrl = process.env.TURSO_DATABASE_URL;

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: tursoUrl ?? process.env.DATABASE_URL ?? "file:./data/odoback.db",
    ...(tursoUrl ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
  },
});
