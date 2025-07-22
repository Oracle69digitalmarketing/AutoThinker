"use client"

import { useState, useEffect } from "react"

interface User {
  email: string
  id: string
}

interface AuthState {
  user: User | null
  loading: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  })

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      setAuthState({
        user: null, // No user by default
        loading: false,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return authState
}
