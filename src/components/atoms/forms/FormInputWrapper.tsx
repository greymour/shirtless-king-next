import { ComponentPropsWithRef } from "react";

export default function FormInputWrapper({ children, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div {...props} className={!props.className ? "py-2" : `${props.className} py-2`}>
      {children}
    </div>
  );
}
