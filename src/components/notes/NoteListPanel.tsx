'use client'

import { JSX } from 'react'
import { SquarePen } from 'lucide-react'

import { NoteList } from '@src/components/notes/NoteList'
import { NoteSearchInput } from '@src/components/notes/NoteSearchInput'
import { Note } from '@src/features/notes/services/note.service'

type Props = {
  notes: Note[]
  selectedNoteId: string | null
  onSelect: (id: string) => void
  search: string
  onSearchChange: (text: string) => void
  onCreate: () => void
}

export function NoteListPanel({ notes, selectedNoteId, onSelect, search, onSearchChange, onCreate }: Props): JSX.Element {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Top bar with search */}
      <div className="flex w-full bg-gray-50 border-b border-gray-200">
        <NoteSearchInput value={search} onChange={onSearchChange} className="flex-1 h-[48px]" />
        <button
          onClick={onCreate}
          className="hidden md:flex items-center justify-center h-[48px] w-[48px]
          bg-black text-white rounded hover:bg-gray-800 transition cursor-pointer"
        >
          <SquarePen size={18} />
        </button>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto pb-4">
        <NoteList notes={notes} selectedNoteId={selectedNoteId} onSelect={onSelect} />
      </div>
    </div>
  )
}
