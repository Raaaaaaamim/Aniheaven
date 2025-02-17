import React from "react";

const TabButtonSkeleton = ({ className }) => (
  <div
    className={`relative flex items-center gap-1 px-3 py-3 md:gap-2 md:px-6 md:py-4 ${className}`}
  >
    {/* Icon Skeleton */}
    <div className="relative z-10 h-6 w-6 animate-pulse rounded-md bg-white/10 md:h-5 md:w-5" />
    {/* Label Skeleton */}
    <div className="relative z-10 hidden h-5 w-24 animate-pulse rounded-md bg-white/10 md:block" />
  </div>
);

export default TabButtonSkeleton;
