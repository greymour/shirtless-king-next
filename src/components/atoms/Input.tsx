import { ChangeEvent, ChangeEventHandler, HTMLProps, InputHTMLAttributes } from "react";

export type InputProps<T> = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: T;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errorMsg?: string;
}

export default function Input<T>({label, value, onChange, errorMsg, ...props}: InputProps<T>) {
  console.log('props', props)
  return (
    // @TODO: have a check for the className to allow users to override the py-2 className if wanted
    // ^do some stuff with String.slice()
    <div {...props} className={!props.className ? 'py-2' : `${props.className} py-2`}>
      <label className="flex flex-col text-purple-300 font-bold">
      {label}
      <input value={value} onChange={onChange} {...props} className="mt-2 text-slate-700 disabled:text-slate-400" />
    </label>
    {errorMsg && <p>{errorMsg}</p>}
    </div>
  )
}