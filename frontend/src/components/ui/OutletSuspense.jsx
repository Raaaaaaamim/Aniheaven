import React from "react";

const OutletSuspense = () => {
  return (
    <div className="w-full min-h-screen p-6 font-poppins">
      {/* Hero Section Skeleton */}
      <div className="w-full h-[500px] rounded-2xl bg-border animate-pulse mb-10"></div>

      {/* Trending Section Skeleton */}
      <div className="mb-10">
        <div className="w-48 h-6 bg-border animate-pulse mb-6 rounded-md"></div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="relative border-border border-[1px] md:w-[220px] md:h-[300px] lg:w-[190px] lg:h-[270px] xl:w-[200px] xl:h-[280px] rounded-xl bg-border animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Latest Episodes Section Skeleton */}
      <div>
        <div className="w-48 h-6 bg-border animate-pulse mb-6 rounded-md"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className="group relative self-start overflow-hidden bg-border animate-pulse md:w-64 w-[180px] rounded-xl md:h-[370px]"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutletSuspense;
