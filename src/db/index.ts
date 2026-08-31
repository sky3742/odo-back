import { mkdirSync } from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import Database from "better-sqlite3";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { drizzle as drizzleBetterSqlite3 } from "drizzle-orm/better-sqlite3";

const tursoUrl = process.env.TURSO_DATABASE_URL;

export const db = tursoUrl
  ? drizzleLibsql(
      createClient({
        url: tursoUrl,
        authToken: process.env.TURSO_AUTH_TOKEN,
      }),
    )
  : (() => {
      const databasePath = process.env.DATABASE_URL
        ? process.env.DATABASE_URL
        : path.join(process.cwd(), "data", "odoback.db");
      mkdirSync(path.dirname(databasePath), { recursive: true });
      const sqlite = new Database(databasePath);
      sqlite.pragma("foreign_keys = ON");
      return drizzleBetterSqlite3(sqlite);
    })();
