import { InsertSize } from "db/schema";
import { ChangeEvent, useState } from "react";
import { Button, Input, Option, Select } from "src/components/atoms";
import { SIZE_OPTIONS } from "src/utils/constants";

export type SizeInputProps = Omit<InsertSize, "size"> & {
  size?: string;
  editing?: boolean;
  updateSizes: (key: string, size: SizeInputProps) => void;
  uuid: string;
  existingSizes: string[];
};

export default function SizeInput(props: SizeInputProps) {
  const { size, updateSizes, uuid, existingSizes } = props;
  // console.log("size: ", size);
  const placeHolderLabel = "placeholder";
  const [sizeLabel, setSizeLabel] = useState(size || placeHolderLabel);
  const [labelError, setLabelError] = useState<string | null>(null);
  const [price, setPrice] = useState(props.price || 0);
  const [stockCount, setStockCount] = useState(props.stockCount || 0);
  const [editing, setEditing] = useState(typeof props.editing !== "undefined" ? props.editing : true);
  return (
    <fieldset name={`size-${uuid}`} className="flex flex-row items-center gap-2">
      <Select
        label="Size Label"
        required
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSizeLabel(e.target.value)}
        disabled={!editing}
        value={sizeLabel}
        name={`size-${uuid}-size`}
        error={labelError}
      >
        <Option disabled value={placeHolderLabel} label="Select size" />
        {Object.values(SIZE_OPTIONS).map((opt) => {
          return <Option key={opt} disabled={existingSizes.includes(opt)} value={opt} />;
        })}
      </Select>
      <Input
        label="Price"
        type="text"
        required
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        disabled={!editing}
        name={`size-${uuid}-price`}
      />
      <Input
        label="Stock count"
        type="number"
        required
        value={stockCount}
        onChange={(e) => setStockCount(Number(e.target.value))}
        disabled={!editing}
        name={`size-${uuid}-stock`}
      />
      <Button
        style={{ marginTop: "30px" }}
        onClick={() => {
          if (editing) {
            if (sizeLabel === placeHolderLabel) {
              setLabelError("Please select a size for this item.");
              return;
            }
            const sizePayload = {
              size: sizeLabel,
              price,
              stockCount,
              editing: false,
              uuid,
              updateSizes,
              existingSizes,
            };
            updateSizes(uuid, sizePayload);
          }
          setEditing((isEditing) => !isEditing);
        }}
      >
        {editing ? "Done" : "Edit"}
      </Button>
    </fieldset>
  );
}
