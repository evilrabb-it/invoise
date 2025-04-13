import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSign, FileText } from "lucide-react"

export function InvoiceStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,546.00</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
              <ArrowUpIcon className="h-3 w-3" />
              +2.5%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,623.00</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
              <ArrowUpIcon className="h-3 w-3" />
              +18.2%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$3,287.00</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-rose-500 dark:text-rose-400 flex items-center gap-1">
              <ArrowDownIcon className="h-3 w-3" />
              -4.5%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
              <ArrowUpIcon className="h-3 w-3" />
              +12.2%
            </span>{" "}
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
