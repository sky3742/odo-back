import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const databaseUrl = process.env.DATABASE_URL ?? "./data/odoback.db";
const databasePath = process.env.DATABASE_URL ? databaseUrl : path.join(process.cwd(), "data", "odoback.db");
mkdirSync(path.dirname(databasePath), { recursive: true });

const sqlite = new Database(databasePath);
sqlite.pragma("foreign_keys = ON");
sqlite.exec(`CREATE TABLE IF NOT EXISTS cars (id text PRIMARY KEY NOT NULL, identifier text NOT NULL, created_at integer NOT NULL);
CREATE TABLE IF NOT EXISTS submissions (id text PRIMARY KEY NOT NULL, car_id text NOT NULL REFERENCES cars(id) ON DELETE CASCADE, date text NOT NULL, odometer integer NOT NULL, created_at integer NOT NULL);`);

export const db = drizzle(sqlite);
