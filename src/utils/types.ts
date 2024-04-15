import { InventoryItem, Size } from 'db/schema';
export type ItemWithSizes = {
  item: InventoryItem;
  sizes: Size[];
}
