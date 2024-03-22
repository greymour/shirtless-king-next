import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// @TODO: add createdAt, updatedAt, etc. fields

export const inventoryItems = sqliteTable(
  "shirts",
  {
    id: integer("id").primaryKey(),
    name: text("name"),
    // price in cents
    price: integer("price"),
    // url to image
    image: text("image"),
  },
  (inventoryItems) => ({
    nameIdx: uniqueIndex("nameIdx").on(inventoryItems.name),
  })
);

export const users = sqliteTable(
  "shirts",
  {
    id: integer("id").primaryKey(),
    name: text("name"),
    email: text("email"),
    password: text("password"),
    isSuperAdmin: integer("isSuperAdmin", { mode: "boolean" }),
  },
  (users) => ({
    emailIdx: uniqueIndex("emailIdx").on(users.name),
  })
);

export type InventoryItem = typeof inventoryItems.$inferInsert;
export type InsertInventoryItem = typeof inventoryItems.$inferSelect;

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
