'use client'

import { useState, useEffect, JSX } from 'react'
import { Trash } from 'lucide-react'

import { Note } from '@src/features/notes/services/note.service'

type NoteEditorProps = {
  note: Note
  onChange: (note: Partial<Note>) => void
  onDelete: (id: string) => void
}

export function NoteEditor({ note, onChange, onDelete }: NoteEditorProps): JSX.Element {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title !== note.title) {
        onChange({ title })
      }
    }, 500)

    return (): void => clearTimeout(timeout)
  }, [title, note.title, onChange])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (content !== note.content) {
        onChange({ content })
      }
    }, 500)

    return (): void => clearTimeout(timeout)
  }, [content, note.content, onChange])

  return (
    <main className="flex-1 p-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full text-xl font-bold mb-4 border-b pb-2 outline-none"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[400px] border rounded p-3 text-sm"
        placeholder="Write your note here..."
      />

      <div className="flex justify-end mb-2">
        <button
          onClick={() => {
            const confirmDelete = confirm('Are you sure you want to delete this note?')
            if (confirmDelete) {
              onDelete(note._id)
            }
          }}
          className="text-gray-400 hover:text-red-500 transition cursor-pointer"
          aria-label="Delete note"
        >
          <Trash size={18} />
        </button>
      </div>
    </main>
  )
}
