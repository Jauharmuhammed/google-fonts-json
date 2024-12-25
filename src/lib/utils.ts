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

// export function sortFonts(fonts: Font[], sortOption: SortOption) {
//   ...
// }

export function filterFields(
  fonts: Font[],
  selectedFields: SelectedFields
): Partial<Font>[] {
  return fonts.map((font) => {
    const filteredFont: Partial<Font> = {};
    Object.entries(selectedFields).forEach(([field, isSelected]) => {
      if (isSelected) {
        filteredFont[field as keyof Font] = font[field as keyof Font] as any;
      }
    });
    return filteredFont;
  });
}

export async function downloadJson(data: Partial<Font>[], filename: string) {
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

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 KB";

  const kb = bytes / 1000;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  const mb = kb / 1000;
  return `${mb.toFixed(1)} MB`;
}

export function toSentenceCase(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}
