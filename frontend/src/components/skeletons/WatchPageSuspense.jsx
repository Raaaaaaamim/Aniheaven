import React from "react";

const WatchPageSuspense = () => {
  return (
    <div className="overflow-hidden justify-self-start w-full min-h-screen flex justify-center items-start">
      <div className="overflow-hidden mb-4 flex flex-col w-[98%] gap-3 h-full rounded-xl">
        {/* Video Player Skeleton */}
        <div className="overflow-hidden aspect-video rounded-2xl bg-[#1f1f1f] animate-pulse flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-border/20 animate-pulse"></div>
        </div>

        {/* Controls Section */}
        <div className="overflow-hidden font-poppins w-full flex h-[6.5rem] bg-[#151515] rounded-xl">
          {/* Left Section - Stats */}
          <div className="w-[40%] hidden justify-center items-start lg:flex lg:flex-col h-full border-r-[2px] gap-2 border-border">
            <div className="flex self-start ml-4 justify-center items-center gap-2">
              {/* Rating Skeleton */}
              <div className="flex font-semibold mt-2 gap-1 justify-center items-center">
                <div className="w-4 h-4 rounded-xs bg-primary/20 animate-pulse"></div>
                <div className="w-16 h-4 rounded-md bg-border animate-pulse"></div>
              </div>
              {/* Duration Skeleton */}
              <div className="flex font-semibold mt-2 gap-1 justify-center items-center">
                <div className="w-4 h-4 rounded-xs bg-primary/20 animate-pulse"></div>
                <div className="w-8 h-4 rounded-md bg-border animate-pulse"></div>
              </div>
            </div>
            {/* Info Text Skeleton */}
            <div className="ml-4 w-[70%] h-3 rounded-md bg-border animate-pulse"></div>
          </div>

          {/* Right Section - Server Options */}
          <div className="lg:w-[70%] w-full h-full gap-0 flex flex-col">
            {/* Sub Section */}
            <div className="w-full h-[50%] border-b-2 border-b-border items-center flex justify-start gap-3">
              <div className="ml-3 w-5 h-5 rounded-xs bg-border animate-pulse"></div>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-24 h-9 lg:w-28 rounded-xl bg-border animate-pulse"
                  ></div>
                ))}
            </div>

            {/* Dub Section */}
            <div className="w-full items-center flex justify-start gap-3 h-[50%]">
              <div className="ml-3 w-5 h-5 rounded-xs bg-border animate-pulse"></div>
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-24 h-9 lg:w-28 rounded-xl bg-border animate-pulse"
                  ></div>
                ))}
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <div className="w-full rounded-xl bg-[#151515] p-4">
          <div className="flex flex-col gap-4">
            {/* Section Dropdown Skeleton */}
            <div className="px-2  ">
              <div className="w-[180px] h-8 rounded-xl bg-border animate-pulse"></div>
            </div>

            {/* Episodes Grid */}
            <div className="flex-wrap rounded-xl bg-border animate-pulse px-2 gap-2 h-[200px] flex justify-center items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPageSuspense;
