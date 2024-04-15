"use server";

import { InsertInventoryItem, InsertSize, InventoryItem, inventoryItems, sizes } from "db/schema";
import { eq } from "drizzle-orm";
import db from "src/data/DB";

type CreateItemPayload = InsertInventoryItem & { sizes: InsertSize[] };
type UpdateItemPayload = InventoryItem & { sizes: InsertSize[] };

type ValidationSchema = Record<string, any>;

function validatePayload<Schema extends ValidationSchema>(schema: Schema, payload: unknown): boolean { }

const s = {
  string: "string",
  number: "number",
  array: {
    of: validatePayload,
  },
  object: "object",
  boolean: "boolean",
};

const createItemSchema: CreateItemPayload = {
  name: s.string,
  image: s.string,
  // sizes: s.array.of()
};

// @TODO: add data validation
export async function createInventoryItem(payload: string) {
  console.log("createInventoryItem called");
  const { name, image, sizes: sizesPayload } = JSON.parse(payload) as Partial<CreateItemPayload>;
  if (!name) {
    return 400;
  }
  if (!sizesPayload) {
    return 400;
  }
  const date = new Date();
  await db.transaction(async (tx) => {
    const [item] = await db
      .insert(inventoryItems)
      .values({ name, image, updatedAt: date, createdAt: date })
      .returning();

    await Promise.all(
      sizesPayload.map((size) =>
        // @TODO: I hate this formatting, change Prettier config
        tx.insert(sizes).values({
          size: size.size,
          price: size.price,
          stockCount: size.stockCount,
          inventoryItemId: item.id,
        })
      )
    );
  });
  return 200;
}

export async function updateInventoryItem(payload: string) {
  const { id, name, image, sizes: sizesPayload } = JSON.parse(payload) as UpdateItemPayload;
  console.log("payload", JSON.parse(payload));
  console.log("sizes: ", sizesPayload);
  await db.transaction(async (tx) => {
    const [item] = await db
      .update(inventoryItems)
      .set({ name, image: image || null })
      .where(eq(inventoryItems.id, id))
      .returning();
    // then for each size we have to check if it exists in the db, and if not create it, otherwise, update
    console.log("item: ", item);
    await Promise.all(
      sizesPayload.map((size) => {
        if (!size.id) {
          return tx
            .insert(sizes)
            .values({
              size: size.size,
              price: size.price,
              stockCount: size.stockCount,
              inventoryItemId: item.id,
              updatedAt: new Date(),
            })
            .returning();
        }
        // if the id exists then we have to update the existing size
        return tx
          .update(sizes)
          .set({
            size: size.size,
            price: size.price,
            stockCount: size.stockCount,
            inventoryItemId: item.id,
            updatedAt: new Date(),
          })
          .where(eq(sizes.id, size.id))
          .returning();
      })
    );
  });
  // we need to put the loop inside the transaction
  return 200;
}

export async function createSize() { }
