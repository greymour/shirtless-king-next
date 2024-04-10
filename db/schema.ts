import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

import { timestamp } from "db/customTypes";
import { randomUUID } from "node:crypto";

const timestampMixin = {
  createdAt: timestamp("createdAt").notNull().$defaultFn(() => new Date()),
  updatedAt: timestamp("updatedAt").notNull().$defaultFn(() => new Date()),
}

export const inventoryItems = sqliteTable(
  "inventoryItems",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    // url to image
    image: text("image"),
    ...timestampMixin,
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
  ...timestampMixin,
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
    sessionId: integer("sessionId").references(() => sessions.id),
    ...timestampMixin,
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
  uuid: text("uuid").$defaultFn(() => randomUUID()),
  ...timestampMixin,
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

export const purchases = sqliteTable("purchases", {
  id: integer("id").primaryKey(),
  inventoryitemId: integer("inventoryItemId").references(() => inventoryItems.id),
  sizeId: integer("sizeId").notNull(),
  salePrice: integer("salePrice").notNull(),
  profit: integer("profit").notNull(),
  itemCost: integer("itemCost").notNull(),
  ...timestampMixin
});

export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = typeof purchases.$inferInsert;
