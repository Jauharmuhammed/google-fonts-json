"use client";

import * as React from "react";
import { ChevronsUpDown, Settings2 } from "lucide-react";
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
import { toSentenceCase } from "@/lib/utils";

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
        <Button variant="outline">
          <Settings2 className="size-4" />
          View
          <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Toggle Fields</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(selectedFields).map(([field, isSelected]) => (
          <DropdownMenuCheckboxItem
            key={field}
            checked={isSelected}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={() => onFieldChange(field as keyof SelectedFields)}
          >
            {toSentenceCase(field)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
