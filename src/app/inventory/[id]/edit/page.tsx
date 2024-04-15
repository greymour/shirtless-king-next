// @TODO: test this w/ the id: 5
// @TODO: add a UUID field to the InventoryItem model to avoid enumeration attacks
// ^ nobody's gonna do this but still, something something best practices

"use server";

import { inventoryItems, sizes } from "db/schema";
import { eq } from "drizzle-orm";
import db from "src/data/DB";
import InventoryItemForm from 'src/inventory/InventoryItemForm/InventoryItemForm';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  console.log('id: ', id);
  const parsedId = Number.isNaN(Number(id)) ? null : Number(id);

  if (!parsedId) {
    return <div>
      <h1>Invalid product id</h1>
    </div>
  }
  const [item] = await db
    .select()
    .from(inventoryItems)
    .where(eq(inventoryItems.id, parsedId));
  const sizeList = await db
    .select()
    .from(sizes)
    .where(eq(sizes.inventoryItemId, parsedId));


  console.log('31: ', sizeList);
  return (
    <div>
      <h1>
        Editing item: {id}
      </h1>
      <InventoryItemForm sizes={sizeList} item={item} />
    </div>
  );
}
