"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto border border-[#2A303A] bg-[#0E1013] shadow-2xl animate-in fade-in-0 zoom-in-95 font-mono"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1 p-5 pb-2 border-b border-[#1E2228]", className)} {...props} />;
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("font-mono font-bold text-sm text-[#ECEFF4]", className)} {...props} />;
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs font-mono text-[#8B949E]", className)} {...props} />;
}

function DialogContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-3", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex justify-end gap-2 p-4 pt-2 border-t border-[#1E2228]", className)} {...props} />;
}

function DialogClose({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute right-3.5 top-3.5 p-1 bg-[#0A0A0C] border border-[#2A303A] text-[#8B949E] hover:text-[#ECEFF4] hover:border-[#FF6E26] transition-colors cursor-pointer",
        className
      )}
      title="Close [ESC]"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  );
}

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose };
