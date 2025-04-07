'use client'

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Trash, Save } from 'lucide-react'

import { Note } from '@src/features/notes/services/note.service'

export type NoteEditorRef = {
  save: () => void
  getNoteData: () => { title: string; content: string }
}

type NoteEditorProps = {
  note: Note
  onChange: (note: Partial<Note>) => void
  onDelete: (id: string) => void
}

export const NoteEditor = forwardRef<NoteEditorRef, NoteEditorProps>(({ note, onChange, onDelete }, ref) => {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
  }, [note])

  useImperativeHandle(ref, () => ({
    save: (): void => {
      if (title !== note.title || content !== note.content) {
        onChange({ title, content })
      }
    },
    getNoteData: (): { title: string; content: string } => ({ title, content })
  }))

  return (
    <main className="flex-1 pl-2 flex flex-col pb-15">
      <div className="flex items-center justify-between mb-4 pr-6 gap-2">
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          maxLength={100}
          className="w-full text-xl font-bold pb-2 outline-none bg-transparent pl-4"
        />
        <button
          onClick={() => {
            if (title !== note.title || content !== note.content) {
              onChange({ title, content })
            }
          }}
          className="hidden md:inline-block text-gray-400 hover:text-red-500 transition cursor-pointer"
          aria-label="Save note"
        >
          <Save size={25} />
        </button>
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
          <Trash size={25} />
        </button>
      </div>

      <textarea
        id="note-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full flex-1 rounded p-3 text-sm resize-none text-xl
        bg-transparent text-white mb-24 focus:outline-none focus:ring-0 focus:border-transparent"
        placeholder="Write your note here..."
      />
    </main>
  )
})

NoteEditor.displayName = 'NoteEditor'
