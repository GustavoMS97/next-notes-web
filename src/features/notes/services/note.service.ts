import { api } from '@src/lib/axios'

export type Note = {
  _id: string
  title: string
  content: string
  created_at: string
  updated_at: string
}

export async function getNotes(search?: string): Promise<Note[]> {
  const res = await api.get('/notes', {
    params: search ? { search } : undefined
  })
  return res.data
}

export async function createNote(data: { title: string; content: string }): Promise<Note> {
  const res = await api.post('/notes', data)
  return res.data
}

export async function updateNote(_id: string, data: Partial<Note>): Promise<Note> {
  const res = await api.put(`/notes/${_id}`, data)
  return res.data
}

export async function deleteNote(_id: string): Promise<void> {
  await api.delete(`/notes/${_id}`)
}
