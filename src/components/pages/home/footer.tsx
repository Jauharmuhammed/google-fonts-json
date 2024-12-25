import { formatFileSize } from "@/lib/utils";
import React from "react";

type Props = {
  totalData: any;
  data: any;
  filteredData: any;
};

function footer({ totalData, data, filteredData }: Props) {
  // Calculate JSON size with proper formatting
  const jsonString = JSON.stringify(data, null, 2); // Use same formatting as download
  const byteSize = new Blob([jsonString]).size;
  const formattedSize = formatFileSize(byteSize);

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {totalData.length} fonts
      </p>
      <p className="text-sm text-muted-foreground">
        JSON Size ≈ {byteSize.toLocaleString(navigator.language)} bytes (
        {formattedSize} on disk)
      </p>
    </div>
  );
}

export default footer;