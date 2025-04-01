'use client'

import { JSX } from 'react'

type Note = {
  _id: string
  title: string
}

type NoteListProps = {
  notes: Note[]
  selectedNoteId: string | null
  onSelect: (_id: string) => void
}

export function NoteList({ notes, selectedNoteId, onSelect }: NoteListProps): JSX.Element {
  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-300 p-4 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Your Notes</h2>
      <ul className="space-y-2">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500">No notes found.</p>
        ) : (
          notes.map((note) => (
            <li
              key={note._id}
              onClick={() => onSelect(note._id)}
              className={`cursor-pointer p-2 rounded transition ${
                note._id === selectedNoteId ? 'bg-black text-white' : 'hover:bg-gray-200'
              }`}
            >
              {note.title || 'Untitled'}
            </li>
          ))
        )}
      </ul>
    </aside>
  )
}
