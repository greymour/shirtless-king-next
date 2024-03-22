import type { InventoryCardProps } from "src/inventory/InventoryCard";
import InventoryCard from "src/inventory/InventoryCard";

type InventoryGridProps = {
  items: InventoryCardProps[];
};

export const testData: InventoryCardProps[] = [
  {
    id: "1",
    image: null,
    label: "Cool shirt",
    editHistory: [],
    stock: {
      xs: 3,
      s: 4,
      m: 29,
      l: 4,
      xl: 0,
    },
  },
  {
    id: "2",
    image: null,
    label: "Uncool shirt",
    editHistory: [],
    stock: {
      xs: 3,
      s: 4,
      m: 29,
      l: 4,
      xl: 0,
    },
  },
  {
    id: "3",
    image: null,
    label: "Out of stock shirt",
    editHistory: [],
    stock: {
      xs: 0,
      s: 0,
      m: 0,
      l: 0,
      xl: 0,
    },
  },
  {
    id: "4",
    image: null,
    label: "Super cool shirt",
    editHistory: [],
    stock: {
      xs: 3,
      s: 4,
      m: 29,
      l: 4,
      xl: 0,
    },
  },
];

export default function InventoryGrid({ items, ...props }: InventoryGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-3" {...props}>
      {items.map((item) => (
        <InventoryCard {...item} />
      ))}
    </ul>
  );
}