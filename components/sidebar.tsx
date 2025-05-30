"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Database,
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { useAuth } from "@/contexts/auth-context"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const { user: profileUser, profilePicture } = useUser()
  const { user: authUser, logout } = useAuth()

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-gradient-to-b from-blue-900 to-indigo-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-14 items-center border-b border-blue-800 px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Database className="h-6 w-6 text-blue-300" />
          {!collapsed && <span className="font-bold text-white">Clothing ERP</span>}
        </Link>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-16 z-10 h-6 w-6 rounded-full border bg-white text-blue-900"
        onClick={toggleSidebar}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {!collapsed && (
        <div className="flex flex-col items-center py-4 border-b border-blue-800">
          <Avatar className="h-16 w-16 mb-2">
            {profilePicture ? (
              <AvatarImage
                src={profilePicture || "/placeholder.svg"}
                alt={`${profileUser.firstName} ${profileUser.lastName}`}
              />
            ) : (
              <AvatarImage src="/placeholder.svg" alt={`${profileUser.firstName} ${profileUser.lastName}`} />
            )}
            <AvatarFallback>
              {profileUser.firstName.charAt(0)}
              {profileUser.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="font-medium text-white">
              {authUser?.name || `${profileUser.firstName} ${profileUser.lastName}`}
            </h3>
            <p className="text-xs text-blue-200">{authUser?.role || profileUser.jobTitle}</p>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-4">
          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard className="h-4 w-4" />}
            label="Dashboard"
            active={pathname === "/dashboard"}
            collapsed={collapsed}
          />
          <NavItem
            href="/dashboard/inventory"
            icon={<Package className="h-4 w-4" />}
            label="Inventory"
            active={pathname === "/dashboard/inventory"}
            collapsed={collapsed}
          />
          <NavItem
            href="/dashboard/customers"
            icon={<Users className="h-4 w-4" />}
            label="Customers"
            active={pathname === "/dashboard/customers"}
            collapsed={collapsed}
          />
          <NavItem
            href="/dashboard/sales"
            icon={<ShoppingCart className="h-4 w-4" />}
            label="Sales"
            active={pathname === "/dashboard/sales"}
            collapsed={collapsed}
          />
          <NavItem
            href="/dashboard/profile"
            icon={<User className="h-4 w-4" />}
            label="Profile"
            active={pathname === "/dashboard/profile"}
            collapsed={collapsed}
          />
          <NavItem
            href="/dashboard/settings"
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
            active={pathname === "/dashboard/settings"}
            collapsed={collapsed}
          />
          <NavItem
            href="/dashboard/help"
            icon={<HelpCircle className="h-4 w-4" />}
            label="Help"
            active={pathname === "/dashboard/help"}
            collapsed={collapsed}
          />
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t border-blue-800 p-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-blue-100 hover:bg-blue-800 hover:text-white",
            collapsed && "justify-center px-0",
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  active: boolean
  collapsed: boolean
}

function NavItem({ href, icon, label, active, collapsed }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-blue-800 text-white" : "text-blue-100 hover:bg-blue-800 hover:text-white",
        collapsed && "justify-center px-0",
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}
