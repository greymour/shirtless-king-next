'use server'
import { InsertInventoryItem, InsertSize, inventoryItems, sizes } from "db/schema";
import db from 'src/data/DB';

type createItemPayload = InsertInventoryItem & { sizes: InsertSize[] }

// @TODO: fix these godawful types
// @TODO: make this an atomic transaction
export async function createInventoryItem(payload: string) {
  const { name, image, sizes: sizesPayload } = JSON.parse(payload) as createItemPayload;
  // const name = payload.get('name');
  // const image = payload.get('image');
  // const payloadObj = Object.fromEntries(payload);
  // for (const key of Object.keys(payloadObj)) {
  //   console.log(`key: ${key}: ${payloadObj[key]}`);
  // }
  // if (typeof name !== 'string') {
  //   throw new Error('WRONGGGG');
  // }

  // if (image && typeof image !== 'string') {
  //   throw new Error('wrong image datatype, should be string');
  // }
  const insertPayload: createItemPayload = {
    name: name,
    image: image,
  }
  const date = new Date();
  const [item] = await db.insert(inventoryItems).values({ ...insertPayload, updatedAt: date, createdAt: date }).returning();
  console.log('item: ', item);
  for (const sizePayload of Object.values(sizesPayload)) {
    await db.transaction(async (tx) => {
      const size = await tx.insert(sizes).values({
        size: sizePayload.size,
        price: sizePayload.price,
        stockCount: sizePayload.stockCount,
        inventoryItemId: item.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();
      console.log('size created: ', size);
    })
  }
}

export async function createSize() {

}
