'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

function IconArrowUp({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="16" // Adjust the stroke width as needed
        className={cn('size-4', className)}
        {...props}
      >
        <path d="M122.34 34.34l72 72a8 8 0 0 1-11.32 11.32L136 59.31V216a8 8 0 0 1-16 0V59.31L73.66 117.66a8 8 0 0 1-11.32-11.32l72-72a8 8 0 0 1 11.32 0Z" />
      </svg>
    )
}
  

export { IconArrowUp };