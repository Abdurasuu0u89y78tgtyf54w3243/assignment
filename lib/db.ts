// Replace the SQLite implementation with a browser-compatible in-memory store

// Types
interface User {
  id: string
  name: string
  email: string
  password: string
}

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: string
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  status: string
}

interface Order {
  id: string
  customerId: string
  customer: string
  date: string
  amount: number
  items: number
  status: string
}

// In-memory database
class InMemoryDB {
  private users: User[] = []
  private products: Product[] = []
  private customers: Customer[] = []
  private orders: Order[] = []

  constructor() {
    this.seedData()
  }

  private seedData() {
    // Seed users
    this.users.push({
      id: "user1",
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    })

    // Add more seed data as needed
    // Products, customers, and orders are already defined in their respective components
  }

  // User operations
  async getUser(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    const id = `user_${Date.now()}`
    const newUser = { id, ...user }
    this.users.push(newUser)
    return newUser
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return this.products
  }

  // Customer operations
  async getCustomers(): Promise<Customer[]> {
    return this.customers
  }

  // Order operations
  async getOrders(): Promise<Order[]> {
    return this.orders
  }
}

// Create and export database instance
const dbInstance = new InMemoryDB()
export const db = dbInstance
