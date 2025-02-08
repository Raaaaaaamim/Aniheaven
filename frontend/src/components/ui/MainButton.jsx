import React from "react";

const MainButton = ({
  loadingText = "Loading...",
  loading = false,
  title,
  type = "default",
  size = "default",
}) => {
  const types = {
    ghost: " bg-transparent border border-[1px] border-white/10 text-text",
    default: " bg-violet-600 text-white",
  };
  const sizes = {
    default: " h-11",
    md: " h-10",
    lg: " h-12",
    sm: " h-9",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`group font-outfit relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-transparent px-4 py-3 text-sm font-medium transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
        types[type]
      } ${sizes[size]}`}
    >
      <span
        className={`absolute inset-0 z-10 h-full w-full -translate-x-[120%] rounded-xl bg-linear-to-r from-transparent to-transparent duration-300 ease-in-out group-hover:translate-x-[120%] ${type === "ghost" ? "via-primary/30" : "via-text/30"} `}
      ></span>

      {loading ? (
        <div className="z-50 flex items-center space-x-2">
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{loadingText}</span>
        </div>
      ) : (
        title
      )}
    </button>
  );
};

export default MainButton;
