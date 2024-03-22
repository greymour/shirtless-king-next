import fallbackImg from "public/shirt-placeholder.jpg";
import { useState } from "react";

type EditAction = {
  user: User;
  timestamp: string;
  action: string;
};

type Sizes = "xs" | "s" | "m" | "l" | "lg";

export type InventoryCardProps = {
  id: string;
  label: string;
  image: string | null;
  // stockCount: number;
  editHistory: EditAction[];
  stock: Record<Sizes, number>[];
};

export default function InventoryCard({
  id,
  label,
  image,
  editHistory,
  stock,
  ...props
}: InventoryCardProps) {
  const [error, setError] = useState(null);
  const updateStock = (num: number): void => {
    console.log("37: ", "wowowo", num);
    // setCount(count + num);
  };
  return (
    <div
      {...props}
      className="flex flex-col p-3 border-2 border-solid border-slate-100 rounded-lg"
    >
      <img src={fallbackImg.src} className="mb-1" />
      <p>{label}</p>
      <div className="flex flex-col">
        {Object.keys(stock).map((key) => (
          <StockButtons
            key={key}
            size={key}
            stockCount={stock?.[key] || 0}
            updateStock={updateStock}
          />
        ))}
      </div>
    </div>
  );
}

type StockButtonsProps = {
  size: Sizes;
  stockCount: number;
  updateStock: (n: number) => void;
};
function StockButtons({ size, stockCount, updateStock }: StockButtonsProps) {
  return (
    <div className="flex flex-row items-center w-full content-between mb-4">
      <div className="w-full">
        <p>
          {size}: {stockCount}
        </p>
      </div>
      <div className="ml-4 flex flex-col">
        <button
          className="bg-zinc-500 border-zinc-50 border-2 border-solid rounded-full mb-3"
          onClick={() => updateStock(1)}
        >
          +
        </button>
        <button
          className="bg-zinc-500 border-2 border-solid rounded-full"
          onClick={() => updateStock(-1)}
        >
          -
        </button>
      </div>
    </div>
  );
}