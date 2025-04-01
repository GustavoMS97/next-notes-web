import { useEffect, useState } from 'react'

import { useNotesStore } from '@src/features/notes/hooks/useNotesStore'
import {
  Note,
  getNotes,
  createNote as createNoteService,
  updateNote as updateNoteService,
  deleteNote as deleteNoteService
} from '@src/features/notes/services/note.service'

type UseNotesReturn = {
  notes: Note[]
  selectedNote: Note | null
  selectedNoteId: string | null
  selectNote: (_id: string) => void
  createNote: () => Promise<void>
  updateNote: (partial: Partial<Note>) => Promise<void>
  deleteNote: (_id: string) => Promise<void>
  search: string
  setSearch: (search: string) => void
  isLoading: boolean
}

export function useNotes(): UseNotesReturn {
  const { notes, selectedNoteId, setNotes, addNote, updateNoteInState, deleteNoteInState, selectNote } = useNotesStore()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return (): void => clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true)
      const data = await getNotes(debouncedSearch)
      setNotes(data)
      setIsLoading(false)
    }

    load()
  }, [debouncedSearch, setNotes])

  const selectedNote = notes.find((n) => n._id === selectedNoteId) ?? null

  const createNote = async (): Promise<void> => {
    const newNote = await createNoteService({ title: 'Untitled', content: ' ' })
    addNote(newNote)
  }

  const updateNote = async (partial: Partial<Note>): Promise<void> => {
    if (!selectedNoteId) return
    const updated = await updateNoteService(selectedNoteId, partial)
    updateNoteInState(updated)
  }

  const deleteNote = async (_id: string): Promise<void> => {
    await deleteNoteService(_id)
    deleteNoteInState(_id)
  }

  return {
    notes,
    selectedNote,
    selectedNoteId,
    selectNote,
    createNote,
    updateNote,
    deleteNote,
    search,
    setSearch,
    isLoading
  }
}
