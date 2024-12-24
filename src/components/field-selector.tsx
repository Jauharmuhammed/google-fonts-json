"use client";

import * as React from "react";
import { CheckSquare, ChevronsUpDown, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SelectedFields } from "@/lib/types";

interface FieldSelectorProps {
  selectedFields: SelectedFields;
  onFieldChange: (field: keyof SelectedFields) => void;
}

export function FieldSelector({
  selectedFields,
  onFieldChange,
}: FieldSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px]">
          Select Fields
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Toggle Fields</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(selectedFields).map(([field, isSelected]) => (
          <DropdownMenuCheckboxItem
            key={field}
            checked={isSelected}
            onCheckedChange={() => onFieldChange(field as keyof SelectedFields)}
          >
            {isSelected ? (
              <CheckSquare className="mr-2 h-4 w-4" />
            ) : (
              <Square className="mr-2 h-4 w-4" />
            )}
            {field}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
