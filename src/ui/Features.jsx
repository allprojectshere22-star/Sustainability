import React from "react";
import { motion } from "framer-motion";

export default function Features({ colors }) {
  const items = [
    {
      title: "Food Rescue Tracking",
      desc: "Monitor surplus food donations and ensure they reach local shelters efficiently.",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.white}
          strokeWidth="1.5"
        >
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: "Green Event Planner",
      desc: "Organize eco-friendly events with volunteer sign-ups, waste reduction, and sustainability metrics.",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.white}
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
        </svg>
      ),
    },
    {
      title: "Volunteer Coordination",
      desc: "Track volunteer participation, assign tasks, and manage community engagement efficiently.",
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.white}
          strokeWidth="1.5"
        >
          <circle cx="12" cy="8" r="3" />
          <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((it) => (
        <motion.div
          key={it.title}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 220 }}
          className="rounded-2xl p-6 shadow-xl"
          style={{ backgroundColor: colors.dark }} // dark blue card
        >
          <div className="mb-4">{it.icon}</div>
          <h4 className="text-xl font-semibold mb-2 text-white">{it.title}</h4>
          <p className="text-white/90">{it.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
