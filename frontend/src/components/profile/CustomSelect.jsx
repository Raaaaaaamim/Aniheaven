import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-background border border-white/[0.05] rounded-xl flex items-center justify-between text-text hover:border-white/10 transition-colors relative group"
      >
        <span className="truncate">{selectedOption.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <FiChevronDown className="text-text/80" />
        </motion.div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          <div className="absolute inset-[-1px] bg-linear-to-r from-transparent via-white/5 to-transparent rounded-xl" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute z-50 w-full mt-2 bg-background border border-white/[0.05] rounded-xl shadow-xl shadow-black/20 overflow-hidden"
          >
            <div className="max-h-60 overflow-auto">
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  className="w-full px-4 py-2.5 text-left flex flex-col gap-0.5 relative group"
                >
                  <span className="text-text">{option.label}</span>
                  {option.description && (
                    <span className="text-sm text-text/60">
                      {option.description}
                    </span>
                  )}
                  
                  {/* Selected Indicator */}
                  {option.value === value && (
                    <motion.div
                      layoutId="selected-indicator"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary to-accent"
                    />
                  )}
                  
                  {/* Hover Indicator */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-accent/5" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
