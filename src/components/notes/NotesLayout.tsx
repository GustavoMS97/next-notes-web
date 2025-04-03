'use client'

import { JSX, useState } from 'react'
import { SquarePen, Trash, Menu } from 'lucide-react'

import { NoteEditor } from '@src/components/notes/NoteEditor'
import { Header } from '@src/components/layout/Header'
import { MobileDrawer } from '@src/components/layout/MobileDrawer'
import { useNotes } from '@src/features/notes/hooks/useNotes'
import { NoteListPanel } from '@src/components/notes/NoteListPanel'

export function NotesLayout(): JSX.Element {
  const { notes, selectedNote, selectedNoteId, selectNote, createNote, updateNote, deleteNote, search, setSearch, isLoading } = useNotes()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleSelectNote = (id: string): void => {
    selectNote(id)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setDrawerOpen(false)
    }
  }

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
        {/* Sidebar desktop */}
        <div className="hidden md:block w-[300px] xl:w-[360px] border-r border-[#2c3338]">
          <NoteListPanel
            notes={notes}
            selectedNoteId={selectedNoteId}
            onSelect={handleSelectNote}
            search={search}
            onSearchChange={setSearch}
            onCreate={createNote}
          />
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {notes.length === 0 ? (
            <main className="flex-1 p-6 text-gray-500 flex items-center justify-center">No notes found.</main>
          ) : selectedNote ? (
            <NoteEditor note={selectedNote} onChange={updateNote} onDelete={deleteNote} />
          ) : (
            <main className="flex-1 p-6 text-gray-500 flex items-center justify-center">Select or create a note to get started.</main>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <NoteListPanel
          notes={notes}
          selectedNoteId={selectedNoteId}
          onSelect={handleSelectNote}
          search={search}
          onSearchChange={setSearch}
          onCreate={createNote}
        />
      </MobileDrawer>

      {/* Floating buttons (mobile) */}
      <div className="fixed bottom-4 right-4 flex items-center gap-3 md:hidden">
        {selectedNote && (
          <button
            onClick={() => {
              const confirmDelete = confirm('Are you sure you want to delete this note?')
              if (confirmDelete) {
                deleteNote(selectedNote._id)
              }
            }}
            aria-label="Delete note"
            className="bg-white text-black p-4 rounded-full shadow-md hover:bg-red-600 hover:text-white transition"
          >
            <Trash size={18} />
          </button>
        )}
        <button
          onClick={createNote}
          aria-label="Create new note"
          className="bg-black text-white p-4 rounded-full shadow-md hover:bg-gray-800 transition"
        >
          <SquarePen size={20} />
        </button>
      </div>

      <div className="fixed bottom-4 left-4 md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="bg-white text-black p-4 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          <Menu size={18} />
        </button>
      </div>
    </>
  )
}
