import { ComponentPropsWithoutRef } from "react";

export type OptionProps = ComponentPropsWithoutRef<'option'> & {
  label?: string;
  value: string | number;
  disabled?: boolean;
}

export default function Option({ label, value, disabled, ...props }: OptionProps) {
  return <option className="hover:bg-purple-200 hover:text-orange-700 focus:bg-purple-200" value={value} {...props}>{label || value}</option>;
}
