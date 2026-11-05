import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-xs border border-[#2A2E33] bg-[#0C0D0E] px-3 py-1.5 text-xs font-mono-code text-[#F0F3F6] placeholder:text-[#5A626C] transition-colors focus-visible:outline-none focus-visible:border-[#FF5722] disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
