import { ComponentPropsWithRef } from "react";

export type ButtonProps = ComponentPropsWithRef<'button'>

export default function Button({ children, ...props }: ButtonProps) {
  return (<button className="bg-purple-700 py-1 px-3 border-purple-900 border-s-2 hover:bg-purple-900 disabled:bg-gray-500 disabled:text-gray-300" type={!props.type ? 'button' : props.type} {...props}>{children}</button>);
}
