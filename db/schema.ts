import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

import { timestamp } from "db/customTypes";
import { randomUUID } from "node:crypto";

export const inventoryItems = sqliteTable(
  "inventoryItems",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    // url to image
    image: text("image"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
  },
  (inventoryItems: any) => ({
    nameIdx: uniqueIndex("nameIdx").on(inventoryItems.name),
  }),
);

export type InventoryItem = typeof inventoryItems.$inferSelect;
export type InsertInventoryItem = typeof inventoryItems.$inferInsert;

export const sizes = sqliteTable("sizes", {
  id: integer("id").primaryKey(),
  size: text("size").notNull(),
  // price in cents
  price: integer("price"),
  stockCount: integer("stockCount").notNull().default(0),
  inventoryItemId: integer("inventoryItemId").references(() =>
    inventoryItems.id
  ),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export type Size = typeof sizes.$inferSelect;
export type InsertSize = typeof sizes.$inferInsert;

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    isSuperAdmin: integer("isSuperAdmin", { mode: "boolean" }).default(false),
    createdAt: timestamp("createdAt"),
    updatedAt: timestamp("updatedAt"),
    sessionId: integer("sessionId").references(() => sessions.id),
  },
  (users) => ({
    emailIdx: uniqueIndex("emailIdx").on(users.email),
  }),
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey(),
  isExpired: integer("isExpired", { mode: "boolean" }).default(false),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
  uuid: text("uuid").$defaultFn(() => randomUUID()),
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

