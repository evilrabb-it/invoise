"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Edit, Send } from "lucide-react"
import Link from "next/link"
import { LanguageProvider } from "@/components/language-context"

function InvoiceDetailPage({ params }) {
  // Mock data for the invoice
  const invoice = {
    id: params.id,
    invoiceNumber: params.id,
    status:
      params.id === "INV-001" || params.id === "INV-004" ? "paid" : params.id === "INV-003" ? "overdue" : "pending",
    issueDate: "2023-04-15",
    dueDate: "2023-05-15",
    sender: {
      name: "Your Company",
      address: "123 Business St",
      city: "San Francisco, CA 94103",
      email: "billing@yourcompany.com",
      phone: "(555) 123-4567",
    },
    client: {
      name: "Acme Inc.",
      address: "456 Client Ave",
      city: "New York, NY 10001",
      email: "accounting@acmeinc.com",
      phone: "(555) 987-6543",
    },
    items: [
      {
        id: "1",
        description: "Website Design",
        quantity: 1,
        unitPrice: 1200,
        taxRate: 8.5,
      },
      {
        id: "2",
        description: "Development Hours",
        quantity: 20,
        unitPrice: 150,
        taxRate: 8.5,
      },
      {
        id: "3",
        description: "Hosting (Annual)",
        quantity: 1,
        unitPrice: 300,
        taxRate: 8.5,
      },
    ],
    notes:
      "Payment is due within 30 days. Please make checks payable to Your Company or pay online at yourcompany.com/pay",
  }

  // Calculate totals
  const calculateTotals = () => {
    let subtotal = 0
    let tax = 0

    invoice.items.forEach((item) => {
      const lineSubtotal = item.quantity * item.unitPrice
      subtotal += lineSubtotal
      tax += lineSubtotal * (item.taxRate / 100)
    })

    const total = subtotal + tax

    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    }
  }

  const { subtotal, tax, total } = calculateTotals()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Invoice {invoice.invoiceNumber}</h1>
        <Badge
          variant={invoice.status === "paid" ? "outline" : invoice.status === "pending" ? "secondary" : "destructive"}
          className="ml-2"
        >
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </Badge>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button size="sm" className="gap-1">
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card className="mx-auto w-full max-w-4xl">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-3xl font-bold">INVOICE</h2>
                    <p className="text-muted-foreground">{invoice.invoiceNumber}</p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p>
                    <span className="font-medium">Issue Date:</span> {invoice.issueDate}
                  </p>
                  <p>
                    <span className="font-medium">Due Date:</span> {invoice.dueDate}
                  </p>
                  <div className="mt-2">
                    <Badge
                      variant={
                        invoice.status === "paid"
                          ? "outline"
                          : invoice.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-sm"
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Sender and Client Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <p className="text-sm font-medium mb-1">From:</p>
                  <h3 className="font-semibold">{invoice.sender.name}</h3>
                  <p>{invoice.sender.address}</p>
                  <p>{invoice.sender.city}</p>
                  <p>{invoice.sender.email}</p>
                  <p>{invoice.sender.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">To:</p>
                  <h3 className="font-semibold">{invoice.client.name}</h3>
                  <p>{invoice.client.address}</p>
                  <p>{invoice.client.city}</p>
                  <p>{invoice.client.email}</p>
                  <p>{invoice.client.phone}</p>
                </div>
              </div>

              {/* Line Items */}
              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-3">Items</h3>
                <div className="border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Description</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Qty</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Unit Price</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Tax</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {invoice.items.map((item) => {
                        const lineTotal = item.quantity * item.unitPrice
                        const lineTax = lineTotal * (item.taxRate / 100)
                        const lineTotalWithTax = lineTotal + lineTax

                        return (
                          <tr key={item.id}>
                            <td className="px-4 py-3">{item.description}</td>
                            <td className="px-4 py-3 text-right">{item.quantity}</td>
                            <td className="px-4 py-3 text-right">${item.unitPrice.toFixed(2)}</td>
                            <td className="px-4 py-3 text-right">{item.taxRate}%</td>
                            <td className="px-4 py-3 text-right">${lineTotalWithTax.toFixed(2)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="flex flex-col items-end space-y-1 pt-4">
                <div className="flex w-48 justify-between">
                  <p>Subtotal:</p>
                  <p className="font-medium">${subtotal}</p>
                </div>
                <div className="flex w-48 justify-between">
                  <p>Tax:</p>
                  <p className="font-medium">${tax}</p>
                </div>
                <div className="flex w-48 justify-between border-t pt-2 mt-1">
                  <p className="font-medium">Total:</p>
                  <p className="font-bold">${total}</p>
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-muted-foreground">{invoice.notes}</p>
                </div>
              )}

              {/* Payment Actions */}
              {invoice.status !== "paid" && (
                <div className="pt-4 border-t flex justify-end">
                  <Button className="gap-1">Mark as Paid</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t py-6 text-center">
        <p className="text-emerald-600 font-medium">Developed by Aditya Akbar</p>
      </footer>
    </div>
  )
}

export default function Page({ params }) {
  return (
    <LanguageProvider>
      <InvoiceDetailPage params={params} />
    </LanguageProvider>
  )
}
