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
        className="lg:h-9 h-8 rounded-md flex justify-center items-center bg-white/[0.02] hover:bg-white/[0.04] text-text/90 w-[130px] lg:w-[180px] transition-all duration-300 border border-white/[0.05] text-xs lg:text-sm px-1 min-h-0 cursor-pointer"
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
            <div className="p-2 w-full overflow-y-auto max-h-96">
              {items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                  className="text-xs  lg:text-sm px-3 py-2 rounded-lg cursor-pointer hover:bg-white/[0.04]   ease-in duration-100"
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
