"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

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
  formatFileSize,
} from "@/lib/utils";
import { Download } from "lucide-react";
import { Loader } from "../../ui/loader";
import { FilterSection } from "./filter-section";
import { SortSection } from "./sort-section";
import { FieldSelector } from "./field-selector";
import JsonPreview from "./json-preview";
import { Card, CardContent } from "@/components/ui/card";
import Title from "./title";
import Preview from "./preview";

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
    version: true,
    lastModified: true,
    files: true,
    kind: true,
  });

  // Derived values
  const categories = Array.from(new Set(fonts.map((font) => font.category)));
  const subsets = Array.from(new Set(fonts.flatMap((font) => font.subsets)));
  const variants = Array.from(new Set(fonts.flatMap((font) => font.variants)));

  const filteredFonts = sortFonts(filterFonts(fonts, filters), sortOption);
  const finalData = filterFields(filteredFonts, selectedFields);

  // Calculate JSON size with proper formatting
  const jsonString = JSON.stringify(finalData, null, 2); // Use same formatting as download
  const byteSize = new Blob([jsonString]).size;
  const formattedSize = formatFileSize(byteSize);

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
    <div className="container h-svh flex flex-col overflow-y-clip mx-auto pb-4 pt-2 space-y-4">
      <Card>
        <CardContent className="flex items-center justify-between p-2 rounded">
          <Title className="ms-2" />
          <div className="flex items-center gap-4">
            <Button
              onClick={() => downloadJson(finalData, "google-fonts.json")}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-4 justify-between">
        <FilterSection
          categories={categories}
          subsets={subsets}
          variants={variants}
          filters={filters}
          onFilterChange={setFilters}
        />
        <div className="flex items-center gap-4">
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
        </div>
      </div>

      <Preview data={finalData} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredFonts.length} of {fonts.length} fonts
        </p>
        <p className="text-sm text-muted-foreground">
          JSON Size ≈ {byteSize.toLocaleString(navigator.language)} bytes (
          {formattedSize} on disk)
        </p>
      </div>
    </div>
  );
}
