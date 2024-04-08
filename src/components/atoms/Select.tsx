import { ChangeEventHandler, ComponentPropsWithRef } from "react";

export type SelectProps = ComponentPropsWithRef<'select'> & {
  label?: string;
  name: string;
  onChange: ChangeEventHandler;
}

// @TODO: separate out the underlying <option> element
export default function Select({ label, name, children, onChange, ...props }: SelectProps) {
  return (
    <label className="flex flex-col text-purple-300 font-bold">
      {label || name}
      <select style={{ height: '24px' }} className="mt-2 text-slate-700" name={name} onChange={onChange} {...props}>
        {children}
      </select>
    </label>
  )
}
