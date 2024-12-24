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

export interface SortOption {
  field: keyof Font
  direction: 'asc' | 'desc'
}

export interface SelectedFields {
  [key in keyof Font]: boolean
}

