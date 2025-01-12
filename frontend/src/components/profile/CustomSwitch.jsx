import { motion } from "framer-motion";
import React from "react";

const CustomSwitch = ({ checked, onChange, size = "default" }) => {
  const sizes = {
    small: {
      width: "36px",
      height: "20px",
      circle: "14px",
      translate: "16px",
    },
    default: {
      width: "44px",
      height: "24px",
      circle: "18px",
      translate: "20px",
    },
    large: {
      width: "52px",
      height: "28px",
      circle: "22px",
      translate: "24px",
    },
  };

  const currentSize = sizes[size];

  return (
    <motion.button
      initial={false}
      animate={{
        backgroundColor: checked ? "#6D28D9" : "#1F1F1F",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onChange}
      className={`relative rounded-full cursor-pointer border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/75 ${
        checked ? "bg-purple-600" : "bg-[#1F1F1F]"
      }`}
      style={{ width: currentSize.width, height: currentSize.height }}
    >
      <motion.div
        initial={false}
        animate={{
          x: checked ? currentSize.translate : "0px",
          backgroundColor: checked ? "#ffffff" : "#9CA3AF",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="absolute rounded-full shadow-lg transform ring-0 transition-transform duration-200 ease-in-out"
        style={{
          width: currentSize.circle,
          height: currentSize.circle,
          top: "3px",
          left: "3px",
        }}
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${
              checked
                ? "from-white via-white/90 to-white/70"
                : "from-gray-300 via-gray-400 to-gray-500"
            }`}
          />
          <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-transparent via-black/5 to-black/10" />
        </div>

        {/* Ripple Effect */}
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="absolute inset-0 rounded-full bg-purple-400"
          />
        )}
      </motion.div>

      {/* Background Glow */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-200 ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-40" />
      </div>
    </motion.button>
  );
};

export default CustomSwitch;
