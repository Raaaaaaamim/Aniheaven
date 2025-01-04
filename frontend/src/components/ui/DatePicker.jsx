import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  BsCalendar3,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsX,
} from "react-icons/bs";

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

const DatePicker = ({ value, onChange, placeholder = "Select date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
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
  const yearSelectRef = useRef(null);

  // Update currentDate when value changes externally
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
    }
    if (
      yearSelectRef.current &&
      !yearSelectRef.current.contains(event.target)
    ) {
      setIsYearSelectOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateToISO = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const firstDay = getFirstDayOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDateObj = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      currentDateObj.setHours(0, 0, 0, 0);

      const isSelected =
        value &&
        currentDateObj.getTime() === new Date(value).setHours(0, 0, 0, 0);
      const isToday = currentDateObj.getTime() === today.getTime();

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? "bg-primary text-white hover:bg-primary/90"
              : isToday
              ? "bg-white/[0.05] text-primary hover:bg-white/[0.1]"
              : "hover:bg-white/[0.05] text-text"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const clearDate = (e) => {
    e.stopPropagation();
    onChange("");
    setIsOpen(false);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setCurrentDate(today);
  };

  const generateYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 1900; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  };

  const handleYearSelect = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsYearSelectOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0f0f0f] text-text border border-white/[0.05] rounded-xl px-4 py-2 cursor-pointer flex items-center justify-between hover:border-primary/50 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <BsCalendar3 className="text-text/50" />
          <span className="text-text/70">{value || placeholder}</span>
        </div>
        {value && (
          <button
            onClick={clearDate}
            className="hover:text-primary transition-colors duration-300"
          >
            <BsX className="text-lg" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-2 p-4 bg-[#0f0f0f] border border-white/[0.05] rounded-xl shadow-lg min-w-[280px]"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-1.5 hover:bg-white/[0.05] rounded-lg transition-colors duration-300"
              >
                <BsChevronLeft className="text-text" />
              </button>
              <div className="relative" ref={yearSelectRef}>
                <button
                  onClick={() => setIsYearSelectOpen(!isYearSelectOpen)}
                  className="flex items-center gap-1 text-text font-medium hover:bg-white/[0.05] px-3 py-1.5 rounded-lg transition-colors duration-300"
                >
                  <span>
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <BsChevronDown
                    className={`transition-transform text-xs duration-300 ${
                      isYearSelectOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isYearSelectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 mt-1 py-2 bg-[#0f0f0f] border border-white/[0.05] rounded-xl shadow-lg w-32 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                    >
                      {generateYearRange().map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className={`w-full px-3 py-1.5 text-left hover:bg-white/[0.05] transition-colors duration-300 ${
                            year === currentDate.getFullYear()
                              ? "text-primary"
                              : "text-text"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={nextMonth}
                className="p-1.5 hover:bg-white/[0.05] rounded-lg transition-colors duration-300"
              >
                <BsChevronRight className="text-text" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="w-8 h-8 flex items-center justify-center text-xs text-text/50"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
