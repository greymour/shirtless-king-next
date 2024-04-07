import { ComponentPropsWithRef } from "react";

export default function Button({ children, ...props }: ComponentPropsWithRef<'button'>) {
  return (<button className="bg-purple-700 py-1 px-3 border-purple-900 border-s-2 hover:bg-purple-900" type={!props.type ? 'button' : props.type} {...props}>{children}</button>);
}
