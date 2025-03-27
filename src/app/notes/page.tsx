'use client'

import { useAuthGuard } from '@src/hooks/useAuthGuard'
import { JSX } from 'react'

export default function NotesPage(): JSX.Element {
  useAuthGuard({ requireAuth: true })

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-300 p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Your Notes</h2>
        {/* Notes list goes here */}
        <ul className="space-y-2">
          <li className="cursor-pointer p-2 rounded hover:bg-gray-200">Note 1</li>
          <li className="cursor-pointer p-2 rounded hover:bg-gray-200">Note 2</li>
          <li className="cursor-pointer p-2 rounded hover:bg-gray-200">Note 3</li>
        </ul>
      </aside>

      {/* Main note area */}
      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Note Title</h2>
        <textarea className="w-full h-[400px] border rounded p-3 text-sm" placeholder="Write your note here..." />
      </main>
    </div>
  )
}
