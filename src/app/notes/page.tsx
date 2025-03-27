'use client'

import { JSX, useState } from 'react'

import { NoteList } from '@src/components/notes/NoteList'
import { NoteEditor } from '@src/components/notes/NoteEditor'
import { useAuthGuard } from '@src/hooks/useAuthGuard'
import { Header } from '@src/components/layout/Header'

const mockNotes = [
  { id: '1', title: 'Shopping List', content: 'Eggs\nMilk\nBread' },
  { id: '2', title: 'Meeting Notes', content: 'Discuss Q2 roadmap' },
  { id: '3', title: 'Random Ideas', content: 'Build a note app in Go + Next.js' }
]

export default function NotesPage(): JSX.Element {
  useAuthGuard({ requireAuth: true })

  const [notes] = useState(mockNotes)
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(mockNotes[0]?.id ?? null)

  const selectedNote = notes.find((note) => note.id === selectedNoteId) ?? null

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row">
        <NoteList notes={notes} selectedNoteId={selectedNoteId} onSelect={(id) => setSelectedNoteId(id)} />

        <NoteEditor note={selectedNote} />
      </div>
    </>
  )
}
