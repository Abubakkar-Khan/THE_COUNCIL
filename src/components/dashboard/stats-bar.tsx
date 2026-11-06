"use client";

import { motion } from "motion/react";
import { Users, Swords, Scale, Zap } from "lucide-react";

interface StatsBarProps {
  totalPersonas: number;
  totalDebates: number;
  completedDebates: number;
}

export function StatsBar({ totalPersonas, totalDebates, completedDebates }: StatsBarProps) {
  const stats = [
    {
      label: "Active Agents",
      value: String(totalPersonas).padStart(2, "0"),
      unit: "ROSTER",
      color: "text-[#ECEFF4]",
      icon: Users,
    },
    {
      label: "Debates Run",
      value: String(totalDebates).padStart(2, "0"),
      unit: "SESSIONS",
      color: "text-[#FF6E26]",
      icon: Swords,
    },
    {
      label: "Verdicts Sealed",
      value: String(completedDebates).padStart(2, "0"),
      unit: "DECISIONS",
      color: "text-[#ECEFF4]",
      icon: Scale,
    },
    {
      label: "Resolution",
      value: totalDebates > 0 ? `${Math.round((completedDebates / totalDebates) * 100)}%` : "100%",
      unit: "EFFICACY",
      color: "text-[#FF6E26]",
      icon: Zap,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 select-none font-mono-code">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: i * 0.04 }}
          className="p-3.5 border border-[#1E2228] bg-[#0E1013] hover:border-[#FF6E26]/50 transition-colors"
        >
          <div className="flex items-center justify-between text-[#8B949E] text-[11px] mb-2 font-mono">
            <span>// {stat.label.toUpperCase()}</span>
            <stat.icon className="h-3 w-3 text-[#525A66]" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${stat.color} tracking-tight font-mono`}>
              {stat.value}
            </span>
            <span className="text-[10px] text-[#525A66] font-mono">
              {stat.unit}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
