"use client";

import { useEffect, useState } from "react";

import { FilterOptions, Font, SelectedFields, SortOption } from "@/lib/types";
import { fetchGoogleFonts } from "@/app/actions";
import { filterFonts, sortFonts, filterFields } from "@/lib/utils";
import { Loader } from "../../ui/loader";
import { FilterSection } from "./filter-section";
import { SortSection } from "./sort-section";
import { FieldSelector } from "./field-selector";
import Preview from "./preview";
import Navbar from "./navbar";
import Footer from "./footer";

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
      <Navbar data={finalData} />

      <div className="flex items-center gap-2 justify-between">
        <FilterSection
          categories={categories}
          subsets={subsets}
          variants={variants}
          filters={filters}
          onFilterChange={setFilters}
        />
        <div className="flex items-center gap-2">
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
      <Footer totalData={fonts} data={finalData} filteredData={filteredFonts} />
    </div>
  );
}
