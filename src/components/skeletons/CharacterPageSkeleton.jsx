import { motion } from "framer-motion";

const CharacterPageSkeleton = () => {
  return (
    <div className="w-full min-h-screen font-outfit bg-background">
      {/* Hero Section */}
      <div className="relative mt-10 w-full min-h-[50vh] md:h-[60vh]">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-white/5 animate-pulse" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/95 to-transparent backdrop-blur-xs" />
          <div className="absolute inset-0 mask backdrop-blur-xs" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative md:-top-[25px] xl:-top-10 -top-20 container mx-auto px-4 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 w-full h-full pb-8">
            {/* Left Side - Character Image Skeleton */}
            <div className="w-[200px] sm:w-[240px] md:w-[280px] shrink-0 mx-auto md:mx-0 mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute bg-linear-to-r rounded-2xl opacity-75 blur-xs group-hover:opacity-100 transition-all duration-300" />
                <div className="relative aspect-3/4 rounded-xl overflow-hidden">
                  <div className="w-full h-full rounded-2xl scale-90 bg-white/5 animate-pulse" />
                </div>
              </motion.div>
            </div>

            {/* Right Side - Character Info Skeleton */}
            <div className="flex-1 text-white text-center md:text-left mb-5 mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3 md:space-y-4"
              >
                {/* Name Skeleton */}
                <div className="h-10 w-3/4 mx-auto md:mx-0 bg-white/5 animate-pulse rounded-lg" />
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
                  {/* Kanji Name Skeleton */}
                  <div className="h-8 w-48 bg-white/5 animate-pulse rounded-lg" />
                  {/* Favorites Count Skeleton */}
                  <div className="h-8 w-32 bg-white/5 animate-pulse rounded-full" />
                </div>

                {/* Nicknames Skeleton */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 px-2 md:px-0">
                  {[1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="h-6 w-20 bg-primary/20 animate-pulse rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterPageSkeleton;
