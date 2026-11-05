import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSymbol(name: string): string {
  const symbols = ["◆", "◇", "○", "●", "□", "■", "△", "▲", "▽", "▼", "◎", "◉", "⬡", "⬢", "◈", "◐", "◑", "◒", "◓"];
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return symbols[hash % symbols.length];
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getRoundLabel(round: number): string {
  switch (round) {
    case 1: return "Opening Statements";
    case 2: return "The Debate";
    case 3: return "Final Positions";
    default: return `Round ${round}`;
  }
}
