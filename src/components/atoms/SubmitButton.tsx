'use client'

import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from 'src/components/atoms';

export function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={props.disabled ? props.disabled && pending : pending} {...props}>
      {children}
    </Button>
  )
}
