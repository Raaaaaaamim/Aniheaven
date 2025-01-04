import React from "react";

const AnimeCardSkeleton = () => {
  return (
    <div className="relative rounded-xl w-[180px] h-[270px] sm:h-[280px] sm:w-[190px] md:w-[200px] overflow-hidden border border-white/[0.05] bg-[#0f0f0f]">
      {/* Image skeleton */}
      <div className="w-full h-full absolute z-10 top-0 left-0 rounded-xl bg-white/[0.05] animate-pulse" />

      {/* Bottom gradient and info */}
      <div className="absolute z-10 bottom-0 flex justify-start w-full left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex relative py-2 ml-2 md:py-4 items-center gap-2">
          <div className="flex mr-2 justify-center gap-1 flex-col-reverse">
            <div className="flex gap-[2px] items-center">
              {/* Badge skeletons */}
              <div className="h-5 w-12 bg-white/[0.05] rounded-full animate-pulse" />
              <div className="h-5 w-12 bg-white/[0.05] rounded-full animate-pulse ml-1" />
            </div>
            {/* Title skeleton */}
            <div className="w-24 h-5 bg-white/[0.05] rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hover content skeleton */}
      <div className="absolute -bottom-[100%] left-0 w-full items-center flex justify-center h-[90%] bg-[#0f0f0f]/80 backdrop-blur-sm border-t border-white/[0.05] rounded-xl">
        <div className="gap-1 flex w-[90%] flex-col justify-center h-fit">
          {/* Title and info icon skeleton */}
          <div className="flex justify-between w-full items-center">
            <div className="w-[80%] h-4 bg-white/[0.05] rounded animate-pulse" />
            <div className="w-4 h-4 bg-white/[0.05] rounded-full animate-pulse" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-1 mt-1">
            <div className="w-full h-3 bg-white/[0.05] rounded animate-pulse" />
            <div className="w-3/4 h-3 bg-white/[0.05] rounded animate-pulse" />
          </div>

          {/* Genre tags skeleton */}
          <div className="flex gap-1 mt-2">
            <div className="h-6 w-16 bg-white/[0.05] rounded-lg animate-pulse" />
            <div className="h-6 w-16 bg-white/[0.05] rounded-lg animate-pulse" />
          </div>

          {/* Info rows skeleton */}
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-white/[0.05] rounded animate-pulse" />
              <div className="w-20 h-3 bg-white/[0.05] rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-white/[0.05] rounded animate-pulse" />
              <div className="w-20 h-3 bg-white/[0.05] rounded animate-pulse" />
            </div>
          </div>

          {/* Buttons skeleton */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex-1 mr-2">
              <div className="w-full h-9 bg-white/[0.05] rounded-lg animate-pulse" />
            </div>
            <div className="w-10 h-10 bg-white/[0.05] rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCardSkeleton;
