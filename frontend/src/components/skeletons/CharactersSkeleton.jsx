import { motion } from "framer-motion";
const CharactersSkeleton = () => {
  return (
    <section className="container mx-auto lg:mt-0 px-4 py-8">
      {/* Header Skeleton */}
      <div className="flex items-center space-x-4 font-outfit mb-6">
        <div className="h-7 w-48 bg-secondary/10 rounded-xs animate-pulse"></div>
        <div className="flex-1 h-[1px] bg-linear-to-r from-primary/20 to-transparent"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid font-outfit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "backOut",
            }}
            key={index}
            className="relative bg-secondary/5 rounded-xl overflow-hidden"
          >
            <div className="relative p-4">
              <div className="flex gap-4">
                {/* Character Image Skeleton */}
                <div className="relative w-20 h-28 bg-secondary/10 rounded-lg animate-pulse">
                  <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent"></div>
                </div>

                {/* Character Info Skeleton */}
                <div className="flex-1 min-w-0">
                  <div className="h-4 w-24 bg-secondary/10 rounded-xs animate-pulse mb-1"></div>
                  <div className="h-3 w-16 bg-secondary/10 rounded-xs animate-pulse mb-3"></div>

                  {/* Voice Actors Skeleton */}
                  <div className="space-y-2">
                    {[...Array(2)].map((_, vaIndex) => (
                      <div key={vaIndex} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary/10 animate-pulse"></div>
                        <div className="h-3 w-20 bg-secondary/10 rounded-xs animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-2 right-2 flex gap-1">
                <span className="w-1 h-1 rounded-full bg-secondary/20"></span>
                <span className="w-1 h-1 rounded-full bg-secondary/20"></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CharactersSkeleton;
