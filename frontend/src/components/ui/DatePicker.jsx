import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsCalendar3, BsChevronLeft, BsChevronRight, BsX } from "react-icons/bs";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Custom hook for smart positioning
const useSmartPosition = (ref, isOpen) => {
  const [position, setPosition] = useState({ top: false, right: false });

  useEffect(() => {
    if (isOpen && ref.current) {
      const updatePosition = () => {
        const rect = ref.current.getBoundingClientRect();
        const spaceRight = window.innerWidth - rect.right;
        const spaceBottom = window.innerHeight - rect.bottom;

        setPosition({
          top: spaceBottom < 20, // If less than 20px at bottom, show above
          right: spaceRight < 20, // If less than 20px at right, align right
        });
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen]);

  return position;
};

const DatePicker = ({ value, onChange, placeholder = "Select date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [yearView, setYearView] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    if (value) {
      const date = new Date(value);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const { top: showAbove, right: alignRight } = useSmartPosition(
    dropdownRef,
    isOpen
  );

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      date.setHours(0, 0, 0, 0);
      setCurrentDate(date);
    }
  }, [value]);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
      setYearView(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDateToISO = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    selectedDate.setHours(0, 0, 0, 0);
    onChange(formatDateToISO(selectedDate));
    setIsOpen(false);
  };

  const handleYearClick = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setYearView(false);
  };

  const generateYears = () => {
    const currentYear = currentDate.getFullYear();
    const years = [];
    for (let i = currentYear - 50; i <= currentYear + 50; i++) {
      years.push(i);
    }
    return years;
  };

  const years = generateYears();

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-[160px] md:w-[180px] px-4 py-2 rounded-lg text-left bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.05] shadow-lg shadow-black/10 backdrop-blur-sm transition-all flex items-center gap-2 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative z-10"
          >
            <BsCalendar3 className="text-zinc-500 group-hover:text-zinc-400 transition-colors" />
          </motion.div>
          <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors truncate relative z-10">
            {value ? new Date(value).toLocaleDateString() : placeholder}
          </span>
        </motion.button>
        {value && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange("")}
            className="p-1.5 rounded-lg hover:bg-white/[0.08] transition-colors"
          >
            <BsX className="text-zinc-400 text-lg" />
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: showAbove ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: showAbove ? 10 : -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`absolute z-50 p-4 bg-[#141414]/95 backdrop-blur-xl rounded-xl border border-white/[0.05] shadow-xl min-w-[280px] ${
              showAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
            } ${alignRight ? "right-0" : "left-0"}`}
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <AnimatePresence mode="wait">
              {!yearView ? (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setCurrentDate(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth() - 1,
                            1
                          )
                        )
                      }
                      className="p-1.5 hover:bg-white/[0.08] rounded-lg transition-colors"
                    >
                      <BsChevronLeft className="text-zinc-400" />
                    </motion.button>

                    <motion.button
                      onClick={() => setYearView(true)}
                      className="relative px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-2 group hover:bg-white/[0.04]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">
                        {months[currentDate.getMonth()]}{" "}
                        {currentDate.getFullYear()}
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setCurrentDate(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth() + 1,
                            1
                          )
                        )
                      }
                      className="p-1.5 hover:bg-white/[0.08] rounded-lg transition-colors"
                    >
                      <BsChevronRight className="text-zinc-400" />
                    </motion.button>
                  </div>

                  {/* Weekdays */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-[10px] font-medium text-zinc-500 text-center py-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from(
                      {
                        length: getFirstDayOfMonth(
                          currentDate.getFullYear(),
                          currentDate.getMonth()
                        ),
                      },
                      (_, i) => (
                        <div key={`empty-${i}`} className="w-9 h-9" />
                      )
                    )}
                    {Array.from(
                      {
                        length: getDaysInMonth(
                          currentDate.getFullYear(),
                          currentDate.getMonth()
                        ),
                      },
                      (_, i) => {
                        const day = i + 1;
                        const date = new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day
                        );
                        const isSelected = value === formatDateToISO(date);
                        const isToday =
                          formatDateToISO(date) === formatDateToISO(new Date());

                        return (
                          <motion.button
                            key={day}
                            onClick={() => handleDateSelect(day)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                            className={`w-9 h-9 rounded-lg text-xs font-medium relative group ${
                              isSelected
                                ? "bg-white/[0.08] text-white shadow-lg shadow-black/20 backdrop-blur-sm"
                                : isToday
                                ? "text-zinc-300"
                                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                            }`}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                              initial={false}
                              animate={
                                isSelected
                                  ? { scale: 1.1, opacity: 1 }
                                  : { scale: 1, opacity: 0 }
                              }
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                            />
                            <span className="relative z-10">{day}</span>
                          </motion.button>
                        );
                      }
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="yearView"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-[336px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setYearView(false)}
                      className="p-1.5 hover:bg-white/[0.08] rounded-lg transition-colors"
                    >
                      <BsChevronLeft className="text-zinc-400" />
                    </motion.button>
                    <span className="text-xs font-medium text-zinc-300">
                      Select Year
                    </span>
                    <div className="w-8" />
                  </div>

                  <div className="h-[288px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="grid grid-cols-3 gap-1.5 p-0.5">
                      {years.map((year) => {
                        const isCurrentYear =
                          year === currentDate.getFullYear();
                        return (
                          <motion.button
                            key={year}
                            onClick={() => handleYearClick(year)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                            className={`px-2 py-2 text-xs rounded-lg relative group overflow-hidden ${
                              isCurrentYear
                                ? "bg-white/[0.08] text-white shadow-lg shadow-black/20 backdrop-blur-sm"
                                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                            }`}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                              initial={false}
                              animate={
                                isCurrentYear ? { opacity: 1 } : { opacity: 0 }
                              }
                            />
                            <span className="relative z-10">{year}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
