import { DashboardCards } from "@/components/dashboard-cards"
import { SalesChart } from "@/components/sales-chart"
import { RecentSales } from "@/components/recent-sales"
import { SalesByCategory } from "@/components/sales-by-category"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart className="md:col-span-2 lg:col-span-4" />
        <SalesByCategory className="md:col-span-2 lg:col-span-3" />
      </div>
      <RecentSales />
    </div>
  )
}
