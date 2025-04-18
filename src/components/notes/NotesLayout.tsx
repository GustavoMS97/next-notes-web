'use client'

import { JSX, useRef, useState } from 'react'
import { SquarePen, Trash, Menu, Save } from 'lucide-react'

import { NoteEditor, NoteEditorRef } from '@src/components/notes/NoteEditor'
import { Header } from '@src/components/layout/Header'
import { MobileDrawer } from '@src/components/layout/MobileDrawer'
import { useNotes } from '@src/features/notes/hooks/useNotes'
import { NoteListPanel } from '@src/components/notes/NoteListPanel'
import { Spinner } from '@src/components/ui/Spinner'

export function NotesLayout(): JSX.Element {
  const { notes, selectedNote, selectedNoteId, selectNote, createNote, updateNote, deleteNote, search, setSearch, isLoading, isSaving } = useNotes()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const noteEditorRef = useRef<NoteEditorRef>(null)

  const handleSelectNote = (id: string): void => {
    if (selectedNote && noteEditorRef.current) {
      const { title, content } = noteEditorRef.current.getNoteData()

      const hasChanges = title !== selectedNote.title || content !== selectedNote.content

      if (hasChanges) {
        const confirmSave = confirm('You have unsaved changes. Save before switching notes?')
        if (confirmSave) {
          noteEditorRef.current.save()
        }
      }
    }
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
            isSaving={isSaving}
          />
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {notes.length === 0 ? (
            <main className="flex-1 p-6 text-gray-500 flex items-center justify-center">No notes found.</main>
          ) : selectedNote ? (
            <NoteEditor ref={noteEditorRef} note={selectedNote} onChange={updateNote} onDelete={deleteNote} />
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
          isSaving={isSaving}
        />
      </MobileDrawer>

      {/* Floating buttons (mobile) */}
      <div className="fixed bottom-4 right-4 flex items-center gap-3 md:hidden">
        {selectedNote && (
          <>
            <button
              onClick={() => {
                const confirmDelete = confirm('Are you sure you want to delete this note?')
                if (confirmDelete) {
                  deleteNote(selectedNote._id)
                }
              }}
              aria-label="Delete note"
              className="bg-white text-black p-4 rounded-full shadow-md hover:bg-red-600 hover:text-white transition cursor-pointer"
            >
              <Trash size={18} />
            </button>
            <button
              onClick={() => noteEditorRef.current?.save()}
              aria-label="Save note"
              className="bg-white text-black p-4 rounded-full shadow-md hover:bg-red-600 hover:text-white transition cursor-pointer"
            >
              <Save size={18} />
            </button>
          </>
        )}
        {isSaving ? (
          <button className="bg-black text-white p-4 rounded-full shadow-md hover:bg-gray-800 transition">
            <Spinner />
          </button>
        ) : (
          <button
            onClick={createNote}
            aria-label="Create new note"
            className="bg-black text-white p-4 rounded-full shadow-md hover:bg-gray-800 transition cursor-pointer"
          >
            <SquarePen size={20} />
          </button>
        )}
      </div>

      {notes.length ? (
        <div className="fixed bottom-4 left-4 md:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="bg-white text-black p-4 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            <Menu size={18} />
          </button>
        </div>
      ) : (
        true
      )}
    </>
  )
}
