import { useEffect, useRef, useState } from 'react'

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
  updateNote: (partial: Partial<Note>) => void
  deleteNote: (_id: string) => Promise<void>
  search: string
  setSearch: (search: string) => void
  isLoading: boolean
  isSaving: boolean
}

const DEBOUNCE_TIME = 1000

export function useNotes(): UseNotesReturn {
  const { notes, selectedNoteId, setNotes, addNote, updateNoteInState, deleteNoteInState, selectNote } = useNotesStore()

  const [allNotes, setAllNotes] = useState<Note[]>([])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, DEBOUNCE_TIME)

    return (): void => clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true)
      const data = await getNotes()
      setAllNotes(data)
      setNotes(data)
      setIsLoading(false)
    }

    load()
  }, [setNotes])

  useEffect(() => {
    const filtered = allNotes.filter((note) => note.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    setNotes(filtered)
  }, [debouncedSearch, allNotes, setNotes])

  const selectedNote = notes.find((n) => n._id === selectedNoteId) ?? null

  const createNote = async (): Promise<void> => {
    const newNote = await createNoteService({ title: 'Untitled', content: ' ' })
    addNote(newNote)
    setAllNotes((prev) => [newNote, ...prev])
  }

  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const updateNote = (partial: Partial<Note>): void => {
    if (!selectedNoteId || !selectedNote) {
      return
    }

    updateNoteInState({ ...selectedNote, ...partial })

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(async () => {
      setIsSaving(true)
      try {
        const updated = await updateNoteService(selectedNoteId, partial)
        updateNoteInState(updated)
      } catch (err) {
        console.error('Failed to update note:', err)
      } finally {
        setIsSaving(false)
      }
    }, DEBOUNCE_TIME)
  }

  const deleteNote = async (_id: string): Promise<void> => {
    await deleteNoteService(_id)
    deleteNoteInState(_id)
    setAllNotes((prev) => prev.filter((note) => note._id !== _id))
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
    isLoading,
    isSaving
  }
}
