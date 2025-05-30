"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"

// Types
export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company?: string
  address?: string
  orders: number
  status: "Active" | "Inactive"
}

export interface Order {
  id: string
  customer: string
  customerId?: string
  date: string
  amount: number
  items: number
  status: "Completed" | "Processing" | "Shipped" | "Cancelled"
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
}

type DataContextType = {
  customers: Customer[]
  orders: Order[]
  products: Product[]
  addCustomer: (customer: Omit<Customer, "id" | "orders">) => void
  addOrder: (order: Omit<Order, "id">) => void
  addProduct: (product: Omit<Product, "id">) => void
  updateCustomer: (id: string, customer: Partial<Customer>) => void
  updateOrder: (id: string, order: Partial<Order>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteCustomer: (id: string) => void
  deleteOrder: (id: string) => void
  deleteProduct: (id: string) => void
}

// Mock data
const initialCustomers: Customer[] = [
  {
    id: "CUST001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    orders: 12,
    status: "Active",
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    orders: 8,
    status: "Active",
  },
  {
    id: "CUST003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 234-5678",
    orders: 5,
    status: "Active",
  },
  {
    id: "CUST004",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    phone: "+1 (555) 876-5432",
    orders: 15,
    status: "Active",
  },
  {
    id: "CUST005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+1 (555) 345-6789",
    orders: 3,
    status: "Inactive",
  },
]

const initialOrders: Order[] = [
  {
    id: "ORD001",
    customer: "John Doe",
    customerId: "CUST001",
    date: "2023-05-15",
    amount: 1299.99,
    items: 3,
    status: "Completed",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    customerId: "CUST002",
    date: "2023-05-16",
    amount: 249.99,
    items: 1,
    status: "Completed",
  },
  {
    id: "ORD003",
    customer: "Robert Johnson",
    customerId: "CUST003",
    date: "2023-05-17",
    amount: 549.97,
    items: 2,
    status: "Processing",
  },
  {
    id: "ORD004",
    customer: "Emily Brown",
    customerId: "CUST004",
    date: "2023-05-18",
    amount: 1899.98,
    items: 4,
    status: "Completed",
  },
  {
    id: "ORD005",
    customer: "Michael Wilson",
    customerId: "CUST005",
    date: "2023-05-19",
    amount: 99.99,
    items: 1,
    status: "Cancelled",
  },
]

// Mock data for clothing products
const initialProducts: Product[] = [
  {
    id: "CLT001",
    name: "Premium Cotton T-Shirt",
    category: "T-Shirts",
    price: 29.99,
    stock: 120,
    status: "In Stock",
  },
  {
    id: "CLT002",
    name: "Slim Fit Jeans",
    category: "Pants",
    price: 59.99,
    stock: 85,
    status: "In Stock",
  },
  {
    id: "CLT003",
    name: "Wool Blend Sweater",
    category: "Sweaters",
    price: 79.99,
    stock: 32,
    status: "In Stock",
  },
  {
    id: "CLT004",
    name: "Leather Jacket",
    category: "Outerwear",
    price: 199.99,
    stock: 18,
    status: "Low Stock",
  },
  {
    id: "CLT005",
    name: "Summer Dress",
    category: "Dresses",
    price: 89.99,
    stock: 45,
    status: "In Stock",
  },
]

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { getCurrentUserId } = useAuth()
  const userId = getCurrentUserId()

  // Initialize state from localStorage or use initial data
  const [customers, setCustomers] = useState<Customer[]>(() => {
    if (typeof window !== "undefined" && userId) {
      const savedCustomers = localStorage.getItem(`erpCustomers_${userId}`)
      return savedCustomers ? JSON.parse(savedCustomers) : initialCustomers
    }
    return initialCustomers
  })

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== "undefined" && userId) {
      const savedOrders = localStorage.getItem(`erpOrders_${userId}`)
      return savedOrders ? JSON.parse(savedOrders) : initialOrders
    }
    return initialOrders
  })

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined" && userId) {
      const savedProducts = localStorage.getItem(`erpProducts_${userId}`)
      return savedProducts ? JSON.parse(savedProducts) : initialProducts
    }
    return initialProducts
  })

  // Update state when user changes
  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      const savedCustomers = localStorage.getItem(`erpCustomers_${userId}`)
      const savedOrders = localStorage.getItem(`erpOrders_${userId}`)
      const savedProducts = localStorage.getItem(`erpProducts_${userId}`)

      setCustomers(savedCustomers ? JSON.parse(savedCustomers) : initialCustomers)
      setOrders(savedOrders ? JSON.parse(savedOrders) : initialOrders)
      setProducts(savedProducts ? JSON.parse(savedProducts) : initialProducts)
    }
  }, [userId])

  // Save to localStorage when data changes
  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      localStorage.setItem(`erpCustomers_${userId}`, JSON.stringify(customers))
    }
  }, [customers, userId])

  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      localStorage.setItem(`erpOrders_${userId}`, JSON.stringify(orders))
    }
  }, [orders, userId])

  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      localStorage.setItem(`erpProducts_${userId}`, JSON.stringify(products))
    }
  }, [products, userId])

  // Generate a unique ID for new items
  const generateId = (prefix: string) => {
    const timestamp = new Date().getTime()
    const random = Math.floor(Math.random() * 1000)
    return `${prefix}${timestamp}${random}`.substring(0, 10)
  }

  // Customer operations
  const addCustomer = (customer: Omit<Customer, "id" | "orders">) => {
    const newCustomer: Customer = {
      ...customer,
      id: generateId("CUST"),
      orders: 0,
    }
    setCustomers((prev) => [...prev, newCustomer])
  }

  const updateCustomer = (id: string, customer: Partial<Customer>) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...customer } : c)))
  }

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id))
  }

  // Order operations
  const addOrder = (order: Omit<Order, "id">) => {
    const newOrder: Order = {
      ...order,
      id: generateId("ORD"),
    }
    setOrders((prev) => [...prev, newOrder])

    // Update customer order count
    if (order.customerId) {
      setCustomers((prev) => prev.map((c) => (c.id === order.customerId ? { ...c, orders: c.orders + 1 } : c)))
    }
  }

  const updateOrder = (id: string, order: Partial<Order>) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...order } : o)))
  }

  const deleteOrder = (id: string) => {
    const orderToDelete = orders.find((o) => o.id === id)
    setOrders((prev) => prev.filter((o) => o.id !== id))

    // Update customer order count
    if (orderToDelete?.customerId) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === orderToDelete.customerId ? { ...c, orders: Math.max(0, c.orders - 1) } : c)),
      )
    }
  }

  // Product operations
  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: generateId("INV"),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...product } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <DataContext.Provider
      value={{
        customers,
        orders,
        products,
        addCustomer,
        addOrder,
        addProduct,
        updateCustomer,
        updateOrder,
        updateProduct,
        deleteCustomer,
        deleteOrder,
        deleteProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
