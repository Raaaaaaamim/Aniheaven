import { motion } from "framer-motion";
import React from "react";

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-1 md:gap-2 px-3 md:px-6 py-3 md:py-4 transition-all ${
      active ? "text-primary" : "text-white/70 hover:text-white"
    }`}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-linear-to-t from-primary/10 to-transparent via-transparent  backdrop-blur-xs border-b-2 border-primary"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className="relative z-10 text-base md:text-lg">{icon}</span>
    <span className="relative z-10 font-medium text-sm md:text-base whitespace-nowrap">
      {label}
    </span>
  </button>
);

export default TabButton;
