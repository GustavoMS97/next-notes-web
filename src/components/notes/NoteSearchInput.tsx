'use client'

import clsx from 'clsx'
import { JSX, useEffect, useRef } from 'react'

type NoteSearchInputProps = {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function NoteSearchInput({ value, onChange, className }: NoteSearchInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search notes..."
      className={clsx('px-3 py-3 border outline-none text-sm', className)}
    />
  )
}
