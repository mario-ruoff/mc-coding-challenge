import * as React from "react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type Data = {
  id: number
  label: string
  category: "pending" | "processing" | "success" | "failed"
  note: string
  user_value: number
  system_value: number
  name: string
}

const columns = [
	{ key: "label", label: "Label", sortable: true },
	{ key: "category", label: "Category" },
	{ key: "user_value", label: "User Value", sortable: true },
	{ key: "system_value", label: "System Value", sortable: true },
	{ key: "note", label: "Note" },
]

export function DataTable({ data }: { data: Data[] }) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortColumn, setSortColumn] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")

  // Filter
  const filteredData = data.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData
    return filteredData.slice().sort((a, b) => {
      const aVal = a[sortColumn as keyof Data]
      const bVal = b[sortColumn as keyof Data]
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortColumn, sortDirection])

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(key)
      setSortDirection("asc")
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by label"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(col => (
                <TableHead key={col.key}>
                  {col.sortable ? (
                    <Button variant="ghost" onClick={() => handleSort(col.key)}>
                      {col.label} <ArrowUpDown />
                    </Button>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length ? (
              sortedData.map(row => (
                <TableRow key={row.id}>
                  {columns.map(col => (
                    <TableCell key={col.key}>
                      {row[col.key as keyof Data] ?? ""}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
