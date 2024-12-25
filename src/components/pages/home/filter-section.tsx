"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOptions } from "@/lib/types";
import { Combobox } from "../../ui/combobox";
import { cn, toSentenceCase } from "@/lib/utils";

interface FilterSectionProps {
  categories: string[];
  subsets: string[];
  variants: string[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
  hideSearch?: boolean;
  hideFilters?: boolean;
}

export function FilterSection({
  categories = [],
  subsets = [],
  variants = [],
  filters,
  onFilterChange,
  className,
  hideSearch = false,
  hideFilters = false,
}: FilterSectionProps) {
  // Transform subsets array into the required format
  const subsetOptions = subsets.map((subset) => ({
    value: subset,
    label: toSentenceCase(subset),
  }));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {!hideSearch && (
        <Input
          placeholder="Search fonts..."
          value={filters.search || ""}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          className="w-[200px]"
        />
      )}
      {!hideFilters && (
        <>
          <Select
            value={filters.category || ""}
            onValueChange={(value) =>
              onFilterChange({
                ...filters,
                category: value === "all" ? undefined : value,
              })
            }
          >
            <SelectTrigger className={cn("w-[180px]", hideSearch && "w-full")}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {toSentenceCase(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Combobox
            options={subsetOptions}
            value={filters.subset || ""}
            onChange={(value) =>
              onFilterChange({
                ...filters,
                subset: value === "all" ? undefined : value,
              })
            }
            placeholder="Select subset"
            className={hideSearch ? "w-full" : undefined}
            width={hideSearch ? "w-[254px]" : "w-[200px]"}
          />
          <Select
            value={filters.variant || ""}
            onValueChange={(value) =>
              onFilterChange({
                ...filters,
                variant: value === "all" ? undefined : value,
              })
            }
          >
            <SelectTrigger className={cn("w-[180px]", hideSearch && "w-full")}>
              <SelectValue placeholder="Select variant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Variants</SelectItem>
              {variants.map((variant) => (
                <SelectItem key={variant} value={variant}>
                  {toSentenceCase(variant)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
}
