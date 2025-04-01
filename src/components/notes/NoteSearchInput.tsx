'use client'

import { JSX, useEffect, useRef } from 'react'

type NoteSearchInputProps = {
  value: string
  onChange: (value: string) => void
}

export function NoteSearchInput({ value, onChange }: NoteSearchInputProps): JSX.Element {
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
      className="w-full border px-3 py-2 rounded text-sm mb-4"
    />
  )
}
