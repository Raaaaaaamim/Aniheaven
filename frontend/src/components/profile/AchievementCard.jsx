import { motion } from "framer-motion";
import React from "react";
import { FiLock } from "react-icons/fi";
import { rarityConfig } from "../../config.js";

const AchievementCard = ({
  title,
  description,
  icon: Icon,
  progress,
  rarity,
  reward,
  unlockedDate,
  onClick,
}) => {
  const config = rarityConfig[rarity];
  const isLocked = progress < 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
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
      className={`group font-outfit from-secondary/40 to-secondary/20 relative cursor-pointer rounded-2xl border bg-linear-to-br p-6 ${config.border} ${config.shadow} w-120 overflow-hidden backdrop-blur-xl`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-br opacity-[0.03] transition-opacity group-hover:opacity-[0.05]" />
      <div
        className={`absolute -top-24 -right-24 h-48 w-48 bg-linear-to-br ${config.gradient} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
      />
      <div
        className={`absolute inset-0 bg-linear-to-br ${config.bgGlow} rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30`}
      />

      {/* Rarity Badge */}
      <div
        className={`absolute top-4 right-4 rounded-full bg-linear-to-r px-3 py-1.5 ${config.gradient} flex items-center gap-1.5 text-xs font-medium text-white shadow-lg ${config.shadow}`}
      >
        <config.icon className="text-sm" />
        <span>{config.label}</span>
      </div>

      {/* Icon and Title */}
      <div className="relative z-10 mb-4 flex items-start gap-4">
        <div
          className={`relative h-14 w-14 shrink-0 rounded-xl bg-linear-to-br ${config.gradient} overflow-hidden p-[1px] transition-shadow duration-300 group-hover:shadow-lg ${config.shadow}`}
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-[#0F0F0F]">
            {isLocked ? (
              <FiLock className="text-2xl text-white/50" />
            ) : (
              <Icon className="text-2xl text-white" />
            )}
            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </div>
        </div>

        <div>
          <h3 className="mb-1 bg-linear-to-r from-white to-white/80 bg-clip-text text-lg font-semibold text-transparent">
            {title}
          </h3>
          <p className="text-sm text-gray-400/80">{description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-3 h-2.5 overflow-hidden rounded-full bg-[#1A1A1A]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`absolute inset-y-0 left-0 bg-linear-to-r ${config.gradient} shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]`}
        />
      </div>

      {/* Progress Text and Unlock Date */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">
          {isLocked ? `${progress}% Complete` : "Unlocked"}
        </span>
        {unlockedDate && !isLocked && (
          <span className="text-gray-500">{unlockedDate}</span>
        )}
      </div>

      {/* Reward Section */}
      {reward && (
        <div className="mt-4 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Reward:</span>
            <span className="text-white/90">{reward}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementCard;
