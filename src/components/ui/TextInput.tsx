'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: FieldError
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, error, ...rest }, ref) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        ref={ref}
        {...rest}
        className={`w-full border rounded px-3 py-2 text-sm outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  )
})

TextInput.displayName = 'TextInput'
