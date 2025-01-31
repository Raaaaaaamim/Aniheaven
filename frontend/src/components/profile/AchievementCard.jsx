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
      className={`relative group font-outfit cursor-pointer bg-linear-to-br from-secondary/40 to-secondary/20 rounded-2xl p-6 border ${config.border} ${config.shadow} backdrop-blur-xl overflow-hidden`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-linear-to-br opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" />
      <div
        className={`absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br ${config.gradient} blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
      />
      <div
        className={`absolute inset-0 bg-linear-to-br ${config.bgGlow} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl`}
      />

      {/* Rarity Badge */}
      <div
        className={`absolute top-4 right-4 px-3 py-1.5 rounded-full bg-linear-to-r ${config.gradient} text-white text-xs font-medium flex items-center gap-1.5 shadow-lg ${config.shadow}`}
      >
        <config.icon className="text-sm" />
        <span>{config.label}</span>
      </div>

      {/* Icon and Title */}
      <div className="flex items-start gap-4 mb-4 relative z-10">
        <div
          className={`relative shrink-0 w-14 h-14 rounded-xl bg-linear-to-br ${config.gradient} p-[1px] overflow-hidden group-hover:shadow-lg transition-shadow duration-300 ${config.shadow}`}
        >
          <div className="w-full h-full rounded-xl bg-[#0F0F0F] flex items-center justify-center relative overflow-hidden">
            {isLocked ? (
              <FiLock className="text-2xl text-white/50" />
            ) : (
              <Icon className="text-2xl text-white" />
            )}
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-linear-to-r from-white to-white/80 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-400/80">{description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2.5 bg-[#1A1A1A] rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`absolute inset-y-0 left-0 bg-linear-to-r ${config.gradient} shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]`}
        />
      </div>

      {/* Progress Text and Unlock Date */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">
          {isLocked ? `${progress}% Complete` : "Unlocked"}
        </span>
        {unlockedDate && !isLocked && (
          <span className="text-gray-500">{unlockedDate}</span>
        )}
      </div>

      {/* Reward Section */}
      {reward && (
        <div className="mt-4 pt-4 border-t border-white/5">
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
