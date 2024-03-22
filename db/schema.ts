import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  ForeignKey,
} from "drizzle-orm/sqlite-core";

import { timestamp } from "./customTypes"

export const inventoryItems = sqliteTable(
  "shirts",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    // price in cents
    price: integer("price"),
    // url to image
    image: text("image"),
    createdAt: timestamp('createdAt'),
    updatedAt: timestamp('updatedAt'),
  },
  (inventoryItems) => ({
    nameIdx: uniqueIndex("nameIdx").on(inventoryItems.name),
  })
);

export type InventoryItem = typeof inventoryItems.$inferInsert;
export type InsertInventoryItem = typeof inventoryItems.$inferSelect;

export const sizes = sqliteTable("sizes", {
  id: integer('id').primaryKey(),
  size: text('size').notNull(),
  stockCount: integer('stockCount').notNull().default(0),
  inventoryItemId: integer('inventoryItemId').references(() => inventoryItems.id)
})

export type Size = typeof sizes.$inferSelect;
export type InsertSize = typeof sizes.$inferInsert

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    isSuperAdmin: integer("isSuperAdmin", { mode: "boolean" }).default(false),
    createdAt: timestamp('createdAt'),
    updatedAt: timestamp('updatedAt')
  },
  (users) => ({
    emailIdx: uniqueIndex("emailIdx").on(users.email),
  })
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
