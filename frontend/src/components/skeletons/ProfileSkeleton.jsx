import React from "react";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";
import TabButtonSkeleton from "./TabButtonSkeleton";

const ProfileSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <ProfileHeaderSkeleton />
      <div className="mb-10 flex min-h-[80vh] w-full flex-col items-center">
        <div className="font-outfit border-border mt-7 flex h-13 w-full gap-2 border-b-1">
          {[...Array(5)].map((_, i) => (
            <TabButtonSkeleton
              key={i}
              className={i === 0 ? "ml-3" : "ml-0"}
            />
          ))}
        </div>
        
        {/* Content Area Skeleton */}
        <div className="mt-8 w-full max-w-4xl px-4">
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-16 w-full animate-pulse rounded-lg bg-white/10"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
