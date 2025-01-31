const HeroSkeleton = () => (
  <div className="relative w-full h-fit">
    {/* Background Image with Gradient */}
    <div className="absolute h-[300px] sm:h-[400px] inset-0">
      <div className="w-full h-full bg-secondary/20" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/95 to-transparent" />
    </div>

    {/* Content */}
    <div className="relative h-full container mx-auto px-4">
      <div className="flex flex-col sm:flex-row h-full sm:items-end pb-4 sm:pb-8 gap-4 sm:gap-8">
        {/* Left Side - Poster & Buttons */}
        <div className="w-[200px] shrink-0 mx-auto sm:mx-0 -mt-20 md:-mt-8 sm:mt-0">
          <div className="w-full aspect-2/3 bg-secondary/20 rounded-lg shadow-lg animate-pulse" />
          <div className="mt-3 sm:mt-4 flex flex-col gap-2">
            <div className="w-full h-9 sm:h-10 bg-[#9147ff]/20 rounded-lg animate-pulse" />
            <div className="w-full h-9 sm:h-10 bg-secondary/20 rounded-lg border border-text/10 animate-pulse" />
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="flex-1 text-text text-center sm:text-left">
          {/* Title */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            <div className="h-8 sm:h-10 bg-secondary/20 rounded-xs w-3/4 mx-auto sm:mx-0 animate-pulse" />
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 mb-3">
            <div className="h-4 sm:h-5 bg-secondary/20 rounded-xs w-20 animate-pulse" />
            <div className="hidden sm:block h-4 sm:h-5 bg-secondary/20 rounded-xs w-1 animate-pulse" />
            <div className="h-4 sm:h-5 bg-secondary/20 rounded-xs w-16 animate-pulse" />
            <div className="hidden sm:block h-4 sm:h-5 bg-secondary/20 rounded-xs w-1 animate-pulse" />
            <div className="h-4 sm:h-5 bg-secondary/20 rounded-xs w-24 animate-pulse" />
            <div className="hidden sm:block h-4 sm:h-5 bg-secondary/20 rounded-xs w-1 animate-pulse" />
            <div className="h-4 sm:h-5 bg-secondary/20 rounded-xs w-28 animate-pulse" />
          </div>

          {/* Synopsis */}
          <div className="mb-4 sm:mb-6">
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-secondary/20 rounded-xs animate-pulse" />
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-2">
            {[
              { label: "Episodes", width: "w-32" },
              { label: "Status", width: "w-24" },
              { label: "Studios", width: "w-28" },
              { label: "Genres", width: "w-36" },
            ].map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="h-4 bg-secondary/20 rounded-xs w-16 animate-pulse" />
                <div className={`h-4 bg-secondary/20 rounded-xs ${item.width} animate-pulse`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSkeleton;
