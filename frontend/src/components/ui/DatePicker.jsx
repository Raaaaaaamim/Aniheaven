import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsChevronLeft,
  BsChevronRight,
  BsCalendar3,
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
  const [currentDate, setCurrentDate] = useState(
    value ? new Date(value) : new Date()
  );
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
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

  const handleDateSelect = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    onChange(selectedDate.toISOString().split("T")[0]);
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

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        value &&
        new Date(value).getDate() === day &&
        new Date(value).getMonth() === currentDate.getMonth() &&
        new Date(value).getFullYear() === currentDate.getFullYear();

      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? "bg-primary text-white"
              : isToday
              ? "bg-white/[0.05] text-primary"
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
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      )
    );
  };

  const clearDate = () => {
    onChange("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0f0f0f] text-text border border-white/[0.05] rounded-xl px-4 py-2 cursor-pointer flex items-center justify-between hover:border-primary/50 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <BsCalendar3 className="text-text/50" />
          <span className="text-text/70">
            {value || placeholder}
          </span>
        </div>
        {value && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearDate();
            }}
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
                className="p-1 hover:bg-white/[0.05] rounded-lg transition-colors duration-300"
              >
                <BsChevronLeft className="text-text" />
              </button>
              <span className="text-text font-medium">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="p-1 hover:bg-white/[0.05] rounded-lg transition-colors duration-300"
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
