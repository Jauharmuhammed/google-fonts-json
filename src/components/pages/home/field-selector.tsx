"use client";

import * as React from "react";
import { ListIcon } from "lucide-react";
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
        <Button variant="outline" size={"icon"}>
          <ListIcon className="h-4 w-4" />
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
            {field}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
