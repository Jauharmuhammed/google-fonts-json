"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import JsonPreview from "./json-preview";

type Props = {
  data: any;
};

function Preview({ data }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setIsCopied(true);
    toast.success("JSON copied to clipboard");

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden p-2 md:p-4 pt-2 border rounded-lg bg-card">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm md:text-lg font-semibold">Preview</h2>
        <Button variant="outline" size="icon" onClick={handleCopy}>
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <JsonPreview data={data} />
    </div>
  );
}

export default Preview;
