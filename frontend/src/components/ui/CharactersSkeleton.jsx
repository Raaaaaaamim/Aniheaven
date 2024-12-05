const CharactersSkeleton = () => (
  <section className="container mx-auto lg:mt-0 px-4 py-8">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-1 h-8 bg-primary rounded" />
      <div className="h-8 bg-secondary/20 rounded w-48 animate-pulse" />
    </div>
    
    <div className="grid font-outfit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex bg-secondary/5 hover:bg-secondary/10 p-4 rounded-lg transition-all duration-300"
        >
          {/* Character Side */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative">
              <div className="w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] rounded-full bg-secondary/20 ring-2 ring-primary/20 animate-pulse" />
              <div className="absolute -bottom-1 right-0 h-[18px] w-14 bg-secondary/90 rounded-full animate-pulse" />
            </div>
            <div className="w-full mt-2">
              <div className="h-4 bg-secondary/20 rounded w-24 mx-auto animate-pulse" />
            </div>
          </div>

          {/* Divider */}
          <div className="mx-3 self-stretch w-[1px] bg-text/10" />

          {/* Voice Actor Side */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative">
              <div className="w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] rounded-full bg-secondary/20 ring-2 ring-primary/20 animate-pulse" />
              <div className="absolute -bottom-1 right-0 h-[18px] w-14 bg-primary/90 rounded-full animate-pulse" />
            </div>
            <div className="w-full mt-2">
              <div className="h-4 bg-secondary/20 rounded w-24 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CharactersSkeleton;
