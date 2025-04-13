import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const invoices = [
  {
    id: "INV-001",
    client: "Acme Inc.",
    issueDate: "2023-04-10",
    dueDate: "2023-05-10",
    total: 2500.0,
    status: "paid",
  },
  {
    id: "INV-002",
    client: "Globex Corp",
    issueDate: "2023-04-15",
    dueDate: "2023-05-15",
    total: 1750.0,
    status: "pending",
  },
  {
    id: "INV-003",
    client: "Stark Industries",
    issueDate: "2023-04-20",
    dueDate: "2023-05-20",
    total: 3200.0,
    status: "overdue",
  },
  {
    id: "INV-004",
    client: "Wayne Enterprises",
    issueDate: "2023-04-25",
    dueDate: "2023-05-25",
    total: 4500.0,
    status: "paid",
  },
  {
    id: "INV-005",
    client: "Umbrella Corp",
    issueDate: "2023-04-30",
    dueDate: "2023-05-30",
    total: 1200.0,
    status: "pending",
  },
]

export function InvoiceTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>{invoice.issueDate}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell className="text-right">${invoice.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    invoice.status === "paid" ? "outline" : invoice.status === "pending" ? "secondary" : "destructive"
                  }
                >
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/invoices/${invoice.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                      <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
