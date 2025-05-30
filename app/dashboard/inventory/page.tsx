import { InventoryTable } from "@/components/inventory-table"

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      <InventoryTable />
    </div>
  )
}
