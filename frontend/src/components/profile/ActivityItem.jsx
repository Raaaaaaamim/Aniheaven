import { motion } from "framer-motion";
import React from "react";

const ActivityItem = ({ type, title, subtitle, time, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="group hover:bg-secondary/20 rounded-xl transition-all duration-300 border border-transparent hover:border-primary/20"
  >
    <div className="p-4 flex items-center gap-4">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`p-3 rounded-xl ${color} shadow-lg group-hover:shadow-${color}/20`}
      >
        <Icon className="text-xl text-white" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white font-medium">
            {type}
          </span>
          <h3 className="text-text truncate">{title}</h3>
        </div>
        {subtitle && (
          <p className="text-sm text-text/60 truncate">{subtitle}</p>
        )}
      </div>
      <time className="text-sm text-text/40 whitespace-nowrap">{time}</time>
    </div>
  </motion.div>
);

export default ActivityItem;
