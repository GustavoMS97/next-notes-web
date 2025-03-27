'use client'

import { JSX } from 'react'

import { useAuth } from '@src/context/AuthContext'

export function Header(): JSX.Element | null {
  const { user, logout } = useAuth()

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="w-full flex justify-between items-center border-b p-4 bg-white">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">{initials}</div>
        <div className="text-sm">
          <div className="font-medium">{user.name}</div>
          <div className="text-gray-500">{user.email}</div>
        </div>
      </div>

      <button onClick={logout} className="text-sm text-gray-600 hover:text-black transition">
        Logout
      </button>
    </header>
  )
}
