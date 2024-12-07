const AnimeInfoSkeleton = () => {
  return (
    <>
      {/* Stats Overview Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative bg-secondary/5 p-3 sm:p-4 rounded-xl text-center group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent skeleton-wave"></div>
            <div className="h-6 sm:h-8 w-16 sm:w-20 bg-secondary/10 rounded animate-pulse mx-auto mb-1"></div>
            <div className="h-3 sm:h-4 w-12 sm:w-16 bg-secondary/10 rounded animate-pulse mx-auto"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Basic Details Skeleton */}
          <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary/10 rounded animate-pulse"></div>
              <div className="h-5 sm:h-6 w-24 sm:w-28 bg-secondary/10 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-16 bg-secondary/10 rounded animate-pulse"></div>
                  <div className="h-5 w-24 bg-secondary/10 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Broadcast Information Skeleton */}
          <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary/10 rounded animate-pulse"></div>
              <div className="h-5 sm:h-6 w-36 sm:w-40 bg-secondary/10 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-16 bg-secondary/10 rounded animate-pulse"></div>
                  <div className="h-5 w-32 bg-secondary/10 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Studios & Producers Skeleton */}
          <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary/10 rounded animate-pulse"></div>
              <div className="h-5 sm:h-6 w-24 sm:w-28 bg-secondary/10 rounded animate-pulse"></div>
            </div>
            <div className="space-y-6">
              {[...Array(2)].map((_, index) => (
                <div key={index}>
                  <div className="h-4 w-20 bg-secondary/10 rounded animate-pulse mb-3"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, tagIndex) => (
                      <div
                        key={tagIndex}
                        className="h-6 w-24 bg-secondary/10 rounded-full animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Genres & Themes Skeleton */}
          <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary/10 rounded animate-pulse"></div>
              <div className="h-5 sm:h-6 w-24 sm:w-28 bg-secondary/10 rounded animate-pulse"></div>
            </div>
            <div className="space-y-6">
              {[...Array(2)].map((_, index) => (
                <div key={index}>
                  <div className="h-4 w-20 bg-secondary/10 rounded animate-pulse mb-3"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, tagIndex) => (
                      <div
                        key={tagIndex}
                        className="h-6 w-20 bg-secondary/10 rounded-full animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeInfoSkeleton;
