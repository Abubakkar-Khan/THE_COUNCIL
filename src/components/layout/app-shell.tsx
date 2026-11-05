"use client";

import { Sidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#ECEFF4] flex font-mono-code">
      {/* Left Column: Fixed Minimal Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 pl-56 flex flex-col min-h-screen w-full">
        <main className="flex-1 w-full min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
