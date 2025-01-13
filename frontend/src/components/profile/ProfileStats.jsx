import { motion } from "framer-motion";
import React from "react";
import { BiHeart, BiTime } from "react-icons/bi";

const AnimeStatCard = ({ type = "watchHours", value = 0 }) => {
  const config = {
    watchHours: {
      icon: BiTime,
      title: "Watch Time",
      suffix: "h",
      color: "primary",
    },
    favorites: {
      icon: BiHeart,
      title: "Favorites",
      suffix: "",
      color: "primary",
    },
  };

  const currentConfig = config[type];
  const Icon = currentConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-64"
    >
      <div className="bg-transparent border border-white/[0.05] rounded-2xl">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 ring-1 ring-primary/20">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-text/80">
                {currentConfig.title}
              </span>
            </div>
          </div>

          {/* Value */}
          <div>
            <div className="text-4xl font-semibold text-text mb-1">
              {value.toLocaleString()}
              {currentConfig.suffix}
            </div>
            <div className="flex items-center gap-2 text-text/50 text-sm">
              <motion.div
                className="inline-block w-2 h-2 bg-primary rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {type === "watchHours" ? "Active Streak" : "Collection Growing"}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeStatCard;
