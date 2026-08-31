import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const cars = sqliteTable("cars", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(),
  carId: text("car_id").notNull().references(() => cars.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  odometer: integer("odometer").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});
