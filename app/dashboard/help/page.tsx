import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-muted-foreground">Find answers to your questions and get support</p>
      </div>

      <div className="relative max-w-2xl mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search for help articles..." className="pl-10 py-6 text-lg" />
        <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">Search</Button>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">How do I create a new order?</h3>
                  <p className="text-sm text-muted-foreground">
                    To create a new order, navigate to the Sales section and click on the "New Order" button. Fill in
                    the required information and click "Save" to create the order.
                  </p>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">How do I add a new product to inventory?</h3>
                  <p className="text-sm text-muted-foreground">
                    Go to the Inventory section and click on the "Add Product" button. Fill in the product details
                    including name, category, price, and stock quantity.
                  </p>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">How do I generate reports?</h3>
                  <p className="text-sm text-muted-foreground">
                    Reports can be generated from the Reports section. Select the type of report you want to generate,
                    specify the date range, and click "Generate Report".
                  </p>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">How do I manage user permissions?</h3>
                  <p className="text-sm text-muted-foreground">
                    User permissions can be managed in the Settings section under "User Management". You can assign
                    different roles to users which determine their access levels.
                  </p>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">How do I export data to Excel?</h3>
                  <p className="text-sm text-muted-foreground">
                    Most tables in the system have an "Export" button that allows you to export the data to Excel. Click
                    on this button and select your preferred format.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>Detailed guides to help you use the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">Getting Started Guide</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    A comprehensive guide to help you get started with the ERP system.
                  </p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">Inventory Management</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Learn how to effectively manage your inventory using the system.
                  </p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">Sales and Order Processing</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    A guide to managing sales and processing orders efficiently.
                  </p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">Customer Relationship Management</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Learn how to manage customer relationships and track interactions.
                  </p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">Reporting and Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    A guide to generating reports and analyzing business data.
                  </p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>

                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <h3 className="font-medium mb-1">System Administration</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Learn how to administer the system and manage users.
                  </p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>Learn through video demonstrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-200 h-40 flex items-center justify-center">
                    <div className="text-gray-500">Video Thumbnail</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Introduction to the ERP System</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      A quick overview of the ERP system and its features.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">5:32</span>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-200 h-40 flex items-center justify-center">
                    <div className="text-gray-500">Video Thumbnail</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Managing Inventory</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Learn how to add, edit, and track inventory items.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">8:45</span>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-200 h-40 flex items-center justify-center">
                    <div className="text-gray-500">Video Thumbnail</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Processing Sales Orders</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      A step-by-step guide to processing sales orders.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">7:12</span>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-200 h-40 flex items-center justify-center">
                    <div className="text-gray-500">Video Thumbnail</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Generating Reports</h3>
                    <p className="text-sm text-muted-foreground mb-2">Learn how to create and customize reports.</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">6:28</span>
                      <Button variant="outline" size="sm">
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Subject of your inquiry" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Describe your issue or question"
                    className="w-full p-2 border rounded-md"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachment">Attachment (optional)</Label>
                  <Input id="attachment" type="file" />
                </div>

                <Button>Submit Ticket</Button>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Other Ways to Reach Us</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">📞</div>
                    <h4 className="font-medium mb-1">Phone Support</h4>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                  </div>

                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">💬</div>
                    <h4 className="font-medium mb-1">Live Chat</h4>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Start Chat
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">📧</div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">support@erp-system.com</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({
  htmlFor,
  children,
  className = "",
}: { htmlFor?: string; children: React.ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium ${className}`}>
      {children}
    </label>
  )
}
