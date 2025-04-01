'use client'

import { useState, useRef, useEffect, JSX } from 'react'

import { useAuth } from '@src/context/AuthContext'

export function Header(): JSX.Element | null {
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return (): void => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) {
    return null
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="w-full flex justify-between items-center border-b p-4 bg-white relative">
      <h1 className="text-lg font-semibold tracking-tight">My Notes</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className={
            'w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm focus:outline-none cursor-pointer'
          }
        >
          {initials}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md text-sm z-50">
            <div className="p-3 border-b">
              <div className="font-medium">{user.name}</div>
              <div className="text-gray-500">{user.email}</div>
            </div>
            <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
