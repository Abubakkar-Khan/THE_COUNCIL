import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "accent" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xs px-1.5 py-0.5 text-[9px] font-pixel transition-colors select-none",
        {
          "bg-[#1C1F23] text-[#F0F3F6] border border-[#2A2E33]": variant === "default",
          "border border-[#2A2E33] text-[#8B949E] bg-[#0C0D0E]": variant === "outline",
          "bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/40 shadow-[1px_1px_0px_#FF5722]": variant === "accent",
          "bg-[#A3E635]/15 text-[#A3E635] border border-[#A3E635]/40 text-[#A3E635]": variant === "success",
          "bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/40 text-[#FACC15]": variant === "warning",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
