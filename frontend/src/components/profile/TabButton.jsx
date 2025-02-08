import { motion } from "framer-motion";
import React from "react";

const TabButton = ({ active, onClick, icon, label, className }) => (
  <button
    onClick={onClick}
    className={`relative flex cursor-pointer items-center gap-1 px-3 py-3 transition-all md:gap-2 md:px-6 md:py-4 ${
      active ? "text-primary" : "text-white/70 hover:text-white"
    } ${className}`}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className="from-primary/10 border-primary absolute inset-0 border-b-2 bg-linear-to-t via-transparent to-transparent backdrop-blur-xs"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}

    <span className="relative z-10 text-base md:text-lg">{icon}</span>
    <span className="relative z-10 hidden text-sm font-medium whitespace-nowrap md:block md:text-base">
      {label}
    </span>
  </button>
);

export default TabButton;
