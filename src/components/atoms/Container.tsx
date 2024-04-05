import { ReactNode } from "react"

type ContainerProps = {
  children: ReactNode
}
export default function Container({ children, ...props}: ContainerProps) {
  return (
    <div className="mx-auto md:max-w-xl lg:max-w-5xl">
      {children}
    </div>
  )
}