import { SalesTable } from "@/components/sales-table"

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sales Management</h1>
      <SalesTable />
    </div>
  )
}
