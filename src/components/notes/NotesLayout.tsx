'use client'

import { JSX } from 'react'

import { NoteList } from '@src/components/notes/NoteList'
import { NoteEditor } from '@src/components/notes/NoteEditor'
import { Header } from '@src/components/layout/Header'
import { useNotes } from '@src/features/notes/hooks/useNotes'
import { NoteSearchInput } from '@src/components/notes/NoteSearchInput'

export function NotesLayout(): JSX.Element {
  const { notes, selectedNote, selectedNoteId, selectNote, createNote, updateNote, deleteNote, search, setSearch, isLoading } = useNotes()

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center text-gray-500">Loading notes...</div>
      </>
    )
  }

  return (
    <>
      <Header />

      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-300 p-4 bg-gray-50">
          <NoteSearchInput value={search} onChange={setSearch} />

          <NoteList notes={notes} selectedNoteId={selectedNoteId} onSelect={selectNote} />
        </div>

        {notes.length === 0 ? (
          <main className="flex-1 p-6 text-gray-500 flex items-center justify-center">No notes found.</main>
        ) : selectedNote ? (
          <NoteEditor note={selectedNote} onChange={updateNote} onDelete={deleteNote} />
        ) : (
          <main className="flex-1 p-6 text-gray-500 flex items-center justify-center">Select or create a note to get started.</main>
        )}
      </div>

      <div className="fixed bottom-4 right-4">
        <button onClick={createNote} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
          + New Note
        </button>
      </div>
    </>
  )
}
