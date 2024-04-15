import { ChangeEventHandler, ComponentPropsWithRef } from "react";
import InputErrorText from "src/components/atoms/forms/InputErrorText";

import { FormInputWrapper } from "./forms";

export type InputProps<T> = ComponentPropsWithRef<"input"> & {
  label?: string;
  name: string;
  value: T;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  error?: string | null;
};

export default function Input<T>({ name, label, value, onChange, error: errorMsg, ...props }: InputProps<T>) {
  if (props.type === "hidden") {
    return <input name={name} value={value} {...props} />;
  }
  return (
    // @TODO: have a check for the className to allow users to override the py-2 className if wanted
    // ^do some stuff with String.slice()
    <FormInputWrapper {...props}>
      <label htmlFor={name} className="flex flex-col font-bold text-purple-300">
        {label}
        <input
          name={name}
          value={value}
          onChange={onChange}
          {...props}
          className="mt-2 text-slate-700 disabled:text-slate-400"
        />
      </label>
      {errorMsg && <InputErrorText>{errorMsg}</InputErrorText>}
    </FormInputWrapper>
  );
}
