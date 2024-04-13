"use client";

import { InsertInventoryItem, InsertSize } from "db/schema";
import placeholderImage from "public/shirt-placeholder.jpg";
import { FormEvent, useState } from "react";
import { Button, Input, Option, Select } from "src/components/atoms";
import { SubmitButton } from "src/components/atoms/SubmitButton";
import { createInventoryItem } from "src/inventory/actions";
import { SIZE_OPTIONS } from "src/utils/constants";

type SizeInputProps = {
  size?: InsertSize;
  editing?: boolean;
  updateSizes: (key: string, size: SizeInputProps) => void;
  uuid: string;
  existingSizes: string[];
};
// @TODO: sort size options consistently

function SizeInput({ size, updateSizes, uuid, existingSizes }: SizeInputProps) {
  const [sizeLabel, setSize] = useState(size?.size || SIZE_OPTIONS.M);
  const [price, setPrice] = useState(size?.price || 20);
  const [stockCount, setStockCount] = useState(0);
  const [editing, setEditing] = useState(true);
  console.log("Existing sizes: ", existingSizes);
  return (
    // display grid isn't working here for some reason, I blame treeshaking
    <fieldset
      name={`size-${uuid}`}
      className="flex flex-row items-center gap-2"
    >
      <Input
        label="Size"
        type="text"
        value={sizeLabel}
        onChange={(e) => setSize(e.target.value.toUpperCase())}
        className="mr-2"
        disabled={!editing}
        name={`size-${uuid}-size`}
      />
      <Select
        name="sizeLabel"
        onChange={(e) => setSize(e.target.value)}
        disabled={!editing}
      >
        {Object.values(SIZE_OPTIONS).map((opt) => {
          console.log("OPT: ", opt, existingSizes.includes(opt));
          return (
            <Option
              key={opt}
              disabled={existingSizes.includes(opt)}
              value={opt}
            />
          );
        })}
      </Select>
      <Input
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        disabled={!editing}
        name={`size-${uuid}-price`}
      />
      <Input
        label="Stock count"
        type="number"
        value={stockCount}
        onChange={(e) => setStockCount(Number(e.target.value))}
        disabled={!editing}
        name={`size-${uuid}-stock`}
      />
      <Button
        style={{ marginTop: "30px" }}
        onClick={() => {
          if (editing) {
            const sizePayload = {
              size: {
                size: sizeLabel,
                price,
                stockCount
              },
              editing: false,
              uuid,
              updateSizes
            };
            updateSizes(uuid, sizePayload);
          }
          setEditing((editing) => !editing);
        }}
      >
        {editing ? "Done" : "Edit"}
      </Button>
    </fieldset>
  );
}

export default function AddInventoryItemForm() {
  const [name, setName] = useState("");
  const [sizes, setSizes] = useState<Record<string, SizeInputProps>>({});
  console.log("sizes: ", sizes);
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const itemPayload: InsertInventoryItem = {
      name,
      image
    };
    const sizesPayload = Object.keys(sizes).map((sizeKey) => sizes[sizeKey]);
    // @TODO: do validation
    // I have to 'use server' here I think? I hate this!
    const payload = {
      item: itemPayload,
      sizes: sizesPayload
    };
  };

  const submitForm = createInventoryItem.bind(
    null,
    JSON.stringify({
      name,
      image,
      sizes: Object.values(sizes).map((size) => size.size)
    })
  );

  const editSize = (key: string, size: SizeInputProps) => {
    setSizes({ ...sizes, [key]: size });
  };
  // @TODO: figure out why tf the types are so fucked with size.size.size
  return (
    <form
      action={submitForm}
      className="flex flex-col border-4 border-purple-300 bg-slate-900 p-4"
    >
      <div className="mb-4">
        <img
          className="mx-auto max-h-80 max-w-80"
          src={image || placeholderImage.src}
        />
        <Input
          label="Product label"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Product image url"
          value={imagePath}
          name="image"
          onChange={(e) => setImagePath(e.target.value)}
          onBlur={(e) => setImage(e.target.value)}
        />
        {Object.keys(sizes)
          .sort((a, b) => {
            const sizeA = sizes[a]?.size?.size;
            const sizeB = sizes[b]?.size?.size;
            if (!sizeB) {
              return 0;
            }
            if (!sizeA) {
              return 1;
            }
            return sizeA < sizeB ? 0 : 1;
          })
          .map((sizeKey) => (
            <SizeInput
              key={sizeKey}
              updateSizes={editSize}
              uuid={sizeKey}
              editing={sizes[sizeKey].editing}
              existingSizes={Object.values(sizes).map(
                (size) => size.size?.size!
              )}
            />
          ))}
        <Button
          onClick={() => {
            const uuid = crypto.randomUUID();
            setSizes((sizes) => ({
              ...sizes,
              [uuid]: {
                uuid,
                editing: true,
                updateSizes: editSize,
                existingSizes: Object.values(sizes).map(
                  (size) => size.size?.size!
                )
              }
            }));
          }}
        >
          add size
        </Button>
      </div>
      <Button onClick={() => console.log("sizes", sizes)}>test</Button>
      <SubmitButton
        type="submit"
        disabled={
          Object.keys(sizes).length < 1 ||
          !!Object.keys(sizes)
            .map((key) => sizes[key])
            .find((size: SizeInputProps) => size.editing)
        }
      >
        submit
      </SubmitButton>
    </form>
  );
}
