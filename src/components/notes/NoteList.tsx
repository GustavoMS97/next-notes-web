'use client'

import clsx from 'clsx'
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
    <aside className="flex-1 border-r border-gray-300 bg-gray-50">
      <ul className="space-y-1">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500 px-4">No notes found.</p>
        ) : (
          notes.map((note) => (
            <li key={note._id}>
              <button
                onClick={() => onSelect(note._id)}
                className={clsx(
                  'w-full text-left py-4 px-6 text-base font-medium transition flex items-center',
                  note._id === selectedNoteId ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-200'
                )}
              >
                <span className="truncate w-full">{note.title || 'Untitled note'}</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  )
}
