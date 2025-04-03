'use client'

import { useState, useRef, useEffect, JSX } from 'react'
import { User } from 'lucide-react'

import { useAuth } from '@src/context/AuthContext'

type HeaderProps = {}

export function Header({}: HeaderProps): JSX.Element | null {
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

  return (
    <header className="w-full flex justify-between items-center border-[#2c3338] p-4 bg-[#1C1C1E] relative">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold tracking-tight text-white">My Notes</h1>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center focus:outline-none cursor-pointer"
          aria-label="User menu"
        >
          <User size={18} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-[#1C1C1E] border rounded-lg shadow-md text-sm z-50 border-[#2c3338]">
            <div className="p-3 border-b">
              <div className="font-medium">{user.name}</div>
              <div className="text-gray-500">{user.email}</div>
            </div>
            <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
