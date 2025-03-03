import { motion } from "framer-motion";
import React from "react";
const AnimeCardSkeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "backOut",
      }}
      className="relative rounded-xl w-[180px] h-[270px] sm:h-[280px] sm:w-[190px] md:w-[200px] overflow-hidden border border-white/[0.05] bg-[#0f0f0f]"
    >
      {/* Image skeleton */}
      <div className="w-full h-full absolute z-10 top-0 left-0 rounded-xl bg-white/[0.05] animate-pulse" />
    </motion.div>
  );
};

export default AnimeCardSkeleton;
