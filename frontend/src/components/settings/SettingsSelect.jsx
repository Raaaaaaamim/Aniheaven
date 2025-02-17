import { memo, useCallback, useEffect, useRef, useState } from "react";

const SettingSelect = memo(
  ({ icon: Icon, title, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    return (
      <div className="group relative flex flex-col items-start justify-between gap-4 rounded-xl border-[1px] border-white/[0.05] bg-white/[0.02] px-4 py-4 transition-all hover:bg-white/[0.04] sm:flex-row sm:items-center sm:gap-0 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="group-hover:bg-primary/20 group-hover:text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/80 transition-all">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="group-hover:text-primary text-sm font-medium text-white/90 transition-all sm:text-base">
            {title}
          </h3>
        </div>
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:border-primary/50 focus:ring-primary/20 flex w-full min-w-[120px] items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/90 transition-all hover:border-white/20 hover:bg-white/10 focus:ring-2 focus:outline-none sm:w-auto"
          >
            <span className="truncate">{value}</span>
            <svg
              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="animate-dropdown absolute right-0 z-10 mt-2 w-full origin-top-right rounded-lg border border-white/10 bg-[#1a1a1a] py-1 shadow-xl sm:w-48">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-3 text-sm transition-all hover:bg-white/5 sm:py-2 ${
                    option === value ? "text-primary" : "text-white/90"
                  }`}
                >
                  {option === value && (
                    <svg
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
SettingSelect.displayName = "SettingSelect";
export default SettingSelect;
