import { motion } from "framer-motion";
import React from "react";
import { FiLock } from "react-icons/fi";
import { calculateCompletionPercentage } from "../../../lib/utils.js";
import { achievements, rarityConfig } from "../../config.js";
const AchievementCard = ({ xp, achievementName, onClick, isLocked }) => {
  const config = rarityConfig[achievementName];
  const {
    title,
    description,
    reward,
    xp: requiredXP,
  } = achievements[achievementName];
  const progress = calculateCompletionPercentage(xp, requiredXP);
  console.log(progress);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        opacity: { duration: 0.2 },
      }}
      onClick={onClick}
      className="group relative flex h-full flex-col justify-between p-4"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent opacity-20 transition-opacity duration-300 group-hover:opacity-30" />

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header Section */}
        <div className="mb-4 flex items-start justify-between">
          {/* Icon Container */}
          <div
            className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ${config.shadow} bg-gradient-to-br ${config.gradient} p-[1px]`}
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-[#0F0F0F]">
              {isLocked ? (
                <FiLock className="text-xl text-white/50 transition-all duration-300 group-hover:text-white/70" />
              ) : (
                <config.icon className="text-xl text-white transition-all duration-300 group-hover:scale-110" />
              )}
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </div>
          </div>

          {/* Rarity Badge */}
          <div
            className={`flex items-center gap-1.5 rounded-full bg-gradient-to-r ${config.gradient} px-2.5 py-1 text-xs font-medium text-white shadow-lg ${config.shadow}`}
          >
            <config.icon className="text-[10px]" />
            <span className="tracking-wide">{config.label}</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="mb-1.5 bg-gradient-to-r from-white to-white/90 bg-clip-text text-base font-semibold text-transparent">
            {title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-400/90">
            {description}
          </p>
        </div>

        {/* Progress Section */}
        <div className="mt-auto">
          {/* Progress Bar */}
          <div className="relative mb-2 h-2 overflow-hidden rounded-full bg-[#1A1A1A] shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${config.gradient} shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(var(--primary-rgb),0.4)]`}
            />
          </div>

          {/* Progress Info */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-400/90">
              {isLocked ? `${progress}%` : "Unlocked"}
            </span>
            {reward && (
              <span
                className={`bg-gradient-to-r font-medium ${config.gradient} bg-clip-text text-transparent`}
              >
                {reward}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
