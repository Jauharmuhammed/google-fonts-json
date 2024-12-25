"use client";

import { useState } from "react";
import { FilterOptions, Font, SelectedFields, SortOption } from "@/lib/types";
import { filterFonts, sortFonts, filterFields } from "@/lib/utils";
import { FilterSection } from "./filter-section";
import { SortSection } from "./sort-section";
import { FieldSelector } from "./field-selector";
import Preview from "./preview";
import Navbar from "./navbar";
import Footer from "./footer";

interface HomeProps {
  initialFonts: Font[];
  categories: string[];
  subsets: string[];
  variants: string[];
}

export default function Home({ 
  initialFonts, 
  categories, 
  subsets, 
  variants 
}: HomeProps) {
  const [fonts] = useState<Font[]>(initialFonts);
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

  const filteredFonts = sortFonts(filterFonts(fonts, filters), sortOption);
  const finalData = filterFields(filteredFonts, selectedFields);

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
