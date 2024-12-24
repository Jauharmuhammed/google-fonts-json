'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FilterOptions } from "@/lib/types"
import { Combobox } from "../../ui/combobox"

interface FilterSectionProps {
  categories: string[]
  subsets: string[]
  variants: string[]
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
}

export function FilterSection({
  categories = [],
  subsets = [],
  variants = [],
  filters,
  onFilterChange,
}: FilterSectionProps) {
  // Transform subsets array into the required format
  const subsetOptions = subsets.map(subset => ({
    value: subset,
    label: subset
  }));

  return (
    <div className="flex items-center gap-4">
      <Input
        placeholder="Search fonts..."
        value={filters.search || ''}
        onChange={(e) =>
          onFilterChange({ ...filters, search: e.target.value })
        }
        className="w-[200px]"
      />
      <Select
        value={filters.category || ''}
        onValueChange={(value) =>
          onFilterChange({ ...filters, category: value === 'all' ? undefined : value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Combobox
        options={subsetOptions}
        value={filters.subset || ''}
        onChange={(value) => 
          onFilterChange({ ...filters, subset: value === 'all' ? undefined : value })
        }
        placeholder="Select subset"
      />
      <Select
        value={filters.variant || ''}
        onValueChange={(value) =>
          onFilterChange({ ...filters, variant: value === 'all' ? undefined : value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select variant" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Variants</SelectItem>
          {variants.map((variant) => (
            <SelectItem key={variant} value={variant}>
              {variant}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

