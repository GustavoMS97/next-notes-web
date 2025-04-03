import { useEffect, useRef, useState } from 'react'

import { useNotesStore } from '@src/features/notes/hooks/useNotesStore'
import {
  Note,
  getNotes,
  createNote as createNoteService,
  updateNote as updateNoteService,
  deleteNote as deleteNoteService
} from '@src/features/notes/services/note.service'

const DEBOUNCE_TIME = 1000

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

export function useNotes(): UseNotesReturn {
  const { notes, selectedNoteId, setNotes, addNote, updateNoteInState, deleteNoteInState, selectNote } = useNotesStore()

  const [allNotes, setAllNotes] = useState<Note[]>([])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const lastContentRef = useRef<string | null>(null)

  const selectedNote = notes.find((n) => n._id === selectedNoteId) ?? null

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, DEBOUNCE_TIME)

    return (): void => clearTimeout(timeout)
  }, [search])

  // Load all notes once
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

  // Filter notes by debounced search term
  useEffect(() => {
    const filtered = allNotes.filter((note) => note.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    setNotes(filtered)
  }, [debouncedSearch, allNotes, setNotes])

  // Create new note
  const createNote = async (): Promise<void> => {
    const newNote = await createNoteService({ title: 'Untitled', content: ' ' })
    addNote(newNote)
    setAllNotes((prev) => [newNote, ...prev])
  }

  // Update note with debounce
  const updateNote = (partial: Partial<Note>): void => {
    if (!selectedNoteId || !selectedNote) {
      return
    }
    // Update local immediately
    const updatedLocalNote = { ...selectedNote, ...partial }
    updateNoteInState(updatedLocalNote)
    // Save current content to ref
    lastContentRef.current = updatedLocalNote.content
    // Debounce logic
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      const currentContent = lastContentRef.current
      if (!currentContent) {
        return
      }
      setIsSaving(true)
      updateNoteService(selectedNoteId, { content: currentContent })
        .catch((err) => console.error('Failed to save note:', err))
        .finally(() => setIsSaving(false))
    }, DEBOUNCE_TIME)
  }

  // Delete note
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
