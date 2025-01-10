const AnimeInfoSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-secondary/5 p-4 rounded-xl text-center"
          >
            <div className="h-7 w-20 bg-secondary/10 rounded animate-pulse mx-auto mb-2" />
            <div className="h-4 w-16 bg-secondary/10 rounded animate-pulse mx-auto" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-secondary/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-5 bg-secondary/10 rounded animate-pulse" />
              <div className="h-6 w-28 bg-secondary/10 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-16 bg-secondary/10 rounded animate-pulse" />
                  <div className="h-5 w-24 bg-secondary/10 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Broadcast Info */}
          <div className="bg-secondary/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-5 bg-secondary/10 rounded animate-pulse" />
              <div className="h-6 w-28 bg-secondary/10 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-16 bg-secondary/10 rounded animate-pulse" />
                  <div className="h-5 w-32 bg-secondary/10 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Studios & Tags */}
          {[...Array(2)].map((_, sectionIndex) => (
            <div key={sectionIndex} className="bg-secondary/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-5 bg-secondary/10 rounded animate-pulse" />
                <div className="h-6 w-28 bg-secondary/10 rounded animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, tagIndex) => (
                  <div
                    key={tagIndex}
                    className="h-6 w-20 bg-secondary/10 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeInfoSkeleton;
