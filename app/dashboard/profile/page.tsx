"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/contexts/user-context"

export default function ProfilePage() {
  const { toast } = useToast()
  const { user, updateUser, profilePicture, updateProfilePicture } = useUser()
  const [activeTab, setActiveTab] = useState("account")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Account form state
  const [accountForm, setAccountForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    company: user.company,
    jobTitle: user.jobTitle,
  })

  // Security form state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Preferences form state
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: user.preferences.emailNotifications,
    orderUpdates: user.preferences.orderUpdates,
    inventoryAlerts: user.preferences.inventoryAlerts,
    marketingEmails: user.preferences.marketingEmails,
  })

  const [displayPreferences, setDisplayPreferences] = useState({
    language: user.preferences.language,
    timezone: user.preferences.timezone,
    dateFormat: user.preferences.dateFormat,
  })

  // Profile picture state
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(profilePicture)

  // Handle account form changes
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setAccountForm((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Handle security form changes
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setSecurityForm((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Handle notification toggle
  const handleNotificationToggle = (key: string) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  // Handle display preference changes
  const handleDisplayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target
    setDisplayPreferences((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Handle profile picture change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewProfilePicture(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit account form
  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Update the global user state
    setTimeout(() => {
      updateUser({
        firstName: accountForm.firstName,
        lastName: accountForm.lastName,
        email: accountForm.email,
        phone: accountForm.phone,
        company: accountForm.company,
        jobTitle: accountForm.jobTitle,
      })

      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your account information has been updated successfully.",
      })
    }, 1000)
  }

  // Submit security form
  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSecurityForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    }, 1000)
  }

  // Submit preferences form
  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Update the global user preferences
    setTimeout(() => {
      updateUser({
        preferences: {
          ...user.preferences,
          ...notificationPreferences,
          ...displayPreferences,
        },
      })

      setIsLoading(false)
      toast({
        title: "Preferences saved",
        description: "Your notification preferences have been updated.",
      })
    }, 1000)
  }

  // Upload profile picture
  const handleUploadPicture = () => {
    if (!previewUrl) return

    setIsLoading(true)

    // Update the global profile picture
    setTimeout(() => {
      updateProfilePicture(previewUrl)
      setIsLoading(false)
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      })
    }, 1500)
  }

  // Enable 2FA
  const handleEnable2FA = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage("Two-factor authentication has been enabled.")
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been enabled for your account.",
      })

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              {previewUrl ? (
                <AvatarImage src={previewUrl || "/placeholder.svg"} alt="Profile" />
              ) : profilePicture ? (
                <AvatarImage src={profilePicture || "/placeholder.svg"} alt="Profile" />
              ) : (
                <AvatarImage src="/placeholder.svg" alt="Profile" />
              )}
              <AvatarFallback>
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground">{user.jobTitle}</p>
            <div className="w-full mt-4 space-y-2">
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Email</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Phone</span>
                <span>{user.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Company</span>
                <span>{user.company}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Joined</span>
                <span>January 15, 2023</span>
              </div>
            </div>
            <Button className="mt-6 w-full" onClick={() => setActiveTab("account")}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleAccountSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" value={accountForm.firstName} onChange={handleAccountChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={accountForm.lastName} onChange={handleAccountChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={accountForm.email} onChange={handleAccountChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={accountForm.phone} onChange={handleAccountChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" value={accountForm.company} onChange={handleAccountChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input id="jobTitle" value={accountForm.jobTitle} onChange={handleAccountChange} />
                      </div>
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Update your profile picture</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <Avatar className="h-24 w-24">
                      {previewUrl ? (
                        <AvatarImage src={previewUrl || "/placeholder.svg"} alt="Profile" />
                      ) : profilePicture ? (
                        <AvatarImage src={profilePicture || "/placeholder.svg"} alt="Profile" />
                      ) : (
                        <AvatarImage src="/placeholder.svg" alt="Profile" />
                      )}
                      <AvatarFallback>
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-1">
                      <Input id="profile-picture" type="file" accept="image/*" onChange={handleProfilePictureChange} />
                      <p className="text-xs text-muted-foreground">
                        Accepted formats: JPG, PNG. Maximum file size: 2MB.
                      </p>
                    </div>
                    <Button onClick={handleUploadPicture} disabled={!previewUrl || isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Upload"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSecuritySubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={handleSecurityChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={securityForm.newPassword}
                        onChange={handleSecurityChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={securityForm.confirmPassword}
                        onChange={handleSecurityChange}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      {successMessage ? (
                        <div className="flex items-center text-green-600 mb-2">
                          <Check className="h-5 w-5 mr-1" />
                          <p className="font-medium">{successMessage}</p>
                        </div>
                      ) : (
                        <p className="font-medium">Two-factor authentication is not enabled yet.</p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Two-factor authentication adds an extra layer of security to your account by requiring more than
                        just a password to sign in.
                      </p>
                    </div>
                    <Button onClick={handleEnable2FA} disabled={isLoading || !!successMessage}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enabling...
                        </>
                      ) : (
                        "Enable Two-Factor Authentication"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handlePreferencesSubmit}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notificationPreferences.emailNotifications}
                          onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-muted-foreground">Receive updates on order status changes</p>
                        </div>
                        <Switch
                          checked={notificationPreferences.orderUpdates}
                          onCheckedChange={() => handleNotificationToggle("orderUpdates")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Inventory Alerts</p>
                          <p className="text-sm text-muted-foreground">Get notified when inventory is low</p>
                        </div>
                        <Switch
                          checked={notificationPreferences.inventoryAlerts}
                          onCheckedChange={() => handleNotificationToggle("inventoryAlerts")}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                        </div>
                        <Switch
                          checked={notificationPreferences.marketingEmails}
                          onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                        />
                      </div>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Preferences"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                  <CardDescription>Customize your display settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handlePreferencesSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="w-full p-2 border rounded-md"
                          value={displayPreferences.language}
                          onChange={handleDisplayChange}
                        >
                          <option value="en">English</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="es">Spanish</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                          id="timezone"
                          className="w-full p-2 border rounded-md"
                          value={displayPreferences.timezone}
                          onChange={handleDisplayChange}
                        >
                          <option value="utc">UTC</option>
                          <option value="est">Eastern Time (ET)</option>
                          <option value="cst">Central Time (CT)</option>
                          <option value="pst">Pacific Time (PT)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <select
                          id="dateFormat"
                          className="w-full p-2 border rounded-md"
                          value={displayPreferences.dateFormat}
                          onChange={handleDisplayChange}
                        >
                          <option value="mdy">MM/DD/YYYY</option>
                          <option value="dmy">DD/MM/YYYY</option>
                          <option value="ymd">YYYY/MM/DD</option>
                        </select>
                      </div>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Preferences"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent account activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="font-medium">Logged in</p>
                      <p className="text-sm text-muted-foreground">Today at 9:30 AM • New York, USA</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-medium">Updated inventory</p>
                      <p className="text-sm text-muted-foreground">Yesterday at 2:15 PM</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4 py-2">
                      <p className="font-medium">Created new order</p>
                      <p className="text-sm text-muted-foreground">Yesterday at 11:30 AM</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <p className="font-medium">Added new customer</p>
                      <p className="text-sm text-muted-foreground">May 20, 2023 at 3:45 PM</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <p className="font-medium">Password changed</p>
                      <p className="text-sm text-muted-foreground">May 18, 2023 at 10:20 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>Recent login attempts to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Successful login</p>
                        <p className="text-sm text-muted-foreground">Today at 9:30 AM • Chrome • Windows</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Success</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Successful login</p>
                        <p className="text-sm text-muted-foreground">Yesterday at 5:45 PM • Safari • macOS</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Success</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Failed login attempt</p>
                        <p className="text-sm text-muted-foreground">May 19, 2023 at 8:12 AM • Unknown • Android</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Failed</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Successful login</p>
                        <p className="text-sm text-muted-foreground">May 18, 2023 at 2:30 PM • Firefox • Windows</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Success</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
