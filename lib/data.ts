// This file contains functions to fetch and manipulate data for the dashboard

// Get sales data for charts
export async function getSalesData() {
  // In a real app, this would fetch from an API or database
  // For demo purposes, we'll return mock data
  return {
    daily: [
      { day: "Mon", sales: 150 },
      { day: "Tue", sales: 230 },
      { day: "Wed", sales: 224 },
      { day: "Thu", sales: 218 },
      { day: "Fri", sales: 335 },
      { day: "Sat", sales: 247 },
      { day: "Sun", sales: 190 },
    ],
    monthly: [
      { month: "Jan", sales: 1234 },
      { month: "Feb", sales: 2342 },
      { month: "Mar", sales: 3453 },
      { month: "Apr", sales: 2345 },
      { month: "May", sales: 3423 },
      { month: "Jun", sales: 2345 },
      { month: "Jul", sales: 3456 },
      { month: "Aug", sales: 4567 },
      { month: "Sep", sales: 4234 },
      { month: "Oct", sales: 4321 },
      { month: "Nov", sales: 3456 },
      { month: "Dec", sales: 3445 },
    ],
    yearly: [
      { year: "2019", sales: 25234 },
      { year: "2020", sales: 27384 },
      { year: "2021", sales: 32432 },
      { year: "2022", sales: 34534 },
      { year: "2023", sales: 38345 },
    ],
  }
}

// Get sales by category data for pie chart
export async function getSalesByCategoryData() {
  // In a real app, this would fetch from an API or database
  // For demo purposes, we'll return mock data
  return [
    { category: "Electronics", value: 35 },
    { category: "Clothing", value: 25 },
    { category: "Home & Kitchen", value: 20 },
    { category: "Books", value: 15 },
    { category: "Other", value: 5 },
  ]
}

// Get recent sales data
export async function getRecentSales() {
  // In a real app, this would fetch from an API or database
  // For demo purposes, we'll return mock data
  return [
    {
      id: "ORD001",
      customer: "John Doe",
      email: "john.doe@example.com",
      amount: 1299.99,
      date: "2023-05-15",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      email: "jane.smith@example.com",
      amount: 249.99,
      date: "2023-05-16",
    },
    {
      id: "ORD003",
      customer: "Robert Johnson",
      email: "robert.johnson@example.com",
      amount: 549.97,
      date: "2023-05-17",
    },
    {
      id: "ORD004",
      customer: "Emily Brown",
      email: "emily.brown@example.com",
      amount: 1899.98,
      date: "2023-05-18",
    },
    {
      id: "ORD005",
      customer: "Michael Wilson",
      email: "michael.wilson@example.com",
      amount: 99.99,
      date: "2023-05-19",
    },
  ]
}

// Get dashboard summary data
export async function getDashboardSummary() {
  // In a real app, this would fetch from an API or database
  // For demo purposes, we'll return mock data
  return {
    totalRevenue: 45231.89,
    revenueGrowth: 20.1,
    newCustomers: 2350,
    customerGrowth: 18.2,
    totalSales: 12234,
    salesGrowth: 12.2,
    inventoryItems: 12532,
    inventoryGrowth: -2.5,
  }
}
