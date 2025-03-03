import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedDropdown = ({
  trigger,
  items,
  onSelect,
  selectedValue,
  isOpen,
  setIsOpen,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="text-text flex h-8 min-h-0 w-[130px] cursor-pointer items-center justify-center rounded-md border border-white/[0.05] bg-white/[0.02] px-1 text-xs transition-all duration-300 hover:bg-white/[0.04] lg:h-9 lg:w-[180px] lg:text-sm"
      >
        {trigger}
      </div>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            className="absolute z-50 mt-2 w-52 rounded-xl border border-white/[0.05] bg-[#0f0f0f] shadow-lg"
          >
            <div className="max-h-96 w-full overflow-y-auto p-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                  className="text-text/90 cursor-pointer rounded-lg px-3 py-2 text-xs duration-100 ease-in hover:bg-white/[0.04] lg:text-sm"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedDropdown;
