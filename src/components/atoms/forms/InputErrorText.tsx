import { ComponentPropsWithRef } from "react";

export type InputErrorTextProps = ComponentPropsWithRef<"p">;

export default function InputErrorText({ children, ...props }: InputErrorTextProps) {
  return (
    <p className="text-red-400" {...props}>
      {children}
    </p>
  );
}
