'use client'

import { useState, useEffect, JSX } from 'react'

type Note = {
  id: string
  title: string
  content: string
}

type NoteEditorProps = {
  note: Note | null
  onChange?: (note: Partial<Note>) => void
}

export function NoteEditor({ note, onChange }: NoteEditorProps): JSX.Element {
  const [title, setTitle] = useState(note?.title ?? '')
  const [content, setContent] = useState(note?.content ?? '')

  // Update local state when note changes
  useEffect(() => {
    setTitle(note?.title ?? '')
    setContent(note?.content ?? '')
  }, [note])

  return (
    <main className="flex-1 p-6">
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          onChange?.({ title: e.target.value })
        }}
        placeholder="Title"
        className="w-full text-xl font-bold mb-4 border-b pb-2 outline-none"
      />

      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
          onChange?.({ content: e.target.value })
        }}
        className="w-full h-[400px] border rounded p-3 text-sm"
        placeholder="Write your note here..."
      />
    </main>
  )
}
