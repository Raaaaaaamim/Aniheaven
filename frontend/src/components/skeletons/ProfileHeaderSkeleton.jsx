import { motion } from "framer-motion";
import React from "react";

const ProfileHeaderSkeleton = () => {
  return (
    <div className="font-outfit relative flex h-[250px] w-full justify-center overflow-hidden md:h-[300px]">
      {/* Skeleton Banner with shimmer effect */}
      <div className="absolute z-0 h-full w-full bg-white/5">
        <div className="from-background via-background/90 absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="from-background/50 to-background/50 absolute inset-0 bg-linear-to-r via-transparent" />
      </div>

      <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-4 md:px-6">
        <div className="mb-4 flex flex-col items-start gap-4 md:mb-6 md:flex-row md:items-end md:gap-6">
          {/* Profile Image Skeleton */}
          <div className="relative flex-shrink-0">
            <div className="relative">
              <div className="animate-pulse h-28 w-28 rounded-xl bg-white/10 md:h-36 md:w-36">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Verified Badge Skeleton */}
              <div className="absolute -right-1.5 -bottom-1.5 h-8 w-8 animate-pulse rounded-full bg-white/10 md:-right-2 md:-bottom-2 md:h-10 md:w-10" />
            </div>
          </div>

          {/* Profile Info Skeleton */}
          <div className="flex flex-col items-start gap-2 md:gap-3">
            <div className="flex flex-col gap-1 md:gap-1.5">
              {/* Username Skeleton */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="h-7 w-32 animate-pulse rounded-md bg-white/10 md:h-8 md:w-40" />
                <div className="h-6 w-6 animate-pulse rounded-full bg-white/10 md:h-7 md:w-7" />
              </div>

              {/* Handle and Join Date Skeleton */}
              <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-3">
                <div className="h-4 w-20 animate-pulse rounded-md bg-white/10 md:h-5 md:w-24" />
                <div className="h-4 w-24 animate-pulse rounded-md bg-white/10 md:h-5 md:w-28" />
              </div>
            </div>

            {/* Bio Skeleton */}
            <div className="h-4 w-64 animate-pulse rounded-md bg-white/10 md:h-5 md:w-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
