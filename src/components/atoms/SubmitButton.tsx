'use client'

import { useFormStatus } from 'react-dom'
import { Button } from 'src/components/atoms';

// @TODO: just export buttonprops from the Button I guess, whatever
export function SubmitButton({ children, ...props }: Parameters<typeof Button>) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} {...props}>
      {children}
    </Button>
  )
}
