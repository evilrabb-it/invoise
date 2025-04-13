"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LanguageProvider } from "@/components/language-context"

// Mock client data
const clients = [
  {
    id: "1",
    name: "Acme Inc.",
    email: "accounting@acmeinc.com",
    phone: "(555) 987-6543",
    address: "456 Client Ave, New York, NY 10001",
    totalInvoiced: 4500.0,
    activeInvoices: 2,
  },
  {
    id: "2",
    name: "Globex Corp",
    email: "billing@globexcorp.com",
    phone: "(555) 123-4567",
    address: "789 Corporate Blvd, Chicago, IL 60601",
    totalInvoiced: 1750.0,
    activeInvoices: 1,
  },
  {
    id: "3",
    name: "Stark Industries",
    email: "finance@starkindustries.com",
    phone: "(555) 555-5555",
    address: "1 Stark Tower, Manhattan, NY 10010",
    totalInvoiced: 3200.0,
    activeInvoices: 1,
  },
  {
    id: "4",
    name: "Wayne Enterprises",
    email: "accounts@wayneenterprises.com",
    phone: "(555) 888-9999",
    address: "1007 Mountain Drive, Gotham, NJ 07001",
    totalInvoiced: 4500.0,
    activeInvoices: 0,
  },
  {
    id: "5",
    name: "Umbrella Corp",
    email: "finance@umbrellacorp.com",
    phone: "(555) 777-8888",
    address: "123 Raccoon St, Raccoon City, RC 90210",
    totalInvoiced: 1200.0,
    activeInvoices: 1,
  },
]

function ClientsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Client Management</h1>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[320px]"
            />
          </div>
          <Button asChild className="gap-1">
            <Link href="/clients/new">
              <Plus className="h-4 w-4" />
              Add Client
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
            <CardDescription>Manage your client information and view invoice history.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Address</TableHead>
                  <TableHead className="text-right">Total Invoiced</TableHead>
                  <TableHead className="text-center">Active Invoices</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{client.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell max-w-[200px] truncate">{client.address}</TableCell>
                    <TableCell className="text-right">${client.totalInvoiced.toFixed(2)}</TableCell>
                    <TableCell className="text-center">{client.activeInvoices}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Create Invoice</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t py-6 text-center">
        <p className="text-emerald-600 font-medium">Developed by Aditya Akbar</p>
      </footer>
    </div>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <ClientsPage />
    </LanguageProvider>
  )
}
