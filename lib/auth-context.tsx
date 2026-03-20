'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signup: (email: string, password: string, name: string) => Promise<void>
  signin: (email: string, password: string) => Promise<void>
  signout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored session on mount
  useEffect(() => {
    const stored = localStorage.getItem('medicalApp_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('medicalApp_user')
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock validation
      if (!email || !password || !name) {
        throw new Error('All fields are required')
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
      }

      setUser(newUser)
      localStorage.setItem('medicalApp_user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signin = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!email || !password) {
        throw new Error('Email and password are required')
      }

      // Mock authentication - any valid email/password works
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
      }

      setUser(newUser)
      localStorage.setItem('medicalApp_user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signout = () => {
    setUser(null)
    localStorage.removeItem('medicalApp_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signup,
        signin,
        signout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
