"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SalesByCategoryProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SalesByCategory({ className, ...props }: SalesByCategoryProps) {
  // Placeholder data directly in the component
  const categories = [
    { name: "T-Shirts", value: 35, color: "bg-blue-500" },
    { name: "Pants", value: 25, color: "bg-green-500" },
    { name: "Sweaters", value: 15, color: "bg-yellow-500" },
    { name: "Outerwear", value: 15, color: "bg-purple-500" },
    { name: "Accessories", value: 10, color: "bg-gray-500" },
  ]

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>Distribution of sales across product categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Simple pie chart representation */}
          <div className="flex justify-center">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {/* This is a simplified representation - in a real app, you'd calculate the actual segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray="35 100"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray="25 100"
                  strokeDashoffset="-35"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#eab308"
                  strokeWidth="20"
                  strokeDasharray="15 100"
                  strokeDashoffset="-60"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#a855f7"
                  strokeWidth="20"
                  strokeDasharray="15 100"
                  strokeDashoffset="-75"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#6b7280"
                  strokeWidth="20"
                  strokeDasharray="10 100"
                  strokeDashoffset="-90"
                />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center">
                <div className={`h-3 w-3 rounded-full ${category.color} mr-2`} />
                <div className="flex-1 text-sm">{category.name}</div>
                <div className="text-sm font-medium">{category.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
