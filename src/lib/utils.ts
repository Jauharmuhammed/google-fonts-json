import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Font, FilterOptions, SortOption, SelectedFields } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterFonts(fonts: Font[], filters: FilterOptions): Font[] {
  return fonts.filter((font) => {
    if (
      filters.search &&
      !font.family.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.category && font.category !== filters.category) {
      return false;
    }
    if (filters.subset && !font.subsets.includes(filters.subset)) {
      return false;
    }
    if (filters.variant && !font.variants.includes(filters.variant)) {
      return false;
    }
    return true;
  });
}

export function sortFonts(fonts: Font[], sort: SortOption): Font[] {
  return [...fonts].sort((a, b) => {
    const aValue = a[sort.field];
    const bValue = b[sort.field];

    if (Array.isArray(aValue) && Array.isArray(bValue)) {
      const comparison = aValue.join(",").localeCompare(bValue.join(","));
      return sort.direction === "asc" ? comparison : -comparison;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      const comparison = aValue.localeCompare(bValue);
      return sort.direction === "asc" ? comparison : -comparison;
    }

    return 0;
  });
}

export function filterFields(
  fonts: Font[],
  selectedFields: SelectedFields
): Partial<Font>[] {
  return fonts.map((font) => {
    const filteredFont: Partial<Font> = {};
    Object.entries(selectedFields).forEach(([field, isSelected]) => {
      if (isSelected) {
        filteredFont[field as keyof Font] = font[field as keyof Font];
      }
    });
    return filteredFont;
  });
}

export function downloadJson(data: any, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}