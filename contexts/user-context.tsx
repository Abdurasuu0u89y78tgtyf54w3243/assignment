"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type UserContextType = {
  user: User
  updateUser: (data: Partial<User>) => void
  profilePicture: string | null
  updateProfilePicture: (url: string) => void
}

type User = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle: string
  preferences: {
    emailNotifications: boolean
    orderUpdates: boolean
    inventoryAlerts: boolean
    marketingEmails: boolean
    language: string
    timezone: string
    dateFormat: string
  }
}

const defaultUser: User = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  company: "Acme Inc.",
  jobTitle: "Administrator",
  preferences: {
    emailNotifications: true,
    orderUpdates: true,
    inventoryAlerts: true,
    marketingEmails: false,
    language: "en",
    timezone: "est",
    dateFormat: "mdy",
  },
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  // Try to load user data from localStorage on initial render
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("erpUser")
      return savedUser ? JSON.parse(savedUser) : defaultUser
    }
    return defaultUser
  })

  const [profilePicture, setProfilePicture] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("profilePicture")
    }
    return null
  })

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("erpUser", JSON.stringify(user))
    }
  }, [user])

  // Save profile picture to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && profilePicture) {
      localStorage.setItem("profilePicture", profilePicture)
    }
  }, [profilePicture])

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      // Handle nested preferences object
      if (data.preferences) {
        return {
          ...prev,
          ...data,
          preferences: {
            ...prev.preferences,
            ...data.preferences,
          },
        }
      }
      return { ...prev, ...data }
    })
  }

  const updateProfilePicture = (url: string) => {
    setProfilePicture(url)
  }

  return (
    <UserContext.Provider value={{ user, updateUser, profilePicture, updateProfilePicture }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
