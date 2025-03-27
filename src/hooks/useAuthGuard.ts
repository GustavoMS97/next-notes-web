'use client'

import { useAuth } from '@src/context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type UseAuthGuardOptions = {
  requireAuth?: boolean
}

export function useAuthGuard({ requireAuth = true }: UseAuthGuardOptions = {}): void {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !user) {
      router.replace('/login')
    }

    if (!requireAuth && user) {
      router.replace('/notes')
    }
  }, [user, isLoading, requireAuth, router])
}
