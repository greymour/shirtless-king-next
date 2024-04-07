'use server'
import { InsertInventoryItem, InsertSize, inventoryItems, sizes } from "db/schema";
import db from 'src/data/DB';

type createItemPayload = Omit<InsertInventoryItem, 'createdAt' | 'updatedAt'>;
export async function createInventoryItem(payload: FormData) {
  const name = payload.get('name');
  const image = payload.get('image');
  console.log('payload: ', payload);
  const payloadObj = Object.fromEntries(payload);
  for (const key of Object.keys(payloadObj)) {
    console.log(`key: ${key}: ${payloadObj[key]}`);
  }
  // if (typeof name !== 'string') {
  //   throw new Error('WRONGGGG');
  // }

  // if (image && typeof image !== 'string') {
  //   throw new Error('wrong image datatype, should be string');
  // }
  return
  // const insertPayload: createItemPayload = {
  //   name,
  //   image,
  // }
  // const date = new Date();
  // const item = await db.insert(inventoryItems).values({ ...insertPayload, updatedAt: date, createdAt: date }).returning();
  // console.log('item: ', item);
}

export async function createSize() {

}
