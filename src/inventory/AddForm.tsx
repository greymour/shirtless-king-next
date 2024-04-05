"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { InsertInventoryItem, InsertSize } from "db/schema";
import { Input } from "src/components/atoms";

type TSize = Partial<InsertSize> & { isEditing?: boolean };

type SizeInputProps = {
  size?: InsertSize;
  isEditing?: boolean;
  updateSizes: (key: string, size: TSize) => void;
  uuid: string;
};

function SizeInput({ size, isEditing, updateSizes, uuid }: SizeInputProps) {
  const [sizeLabel, setSize] = useState(size?.size || "M");
  const [price, setPrice] = useState(size?.price || 20);
  const [stockCount, setStockCount] = useState(0);
  const [editing, setEditing] = useState(isEditing || false);

  return (
    // display grid isn't working here for some reason, I blame treeshaking
    <div className="gap-2 flex flex-row">
      <Input
        label="Size"
        type="text"
        value={sizeLabel}
        onChange={(e) => setSize(e.target.value)}
        className="mr-2"
        disabled={!editing}
      />
      <Input
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        disabled={!editing}
      />
      <Input
        label="Stock count"
        type="number"
        value={stockCount}
        onChange={(e) => setStockCount(Number(e.target.value))}
        disabled={!editing}
      />
      <button
        className="bg-blue-300 p-3"
        type="button"
        onClick={() => {
          if (editing) {
            const sizePayload: InsertSize = {
              size: sizeLabel,
              price,
            };
            updateSizes(uuid, sizePayload);
          }
          setEditing((editing) => !editing);
        }}
      >
        {editing ? "Done" : "Edit"}
      </button>
    </div>
  );
}

export default function AddInventoryItemForm() {
  const [name, setName] = useState("");
  const defaultEmptySize = { isEditing: true };
  const [sizes, setSizes] = useState<Record<string, TSize>>({
    default: defaultEmptySize,
  });
  const [image, setImage] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const itemPayload: InsertInventoryItem = {
      name,
      image,
    };
    const sizesPayload = Object.keys(sizes).map((sizeKey) => sizes[sizeKey]);
    // @TODO: do validation
    // I have to 'use server' here I think? I hate this!
    const payload = {
      item: itemPayload,
      sizes: sizesPayload,
    };
  };

  const editSize = (key: string, size: TSize) => {
    setSizes({ [key]: size, ...sizes });
  };
  // @TODO: figure out a way to have an arbitrary number of sizes that the user can add
  // also don't use the index for the key in the .map()
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div>
        <Input
          label={"Product label"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label={"Product image url"}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {Object.keys(sizes).map((sizeKey) => (
          <SizeInput
            key={sizeKey}
            updateSizes={editSize}
            uuid={sizeKey === "default" ? sizeKey : crypto.randomUUID()}
            isEditing={sizes[sizeKey].isEditing}
          />
        ))}
        <button
          onClick={() =>
            setSizes((sizes) => ({
              ...sizes,
              [crypto.randomUUID()]: { isEditing: true },
            }))}
        >
          add size
        </button>
      </div>
      <button type="submit">submit</button>
    </form>
  );
}

