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
    <main className="flex-1 pl-2 flex flex-col pb-15">
      <div className="flex items-center justify-between mb-4 pr-6 gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          maxLength={100}
          className="w-full text-xl font-bold pb-2 outline-none bg-transparent pl-4"
        />

        <button
          onClick={() => {
            const confirmDelete = confirm('Are you sure you want to delete this note?')
            if (confirmDelete) {
              onDelete(note._id)
            }
          }}
          className="hidden md:inline-block text-gray-400 hover:text-red-500 transition cursor-pointer"
          aria-label="Delete note"
        >
          <Trash size={18} />
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full flex-1 rounded p-3 text-sm resize-none text-xl
        bg-transparent text-white mb-24 focus:outline-none focus:ring-0 focus:border-transparent"
        placeholder="Write your note here..."
      />
    </main>
  )
}
