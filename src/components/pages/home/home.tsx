"use client";

import { useState, useTransition } from "react";
import { FilterOptions, Font, SelectedFields, GoogleFontSort } from "@/lib/types";
import { filterFonts, filterFields } from "@/lib/utils";
import { FilterSection } from "./filter-section";
import { SortSection } from "./sort-section";
import { FieldSelector } from "./field-selector";
import Preview from "./preview";
import Navbar from "./navbar";
import Footer from "./footer";
import { useRouter, useSearchParams } from 'next/navigation';

interface HomeProps {
  initialFonts: Font[];
  categories: string[];
  subsets: string[];
  variants: string[];
  initialSort: GoogleFontSort;
}

export default function Home({ 
  initialFonts, 
  categories, 
  subsets, 
  variants,
  initialSort 
}: HomeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useState<FilterOptions>({});
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

  const handleSortChange = (sort: GoogleFontSort) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('sort', sort);
      router.push(`/?${params.toString()}`);
    });
  };

  const filteredFonts = filterFonts(initialFonts, filters);
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
          <SortSection 
            value={searchParams.get('sort') as GoogleFontSort || initialSort} 
            onChange={handleSortChange}
            isLoading={isPending} 
          />
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
      <Footer totalData={initialFonts} data={finalData} filteredData={filteredFonts} />
    </div>
  );
}
