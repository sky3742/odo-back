import { createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

let instance: LibSQLDatabase<typeof schema> | null = null;

export function createDb() {
  if (!instance) {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    instance = drizzle(client, { schema });
  }
  return instance;
}

export const db = createDb();
