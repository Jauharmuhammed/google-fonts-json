"use client";

import { Loader } from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoogleFontSort } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SortSectionProps {
  value: GoogleFontSort;
  onChange: (value: GoogleFontSort) => void;
  isLoading?: boolean;
  className?: string;
}

const sortOptions: { value: GoogleFontSort; label: string }[] = [
  { value: "alpha", label: "Alphabetical" },
  { value: "date", label: "Date Added" },
  { value: "popularity", label: "Popularity" },
  { value: "style", label: "Style Count" },
  { value: "trending", label: "Trending" },
];

export function SortSection({
  value,
  onChange,
  isLoading = false,
  className,
}: SortSectionProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("min-w-[180px]", className)}>
        <SelectValue placeholder="Sort by" />
        {isLoading && <Loader className="ms-auto opacity-50" />}
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
