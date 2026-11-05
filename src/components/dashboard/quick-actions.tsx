"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Plus, Users, Swords } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      code: "F1",
      title: "FORGE A VOICE",
      description: "Give life to a new perspective with unique psychological biases and principles",
      href: "/personas",
      badge: "+ NEW SOUL",
      icon: Plus,
      color: "text-[#38BDF8]",
    },
    {
      code: "F2",
      title: "CALIBRATE ROSTER",
      description: "Audit the 10 distinct human mindsets, from the Founder to the Philosopher",
      href: "/personas",
      badge: "10 MINDS",
      icon: Users,
      color: "text-[#A3E635]",
    },
    {
      code: "F3",
      title: "ENTER THE CHAMBER",
      description: "Pick your fighters, drop your dilemma, and watch them battle it out in real time",
      href: "/debates/new",
      badge: "⚔️ CLASH",
      icon: Swords,
      color: "text-[#FF5722]",
      highlight: true,
    },
  ];

  return (
    <div className="select-none font-mono-code">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-[9px] text-[#FF5722]">// PROTOCOLS</span>
          <span className="text-xs text-[#8B949E] tracking-wider uppercase font-semibold">
            INSTANT DISPATCH
          </span>
        </div>
        <span className="font-pixel text-[8px] text-[#5A626C]">TRIGGER [F1-F3]</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {actions.map((action, i) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
          >
            <Link
              href={action.href}
              className={`group block p-4 rounded-xs border transition-all ${
                action.highlight
                  ? "bg-[#171A1E] border-[#FF5722]/50 hover:border-[#FF5722] shadow-[2px_2px_0px_#FF5722] hover:-translate-x-[0.5px] hover:-translate-y-[0.5px]"
                  : "bg-[#121417] border-[#2A2E33] hover:border-[#3D444D] hover:bg-[#16191D] shadow-[2px_2px_0px_#000000] hover:-translate-x-[0.5px] hover:-translate-y-[0.5px]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel text-[8px] text-[#5A626C] group-hover:text-[#8B949E]">
                  [{action.code}]
                </span>
                <span
                  className={`font-pixel text-[8px] px-1.5 py-0.5 rounded-xs ${
                    action.highlight
                      ? "bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/40"
                      : "bg-[#1C1F23] text-[#8B949E] border border-[#2A2E33]"
                  }`}
                >
                  {action.badge}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <action.icon className={`h-4 w-4 ${action.color}`} />
                <h3 className="font-pixel text-[11px] text-[#F0F3F6] tracking-wide group-hover:text-[#FF5722] transition-colors">
                  {action.title}
                </h3>
              </div>

              <p className="text-[11px] text-[#8B949E] leading-relaxed line-clamp-2">
                {action.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
