"use client";
import {
  FormEvent,
  useState,
  useEffect,
} from "react";
import { InsertInventoryItem, InsertSize } from "db/schema";
import { Input, InputProps, Button, Select, Option } from "src/components/atoms";
import placeholderImage from "public/shirt-placeholder.jpg";
import { createInventoryItem } from "src/inventory/actions";
import { SubmitButton } from "src/components/atoms/SubmitButton";
import { SIZE_OPTIONS } from "src/utils/constants";

type TSize = Partial<InsertSize> & { isEditing?: boolean };

type SizeInputProps = {
  size?: InsertSize;
  editing?: boolean;
  updateSizes: (key: string, size: SizeInputProps) => void;
  uuid: string;
};

function SizeInput({ size, updateSizes, uuid }: SizeInputProps) {
  const [sizeLabel, setSize] = useState(size?.size || "M");
  const [price, setPrice] = useState(size?.price || 20);
  const [stockCount, setStockCount] = useState(0);
  const [editing, setEditing] = useState(true);
  // useEffect(() => {
  //   setEditing(true)
  // }, [])

  return (
    // display grid isn't working here for some reason, I blame treeshaking
    <fieldset
      name={`size-${uuid}`}
      className="gap-2 flex flex-row items-center"
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
        onChange={e => setSize(e.target.value)}
        disabled={!editing}
      >
        {Object.values(SIZE_OPTIONS).map(opt => <Option value={opt} />)}
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
                stockCount,
              },
              editing: false,
              uuid,
              updateSizes,
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
  console.log('sizes: ', sizes);
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");


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

  // @TODO: solve the bug where a random extra size is getting added for no reason
  const submitForm = createInventoryItem.bind(null, JSON.stringify({
    name,
    image,
    sizes: Object.values(sizes).map(size => size.size),
  }));

  const editSize = (key: string, size: SizeInputProps) => {
    setSizes({ ...sizes, [key]: size });
  };

  return (
    <form
      action={submitForm}
      className="flex flex-col p-4 bg-slate-900 border-purple-300 border-4"
    >
      <div className="mb-4">
        <img
          className="max-w-80 max-h-80 mx-auto"
          src={image ? image : placeholderImage.src}
        />
        <Input
          label={"Product label"}
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label={"Product image url"}
          value={imagePath}
          name="image"
          onChange={(e) => setImagePath(e.target.value)}
          onBlur={(e) => setImage(e.target.value)}
        />
        {Object.keys(sizes).map((sizeKey) => (
          <SizeInput
            key={sizeKey}
            updateSizes={editSize}
            uuid={sizeKey}
            editing={sizes[sizeKey].editing}
          />
        ))}
        <Button
          onClick={() => {
            const uuid = crypto.randomUUID();
            setSizes((sizes) => ({
              ...sizes,
              [uuid]: { uuid, editing: true, updateSizes: editSize },
            }));
          }}
        >
          add size
        </Button>
      </div>
      {/* <Input
        type="hidden"
        name="size-uuids"
        value={Object.keys(sizes)}
      /> */}
      <Button onClick={() => console.log("sizes", sizes)}>test</Button>
      <SubmitButton
        type="submit"
        disabled={Object.keys(sizes).length < 1
          || !!Object.keys(sizes).map(key => sizes[key]).find((size: SizeInputProps) => size.editing)}
      >submit</SubmitButton>
    </form>
  );
}
