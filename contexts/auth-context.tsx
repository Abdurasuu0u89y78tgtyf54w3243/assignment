"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  email: string
  name: string
  role: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  getCurrentUserId: () => string | null
}

// Mock users for demo
const mockUsers = [
  {
    id: "user1",
    email: "test@example.com",
    password: "password123",
    name: "Test User",
    role: "Admin",
  },
  {
    id: "user2",
    email: "shokirov@gmail.com",
    password: "password123",
    name: "Shokirov",
    role: "Manager",
  },
  {
    id: "user3",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    role: "User",
  },
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Find user in mock data
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && (foundUser.password === password || password === "password123")) {
      // Create user session without password
      const userSession: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      }

      // Store in state and localStorage
      setUser(userSession)
      localStorage.setItem("currentUser", JSON.stringify(userSession))

      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      })

      return Promise.resolve()
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
      return Promise.reject("Invalid credentials")
    }
  }

  const register = async (name: string, email: string, password: string) => {
    // Check if user already exists
    if (mockUsers.some((u) => u.email === email)) {
      toast({
        title: "Registration failed",
        description: "Email already in use",
        variant: "destructive",
      })
      return Promise.reject("Email already in use")
    }

    // In a real app, you would create a new user in the database
    // For this demo, we'll just create a new user object
    const newUserId = `user${Date.now()}`
    const newUser: User = {
      id: newUserId,
      email,
      name,
      role: "User",
    }

    // Store in state and localStorage
    setUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    // In a real app, you would also store the new user in the database
    // For this demo, we'll just add it to our mock users (though this won't persist on page refresh)
    mockUsers.push({
      ...newUser,
      password,
    })

    toast({
      title: "Registration successful",
      description: `Welcome, ${name}!`,
    })

    return Promise.resolve()
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  const getCurrentUserId = () => {
    return user?.id || null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        getCurrentUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
