import React from "react";

const Badge = ({ Icon, title, responsive }) => {
  return (
    <div
      className={`${
        responsive ? "2xl:text-sm" : "2xl:text-xs"
      } flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300`}
    >
      {Icon && <Icon className="text-[10px] sm:text-xs text-primary/90" />}
      <span className="text-[10px] sm:text-xs font-outfit">{title}</span>
    </div>
  );
};

export default Badge;
