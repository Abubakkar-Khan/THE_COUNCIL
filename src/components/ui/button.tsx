import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "accent" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xs font-mono-code font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5722] disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
          {
            "bg-[#F0F3F6] text-[#0C0D0E] border-1.5 border-[#FFFFFF] shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#FF5722] hover:-translate-x-[0.5px] hover:-translate-y-[0.5px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none": variant === "default",
            "border-1.5 border-[#3D444D] bg-[#121417] text-[#F0F3F6] shadow-[2px_2px_0px_#000000] hover:border-[#F0F3F6] hover:shadow-[3px_3px_0px_#FF5722] hover:-translate-x-[0.5px] hover:-translate-y-[0.5px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none": variant === "outline",
            "bg-transparent text-[#8B949E] hover:text-[#F0F3F6] hover:bg-[#1A1D21] border border-transparent": variant === "ghost",
            "btn-tactile-accent font-pixel text-xs": variant === "accent",
            "bg-[#F43F5E] text-white border-1.5 border-[#F43F5E] shadow-[2px_2px_0px_#000000] hover:bg-[#E11D48] hover:shadow-[3px_3px_0px_#FFFFFF]": variant === "destructive",
          },
          {
            "h-7 px-2.5 text-[10px]": size === "sm",
            "h-9 px-3.5 text-xs": size === "md",
            "h-11 px-5 text-sm": size === "lg",
            "h-8 w-8 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
