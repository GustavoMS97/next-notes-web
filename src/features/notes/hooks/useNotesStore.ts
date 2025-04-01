import { create } from 'zustand'

import { Note } from '@src/features/notes/services/note.service'

type NotesState = {
  notes: Note[]
  selectedNoteId: string | null

  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  updateNoteInState: (note: Note) => void
  deleteNoteInState: (_id: string) => void
  selectNote: (_id: string) => void
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  selectedNoteId: null,

  setNotes: (notes): void => set({ notes, selectedNoteId: notes[0]?._id ?? null }),

  addNote: (note): void =>
    set((state) => ({
      notes: [note, ...state.notes],
      selectedNoteId: note._id
    })),

  updateNoteInState: (note): void =>
    set((state) => ({
      notes: state.notes.map((n) => (n._id === note._id ? note : n))
    })),

  deleteNoteInState: (_id): void =>
    set((state) => {
      const filtered = state.notes.filter((n) => n._id !== _id)
      return {
        notes: filtered,
        selectedNoteId: filtered[0]?._id ?? null
      }
    }),

  selectNote: (_id): void => set({ selectedNoteId: _id })
}))
