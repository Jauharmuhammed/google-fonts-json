import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Loader = ({
  size = "sm",
  className,
  fullScreen = false,
}: Props) => {
  const sizeClass = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  if (fullScreen) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className={cn(sizeClass[size], "animate-spin", className)} />
      </div>
    );
  }

  return <Loader2 className={cn(sizeClass[size], "animate-spin", className)} />;
};
