import * as React from "react"
import { ArrowUpDown, ChevronDown } from "lucide-react" // Added ChevronDown
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Data } from "@/types/data"
import { Category } from "@/types/category"
import { getEnumKeys, getTrueDict } from "@/lib/utils"

// Define table columns with properties
const columns = [
	{ key: "label", label: "Label", sortable: true },
	{ key: "category", label: "Category" },
	{ key: "user_value", label: "User Value", sortable: true },
	{ key: "system_value", label: "System Value", sortable: true },
	{ key: "note", label: "Note" },
]
const categoryOptions = getEnumKeys(Category)


export function DataTable({ data }: { data: Data[] }) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortColumn, setSortColumn] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc")
  const [categoryFilters, setCategoryFilters] = React.useState(getTrueDict(categoryOptions))

  // Filter content
  const filteredData = data.filter(item => {
    const matchesLabel = item.label.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilters[item.category] == true
    return matchesLabel && matchesCategory
  })

  // Sort content
  const sortedData = sortColumn
	? filteredData.slice().sort((a, b) => {
			const aVal = a[sortColumn as keyof Data]
			const bVal = b[sortColumn as keyof Data]
			if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
			if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
			return 0
	  })
  : filteredData

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")  // Swap sort direction
    } else {
      setSortColumn(key)
      setSortDirection("asc")
    }
  }

  // Display component
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
                <TableHead key={col.key} className="text-center">
                  {col.key === "category" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          Category <ChevronDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {categoryOptions.map(category => (
                          <DropdownMenuCheckboxItem
                            key={category}
                            // The checkbox is checked if this category is in the filters.
                            checked={categoryFilters[category] == true}
                            onCheckedChange={(checked) => {
                              const newFilters = { ...categoryFilters, [category]: checked }
                              setCategoryFilters(newFilters)
                            }}
                          >
                            {category}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : col.sortable ? (
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
                    <TableCell key={col.key} className="text-center">
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
