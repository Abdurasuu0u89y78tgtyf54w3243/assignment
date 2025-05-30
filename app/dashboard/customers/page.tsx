import { CustomersTable } from "@/components/customers-table"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customer Management</h1>
      <CustomersTable />
    </div>
  )
}
