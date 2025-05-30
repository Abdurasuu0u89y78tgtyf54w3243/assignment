"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface SalesChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SalesChart({ className, ...props }: SalesChartProps) {
  // Mock data directly in the component
  const salesData = {
    daily: [65, 40, 80, 75, 90, 55, 70],
    monthly: [40, 30, 70, 80, 50, 90, 75, 85, 95, 60, 45, 70],
    yearly: [60, 75, 90, 85, 95],
  }

  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Monthly sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="yearly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="space-y-4">
            <div className="h-[300px]">
              <div className="h-full flex flex-col">
                <div className="flex-1 grid grid-cols-7 gap-2">
                  {salesData.daily.map((value, i) => (
                    <div key={i} className="flex flex-col justify-end">
                      <div className="bg-primary rounded-t-md w-full" style={{ height: `${value}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 mt-2 text-xs text-muted-foreground text-center">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[300px]">
              <div className="h-full flex flex-col">
                <div className="flex-1 grid grid-cols-12 gap-2">
                  {salesData.monthly.map((value, i) => (
                    <div key={i} className="flex flex-col justify-end">
                      <div className="bg-primary rounded-t-md w-full" style={{ height: `${value}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-12 gap-2 mt-2 text-xs text-muted-foreground text-center">
                  <div>Jan</div>
                  <div>Feb</div>
                  <div>Mar</div>
                  <div>Apr</div>
                  <div>May</div>
                  <div>Jun</div>
                  <div>Jul</div>
                  <div>Aug</div>
                  <div>Sep</div>
                  <div>Oct</div>
                  <div>Nov</div>
                  <div>Dec</div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="yearly" className="space-y-4">
            <div className="h-[300px]">
              <div className="h-full flex flex-col">
                <div className="flex-1 grid grid-cols-5 gap-2">
                  {salesData.yearly.map((value, i) => (
                    <div key={i} className="flex flex-col justify-end">
                      <div className="bg-primary rounded-t-md w-full" style={{ height: `${value}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2 mt-2 text-xs text-muted-foreground text-center">
                  <div>2019</div>
                  <div>2020</div>
                  <div>2021</div>
                  <div>2022</div>
                  <div>2023</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
