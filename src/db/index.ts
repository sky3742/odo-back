import { mkdirSync } from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const tursoUrl = process.env.TURSO_DATABASE_URL;

const client = tursoUrl
  ? createClient({
      url: tursoUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  : (() => {
      const databasePath = process.env.DATABASE_URL
        ? process.env.DATABASE_URL
        : path.join(process.cwd(), "data", "odoback.db");
      mkdirSync(path.dirname(databasePath), { recursive: true });
      return createClient({ url: `file:${databasePath}` });
    })();

export const db = drizzle(client);
