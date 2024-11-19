import React from "react";

const SidebarSuspense = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed    left-0 rounded-r-3xl top-0 h-full w-[18%] hidden lg:block border-r border-border">
        <div className="gap-0 flex flex-col h-full w-[90%] ml-[20px] py-8">
          {/* Logo Skeleton */}
          <div className="h-[10%] w-full flex gap-2 items-center justify-start">
            <div className="w-14 h-14 rounded-lg bg-border animate-pulse"></div>
            <div className="w-24 h-7 rounded-md bg-border animate-pulse"></div>
          </div>

          {/* Options Skeleton */}
          <div className="mt-10 h-[30%] w-full gap-3 flex flex-col">
            <div className="ml-3 w-16 h-3.5 rounded-md bg-border animate-pulse"></div>
            <div className="self-start w-[90%] h-10 rounded-xl bg-border animate-pulse"></div>
            <div className="self-start w-[90%] h-10 rounded-xl bg-border animate-pulse"></div>
            <div className="self-start w-[90%] h-10 rounded-xl bg-border animate-pulse"></div>
          </div>

          <div className="ml-2 divider w-[70%]"></div>

          {/* Categories Skeleton */}
          <div className="h-[50%] max-h-[600px]">
            <div className="ml-3 w-20 h-3.5 rounded-md bg-border animate-pulse"></div>
            <div className="categories-scroll overflow-y-auto w-full mt-6 h-[170px] flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 w-[90%]">
                  <div className="w-7 h-7 rounded-full bg-border animate-pulse"></div>
                  <div className="w-16 h-3.5 rounded-md bg-border animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="ml-2 divider w-[70%]"></div>
          <div className="self-start w-[90%] h-11 rounded-xl bg-border animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default SidebarSuspense;
