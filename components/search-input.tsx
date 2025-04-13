"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="relative w-full max-w-[200px] md:max-w-xs">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search invoices..."
        className="w-full bg-background pl-8 md:w-[300px] lg:w-[320px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
