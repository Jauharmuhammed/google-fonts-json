"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Font, SortOption } from "@/lib/types";

interface SortSectionProps {
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function SortSection({ sortOption, onSortChange }: SortSectionProps) {
  const sortFields: Array<keyof Font> = ["family", "category", "lastModified"];

  return (
    <Select
      value={`${sortOption.field}-${sortOption.direction}`}
      onValueChange={(value) => {
        const [field, direction] = value.split("-") as [
          keyof Font,
          "asc" | "desc"
        ];
        onSortChange({ field, direction });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortFields.flatMap((field) => [
          <SelectItem key={`${field}-asc`} value={`${field}-asc`}>
            {field} (A-Z)
          </SelectItem>,
          <SelectItem key={`${field}-desc`} value={`${field}-desc`}>
            {field} (Z-A)
          </SelectItem>,
        ])}
      </SelectContent>
    </Select>
  );
}
