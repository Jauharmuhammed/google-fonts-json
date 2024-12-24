"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterSection } from "@/components/filter-section";
import { FieldSelector } from "@/components/field-selector";
import { SortSection } from "@/components/sort-section";
import {
  FilterOptions,
  Font,
  FontsData,
  SelectedFields,
  SortOption,
} from "@/lib/types";
import { fetchGoogleFonts } from "@/app/actions";
import {
  filterFonts,
  sortFonts,
  filterFields,
  downloadJson,
} from "@/lib/utils";
import { Download } from "lucide-react";
import { Loader } from "../ui/loader";

export default function Home() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortOption, setSortOption] = useState<SortOption>({
    field: "family",
    direction: "asc",
  });
  const [selectedFields, setSelectedFields] = useState<SelectedFields>({
    family: true,
    category: true,
    variants: true,
    subsets: true,
    version: false,
    lastModified: false,
    files: false,
    kind: false,
  });

  // Derived values
  const categories = Array.from(new Set(fonts.map((font) => font.category)));
  const subsets = Array.from(new Set(fonts.flatMap((font) => font.subsets)));
  const variants = Array.from(new Set(fonts.flatMap((font) => font.variants)));

  const filteredFonts = sortFonts(filterFonts(fonts, filters), sortOption);
  const finalData = filterFields(filteredFonts, selectedFields);

  useEffect(() => {
    async function loadFonts() {
      try {
        const data = await fetchGoogleFonts();
        setFonts(data.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load fonts");
      } finally {
        setLoading(false);
      }
    }
    loadFonts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-svh items-center justify-center">
        <Loader fullScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-destructive">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Google Fonts Explorer</h1>
        <div className="flex items-center gap-4">
          <FilterSection
            categories={categories}
            subsets={subsets}
            variants={variants}
            filters={filters}
            onFilterChange={setFilters}
          />
          <SortSection sortOption={sortOption} onSortChange={setSortOption} />
          <FieldSelector
            selectedFields={selectedFields}
            onFieldChange={(field) =>
              setSelectedFields((prev) => ({
                ...prev,
                [field]: !prev[field],
              }))
            }
          />
          <Button
            onClick={() => downloadJson(finalData, "google-fonts.json")}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download JSON
          </Button>
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-4">Preview</h2>
        <pre className="p-4 bg-muted rounded-lg overflow-auto max-h-[500px]">
          {JSON.stringify(finalData, null, 2)}
        </pre>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredFonts.length} of {fonts.length} fonts
      </div>
    </div>
  );
}
