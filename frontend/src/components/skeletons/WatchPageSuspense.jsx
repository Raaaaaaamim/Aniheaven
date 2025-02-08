import React from "react";

const WatchPageSuspense = () => {
  return (
    <div className="flex min-h-screen w-full items-start justify-center justify-self-start overflow-hidden">
      <div className="mb-4 flex h-full w-[98%] flex-col gap-3 overflow-hidden rounded-xl">
        {/* Video Player Skeleton */}
        <div className="flex aspect-video animate-pulse items-center justify-center overflow-hidden rounded-2xl bg-[#1f1f1f]">
          <div className="bg-border/20 h-40 w-40 animate-pulse rounded-2xl"></div>
        </div>

        {/* Controls Section */}
        <div className="font-poppins flex h-[6.5rem] w-full overflow-hidden rounded-xl bg-[#151515]">
          {/* Left Section - Stats */}
          <div className="border-border hidden h-full w-[40%] items-start justify-center gap-2 border-r-[2px] lg:flex lg:flex-col">
            <div className="ml-4 flex items-center justify-center gap-2 self-start">
              {/* Rating Skeleton */}
              <div className="mt-2 flex items-center justify-center gap-1 font-semibold">
                <div className="bg-primary/20 h-4 w-4 animate-pulse rounded-xs"></div>
                <div className="bg-border h-4 w-16 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Right Section - Server Options */}
          <div className="flex h-full w-full flex-col gap-0 lg:w-[70%]">
            {/* Sub Section */}
            <div className="border-b-border flex h-[50%] w-full items-center justify-start gap-3 border-b-2">
              <div className="bg-border ml-3 h-5 w-5 animate-pulse rounded-xs"></div>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-border h-9 w-24 animate-pulse rounded-xl lg:w-28"
                  ></div>
                ))}
            </div>

            {/* Dub Section */}
            <div className="flex h-[50%] w-full items-center justify-start gap-3">
              <div className="bg-border ml-3 h-5 w-5 animate-pulse rounded-xs"></div>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-border h-9 w-24 animate-pulse rounded-xl lg:w-28"
                  ></div>
                ))}
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="w-full rounded-xl bg-[#151515] p-4">
          <div className="flex flex-col gap-4">
            {/* Section Dropdown Skeleton */}
            <div className="px-2">
              <div className="bg-border h-8 w-[180px] animate-pulse rounded-xl"></div>
            </div>

            {/* Episodes Grid */}
            <div className="bg-border flex h-[200px] animate-pulse flex-wrap items-center justify-center gap-2 rounded-xl px-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPageSuspense;
