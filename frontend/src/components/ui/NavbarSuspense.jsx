import React from "react";

const NavbarSuspense = () => {
  return (
    <nav className="flex h-20 ml-0 w-[100%] font-poppins justify-center items-center lg:w-[81.5%] lg:ml-[18%]">
      <div className="w-full flex gap-5 items-center justify-between">
        <div className="ml-6 flex justify-center gap-11 items-center">
          {/* Navigation Arrows Skeleton */}
          <div className="hidden icon lg:flex justify-center items-center gap-6">
            <div className="w-5 h-5 rounded-sm bg-border animate-pulse"></div>
            <div className="w-5 h-5 rounded-sm bg-border animate-pulse"></div>
          </div>

          {/* Search Bar Skeleton */}
          <div className="overflow-hidden md:flex ml-12 gap-1 z-40 bg-background justify-start hidden items-center h-10 lg:w-72 md:w-64 w-60 rounded-xl border-border border-[1px]">
            <div className="flex justify-start items-center gap-3 w-[90%] h-full ml-3">
              <div className="w-5 h-5 rounded-sm bg-border animate-pulse"></div>
              <div className="w-48 h-4 bg-border rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Right Side Icons and Avatar Skeleton */}
        <div className="mr-6 flex justify-center items-center gap-5">
          <div className="w-[19px] h-[19px] rounded-sm bg-border animate-pulse"></div>
          <div className="w-[20px] h-[20px] rounded-sm bg-border animate-pulse"></div>
          <div className="w-8 h-8 rounded-full bg-border animate-pulse"></div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSuspense;
