import fallbackImg from "public/shirt-placeholder.jpg";
import { InventoryItem, Size } from "db/schema";
import { APP_URL } from 'src/utils/constants';
export type InventoryCardProps = InventoryItem & { sizes: Size[] }

export default function InventoryCard({
  id,
  name,
  image,
  sizes,
  ...props
}: InventoryCardProps) {
  return (
    <div
      {...props}
      className="flex flex-col p-3 border-2 border-solid border-slate-100 rounded-lg"
    >
      <img src={fallbackImg.src} className="mb-1 w-96 h-96" />
      <p>{name}</p>
      <p>Stock</p>
      <div className="flex flex-col">
        {sizes.map((size) => (
          <p>{size.size}: {size.stockCount}</p>))}
      </div>
      <a href={APP_URL.INVENTORY.EDIT_ITEM(id)}>Edit</a>
    </div>
  );
}

