"use client";

import { InsertInventoryItem } from "db/schema";
import placeholderImage from "public/shirt-placeholder.jpg";
import { FormEvent, useState } from "react";
import { Button, Input } from "src/components/atoms";
import { SubmitButton } from "src/components/atoms/SubmitButton";
import { createInventoryItem, updateInventoryItem } from "src/inventory/actions";
import SizeInput, { SizeInputProps } from "src/inventory/InventoryItemForm/SizeInput";
import { SIZE_OPTIONS, SizeOption } from "src/utils/constants";
import { ItemWithSizes } from "src/utils/types";

type Sizes = Record<string, SizeInputProps>;

function sortSizes(sizes: Sizes): SizeInputProps[] {
  const keys = Object.keys(sizes);
  const sortedKeys = Object.values(SIZE_OPTIONS);
  console.log("17: ", keys, sortedKeys);
  const res = Array(keys.length);
  console.log("res: ", res);
  keys.forEach((sizeKey) => {
    const size = sizes[sizeKey];
    const targetIdx = size.size ? sortedKeys.indexOf(size.size as SizeOption) : keys.length - 1;
    console.log("targetIdx: ", size.size, targetIdx);
    res[targetIdx] = size;
  });
  return res;
}

export default function InventoryItemForm(props?: ItemWithSizes | undefined) {
  const [name, setName] = useState(props?.item?.name || "");
  const [nameError, setNameError] = useState<string | null>(null);
  const [image, setImage] = useState(props?.item?.image || "");
  const [imagePath, setImagePath] = useState(props?.item?.image || "");
  const [imageError, setImageError] = useState<string | null>(null);

  const editSize = (key: string, size: SizeInputProps) => {
    setSizes({ ...sizes, [key]: size });
  };

  const initialSizes = !props?.sizes
    ? {}
    : props?.sizes.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.id.toString()]: {
          ...cur,
          // eslint-disable-next-line react/destructuring-assignment
          existingSizes: props.sizes.map(({ size }) => size),
          uuid: cur.id.toString(),
          updateSizes: editSize,
          editing: false,
        },
      };
    }, {} as Sizes);

  const [sizes, setSizes] = useState<Sizes>(initialSizes);

  const updateImage = (e) => {
    if (!imagePath.includes("http")) {
      setImageError("Image url is invalid");
    } else {
      setImageError(null);
      setImage(e.target.value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setImageError(null);
    setNameError(null);

    if (!imagePath.includes("http")) {
      setImageError("Image url is invalid");
      return;
    }
    if (!name) {
      setNameError("Name is required");
      return;
    }
    // const sizesPayload = Object.keys(sizes).map((sizeKey) => sizes[sizeKey]);
    // @TODO: do validation
    // I have to 'use server' here I think? I hate this!
    const payload = {
      item: {
        name,
        image,
      },
      sizes: Object.values(sizes).filter((size) => !!size),
    };
    return;
    e.currentTarget.form?.requestSubmit();
  };

  const submitForm = (!props?.item?.id ? createInventoryItem : updateInventoryItem).bind(
    null,
    JSON.stringify({
      id: props?.item?.id || null,
      name,
      image,
      sizes: Object.values(sizes).filter((size) => !!size),
    })
  );

  return (
    <form
      onSubmit={handleSubmit}
      action={submitForm}
      className="flex flex-col border-4 border-purple-300 bg-slate-900 p-4"
    >
      <div className="mb-4">
        <img
          alt={props?.item ? `Artwork for item ${props.item.name}` : "Placeholder artwork"}
          className="mx-auto max-h-80 max-w-80"
          src={image || placeholderImage.src}
        />
        <Input required label="Product label" value={name} name="name" onChange={(e) => setName(e.target.value)} />
        <Input
          label="Product image url"
          value={imagePath}
          name="image"
          onChange={(e) => {
            if (imageError) {
              setImageError(null);
            }
            setImagePath(e.target.value);
          }}
          onBlur={(e) => updateImage(e)}
          error={imageError}
        />
        {sortSizes(sizes).map((size) => (
          <SizeInput
            key={size.uuid}
            size={size.size}
            updateSizes={editSize}
            uuid={size.uuid}
            editing={size.editing}
            existingSizes={Object.values(sizes)
              .filter((sizeObj) => !!sizeObj.size)
              .map((sizeObj) => sizeObj.size!)}
          />
        ))}
        <Button
          onClick={() => {
            const uuid = crypto.randomUUID();
            setSizes((existingSizes) => ({
              ...existingSizes,
              [uuid]: {
                size: "",
                uuid,
                editing: true,
                updateSizes: editSize,
                existingSizes: Object.values(sizes).map((size) => size.size!),
              },
            }));
          }}
        >
          add size
        </Button>
      </div>
      <SubmitButton
        type="submit"
        disabled={
          Object.keys(sizes).length < 1 ||
          !!Object.keys(sizes)
            .map((key) => sizes[key])
            .find((size: SizeInputProps) => size.editing) ||
          !!imageError
        }
      >
        submit
      </SubmitButton>
    </form>
  );
}
