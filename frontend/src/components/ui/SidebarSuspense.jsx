import React from "react";

const SidebarSuspense = () => {
  return (
    <>
      {/* Mobile Menu Button Skeleton */}
      <div className="fixed top-4 mt-1 left-4 z-[60] block lg:hidden p-2 rounded-lg">
        <div className="w-6 h-6 rounded-md bg-border animate-pulse"></div>
      </div>

      {/* Mobile Sidebar Skeleton */}
      <div className="fixed z-50 left-0 top-0 h-full w-[280px] block lg:hidden bg-background border-r rounded-r-3xl border-[#262626]">
        <SidebarContentSkeleton />
      </div>

      {/* Desktop Sidebar Skeleton */}
      <div className="fixed left-0 rounded-r-3xl top-0 h-full w-[18%] hidden lg:flex lg:w-[7%] max-w-[24rem] justify-center items-center xl:w-[18%] border-r border-border">
        <SidebarContentSkeleton />
      </div>
    </>
  );
};

// Separate component for sidebar content skeleton to match the original structure
const SidebarContentSkeleton = () => (
  <div className="gap-0 flex font-outfit flex-col h-full w-[90%] ml-[20px] py-8">
    {/* Logo Skeleton */}
    <div className="h-[10%] w-full flex gap-2 items-center justify-start">
      <div className="w-14 xl:w-14 lg:w-10 aspect-square rounded-lg bg-border animate-pulse"></div>
      <div className="w-28 h-7 rounded-md bg-border animate-pulse lg:hidden xl:block"></div>
    </div>

    {/* Options Skeleton */}
    <div className="mt-10 h-[30%] w-full gap-3 flex flex-col">
      <div className="ml-3 w-16 h-3.5 rounded-md bg-border animate-pulse lg:hidden xl:block"></div>
      {/* Button Skeletons */}
      {[...Array(3)].map((_, index) => (
        <div key={index} className="self-start center">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full bg-border animate-pulse">
            <div className="w-5 h-5 rounded-md"></div>
            <div className="w-20 h-4 rounded-md lg:hidden xl:block"></div>
          </div>
        </div>
      ))}
    </div>

    <div className="ml-2 divider w-[70%]"></div>

    {/* Categories Skeleton */}
    <div className="max-h-[600px] h-[50%]">
      <div className="ml-3 w-20 h-3.5 rounded-md bg-border animate-pulse lg:hidden xl:block"></div>
      <div className="categories-scroll overflow-hidden w-full mt-6 ml-2 h-[170px] flex flex-col gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center gap-3 w-[90%] group">
            <div className="w-8 h-8 rounded-lg bg-border animate-pulse"></div>
            <div className="w-16 h-3.5 rounded-md bg-border animate-pulse lg:hidden xl:block"></div>
          </div>
        ))}
      </div>
      <div className="ml-1 divider w-[70%]"></div>
    </div>

    {/* Logout Button Skeleton */}
    <div className="self-start h-[10%] md:mb-0 mb-[40%]">
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full bg-border animate-pulse">
        <div className="w-5 h-5 rounded-md"></div>
        <div className="w-16 h-4 rounded-md lg:hidden xl:block"></div>
      </div>
    </div>
  </div>
);

export default SidebarSuspense;
