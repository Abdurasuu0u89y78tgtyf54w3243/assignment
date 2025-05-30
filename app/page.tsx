"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { Database } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  // For demo purposes, allow direct access to dashboard
  const handleDemoAccess = () => {
    router.push("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onSuccess={() => router.push("/dashboard")} />
        ) : (
          <div className="text-center space-y-4 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
            <Database className="h-12 w-12 mx-auto text-primary" />
            <h1 className="text-2xl font-bold">Clothing ERP System</h1>
            <p className="text-gray-500">Welcome to the Clothing ERP System. Please log in to continue.</p>
            <Button onClick={handleDemoAccess} className="w-full">
              Demo Access (Skip Login)
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
