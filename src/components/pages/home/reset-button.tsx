"use client";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface ResetButtonProps {
  className?: string;
  onResetFilters?: () => void;
  mini?: boolean;
}

function ResetButton({ className, onResetFilters, mini }: ResetButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    startTransition(() => {
      // Reset URL params (sorting)
      router.push("/");

      // Reset filters
      if (onResetFilters) {
        onResetFilters();

        toast.success("Filters resetted successfully");
      }
    });
  };

  // Don't show if nothing to reset
  if (!searchParams.has("sort") && !onResetFilters) {
    return null;
  }

  return (
    <Tooltip content="Reset">
      <Button
        variant="outline"
        className={cn("flex-shrink-0", className)}
        onClick={handleReset}
        disabled={isPending}
        size={mini ? "icon" : "default"}
      >
        <RotateCw
          className={cn({
            "animate-spin": isPending,
            "w-3 h-3 mr-0": mini,
          })}
        />
        {mini ? null : "Reset"}
      </Button>
    </Tooltip>
  );
}

export default ResetButton;
