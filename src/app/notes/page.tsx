'use client'

import { JSX } from 'react'

import { NotesLayout } from '@src/components/notes/NotesLayout'
import { useAuthGuard } from '@src/hooks/useAuthGuard'

export default function NotesPage(): JSX.Element {
  useAuthGuard({ requireAuth: true })

  return <NotesLayout />
}
