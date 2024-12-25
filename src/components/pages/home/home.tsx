"use client";

import { useState, useTransition } from "react";
import {
  FilterOptions,
  Font,
  SelectedFields,
  GoogleFontSort,
} from "@/lib/types";
import { filterFonts, filterFields } from "@/lib/utils";
import { FilterSection } from "./filter-section";
import { SortSection } from "./sort-section";
import { FieldSelector } from "./field-selector";
import Preview from "./preview";
import Navbar from "./navbar";
import Footer from "./footer";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  ArrowDownWideNarrow,
  EllipsisVertical,
  FilterIcon,
  ListIcon,
} from "lucide-react";
import ResetButton from "./reset-button";
import { cn } from "@/lib/utils";

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
  initialSort,
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
      params.set("sort", sort);
      router.push(`/?${params.toString()}`);
    });
  };

  const handleResetFilters = () => {
    setFilters({});
    setSelectedFields({
      family: true,
      category: true,
      variants: true,
      subsets: true,
      version: true,
      lastModified: true,
      files: true,
      kind: true,
    });
  };

  const filteredFonts = filterFonts(initialFonts, filters);
  const finalData = filterFields(filteredFonts, selectedFields);

  return (
    <div className="container h-svh flex flex-col overflow-y-clip mx-auto pb-4 pt-2 space-y-4 px-2">
      <Navbar data={finalData} />

      <div className="hidden xl:flex items-center gap-2 justify-between">
        <FilterSection
          categories={categories}
          subsets={subsets}
          variants={variants}
          filters={filters}
          onFilterChange={setFilters}
        />
        <div className="flex items-center gap-2">
          <ResetButton onResetFilters={handleResetFilters} mini />
          <SortSection
            value={(searchParams.get("sort") as GoogleFontSort) || initialSort}
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

      <div className="flex xl:hidden justify-between">
        <FilterSection
          categories={categories}
          subsets={subsets}
          variants={variants}
          filters={filters}
          onFilterChange={setFilters}
          hideFilters={true}
        />

        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="icon">
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium flex items-center gap-2">
                <FilterIcon className="w-4 h-4" />
                Filters
              </p>
              <FilterSection
                categories={categories}
                subsets={subsets}
                variants={variants}
                filters={filters}
                onFilterChange={setFilters}
                hideSearch={true}
                className="flex flex-col gap-2"
              />

              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium flex items-center gap-2">
                  <ArrowDownWideNarrow className="w-4 h-4" />
                  Sort
                </p>
                <SortSection
                  value={
                    (searchParams.get("sort") as GoogleFontSort) || initialSort
                  }
                  onChange={handleSortChange}
                  isLoading={isPending}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium flex items-center gap-2">
                  <ListIcon className="w-4 h-4" />
                  Fields
                </p>
                <FieldSelector
                  selectedFields={selectedFields}
                  onFieldChange={(field) =>
                    setSelectedFields((prev) => ({
                      ...prev,
                      [field]: !prev[field],
                    }))
                  }
                  width="w-[254px]"
                />
              </div>

              <ResetButton
                className="w-full"
                onResetFilters={handleResetFilters}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Preview data={finalData} />
      <Footer
        totalData={initialFonts}
        data={finalData}
        filteredData={filteredFonts}
      />
    </div>
  );
}
