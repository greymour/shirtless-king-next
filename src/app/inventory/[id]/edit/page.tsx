// @TODO: test this w/ the id: 5
// @TODO: add a UUID field to the InventoryItem model to avoid enumeration attacks
// ^ nobody's gonna do this but still, something something best practices
'use server';
import db from 'src/data/DB';
import { inventoryItems, sizes, } from 'db/schema';
import { eq } from 'drizzle-orm';
import InventoryCard from 'src/inventory/InventoryCard';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const [item] = await db.select().from(inventoryItems).where(eq(inventoryItems.id, id));
  const sizeList = await db.select().from(sizes).where(eq(sizes.inventoryItemId, id))
  return <div>Editing item: {id}
    <InventoryCard sizes={sizeList} {...item} />
  </div>
}
