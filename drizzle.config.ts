import { defineConfig } from "drizzle-kit";

const tursoUrl = process.env.TURSO_DATABASE_URL;

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  ...(tursoUrl
    ? {
        driver: "turso",
        dbCredentials: {
          url: tursoUrl,
          authToken: process.env.TURSO_AUTH_TOKEN,
        },
      }
    : {
        dbCredentials: {
          url: process.env.DATABASE_URL ?? "./data/odoback.db",
        },
      }),
});
