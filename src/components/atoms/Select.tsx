import { ChangeEventHandler, ComponentPropsWithRef } from "react";

import { FormInputWrapper } from "./forms";
import InputErrorText from "./forms/InputErrorText";

export type SelectProps = ComponentPropsWithRef<"select"> & {
  label?: string;
  name: string;
  onChange: ChangeEventHandler;
  error?: string | null;
};

export default function Select({ label, name, children, error, onChange, ...props }: SelectProps) {
  return (
    <FormInputWrapper>
      <label htmlFor={name} className="flex flex-col font-bold text-purple-300">
        {label || name}
        <select style={{ height: "24px" }} className="mt-2 text-slate-700" name={name} onChange={onChange} {...props}>
          {children}
        </select>
      </label>
      {error && <InputErrorText>{error}</InputErrorText>}
    </FormInputWrapper>
  );
}
