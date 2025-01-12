import { motion } from "framer-motion";
import React from "react";

const ProfileStats = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative bg-gradient-to-br from-secondary/30 to-secondary/10 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.08] hover:border-primary/30 transition-all duration-300 group shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`p-3 rounded-xl ${stat.color} bg-opacity-20 ring-1 ring-white/10`}
            >
              <stat.icon className="text-2xl" />
            </motion.div>
            <span className="text-sm font-medium text-text/70">{stat.label}</span>
          </div>
          
          <div className="flex items-end gap-3 mb-2">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text to-text/80">
              {stat.value}
            </span>
            {stat.change && (
              <div className={`flex items-center gap-1 text-sm px-2 py-0.5 rounded-full ${
                stat.change > 0 
                  ? "text-green-400 bg-green-500/10" 
                  : "text-red-400 bg-red-500/10"
              }`}>
                {stat.change > 0 ? "+" : ""}
                {stat.change}%
              </div>
            )}
          </div>
          
          {stat.subValue && (
            <span className="text-sm text-text/50">{stat.subValue}</span>
          )}
          
          {stat.progress && (
            <div className="mt-4">
              <div className="w-full h-2 bg-secondary/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${stat.progressColor || stat.color} shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]`}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    ))}
  </div>
);

export default ProfileStats;
