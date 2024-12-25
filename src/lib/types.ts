export interface Font {
  family: string
  variants: string[]
  subsets: string[]
  version: string
  lastModified: string
  files: Record<string, string>
  category: string
  kind: string
}

export interface FontsData {
  kind: string
  items: Font[]
}

export interface FilterOptions {
  category?: string
  subset?: string
  variant?: string
  search?: string
}

export type GoogleFontSort = 'alpha' | 'date' | 'popularity' | 'style' | 'trending';

export interface SortOption {
  value: GoogleFontSort;
  label: string;
}

export type SelectedFields = {
  [K in keyof Font]: boolean;
};

export interface GoogleFontsResponse {
  kind: string;
  items: Font[];
}

