import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { parseAsString, useQueryState } from "nuqs";
import React from "react";
import AnimeCard from "../components/ui/AnimeCard.jsx";
import AnimeCardSkeleton from "../components/ui/AnimeCardSkeleton.jsx";
import ErrorCard from "../components/ui/ErrorCard.jsx";
import { api } from "./Home.jsx";

export const CategoryPage = () => {
  const [name, setName] = useQueryState(
    "name",
    parseAsString.withDefault("recently-updated")
  );

  const { data, isError, isLoading, error } = useInfiniteQuery({
    queryKey: [name || ""],
    queryFn: ({ pageParam }) => {
      return axios.get(`${api}/hianime/category/${name}?page=${pageParam}`);
    },
    initialPageParam: 1,
    getNextPageParam: (prevPage, allPages) => {
      if (prevPage?.data?.data?.hasNextPage) {
        return allPages.length + 1;
      } else {
        return false;
      }
    },
  });

  const categories = [
    "most-favorite",
    "most-popular",
    "subbed-anime",
    "dubbed-anime",
    "recently-updated",
    "recently-added",
    "top-upcoming",
    "top-airing",
    "movie",
    "special",
    "ova",
    "ona",
    "tv",
    "completed",
  ];

  return (
    <div className="w-full min-h-screen bg-background/95">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <h1 className="text-2xl md:text-3xl font-outfit font-bold bg-gradient-to-r from-text/90 to-text/60 bg-clip-text text-transparent">
            Browse Categories
          </h1>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent"></div>
        </div>

        {/* Category Pills */}
        <div className="relative mb-12">
          <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setName(category)}
                className={`
                  relative group px-4 py-2 rounded-xl
                  font-outfit text-sm font-medium
                  transition-all duration-300
                  border border-white/[0.05]
                  ${
                    name === category
                      ? "bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border-primary/30"
                      : "hover:bg-white/[0.03]"
                  }
                `}
              >
                {/* Background Glow */}
                <div
                  className={`
                    absolute inset-0 -z-10 rounded-xl
                    bg-gradient-to-r from-primary/20 via-transparent to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    ${name === category ? "opacity-100" : ""}
                  `}
                />

                {/* Text with Gradient */}
                <span
                  className={`
                    bg-gradient-to-r
                    ${
                      name === category
                        ? "from-primary to-primary/70"
                        : "from-text/90 to-text/60 group-hover:from-primary/90 group-hover:to-primary/60"
                    }
                    bg-clip-text text-transparent
                    transition-all duration-300
                    capitalize
                  `}
                >
                  {category.split("-").join(" ")}
                </span>

                {/* Active Indicator */}
                <div
                  className={`
                    absolute -bottom-[2px] left-1/2 -translate-x-1/2
                    w-12 h-[2px] rounded-full
                    bg-gradient-to-r from-primary to-transparent
                    transition-all duration-300
                    ${
                      name === category
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }
                  `}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative">
          <div className="mb-6 flex items-center space-x-4">
            <h2 className="text-xl font-outfit font-bold bg-gradient-to-r from-text/90 to-text/60 bg-clip-text text-transparent capitalize">
              {name.split("-").join(" ")}
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>

          <motion.div
            variants={{
              staggerChildren: 0.1,
              delayChildren: 0.1,
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 gap-4 place-items-center xl:gap-6"
          >
            {isLoading ? (
              Array(10)
                .fill(0)
                .map((_, index) => <AnimeCardSkeleton key={index} />)
            ) : !isError ? (
              data.pages.map((page) =>
                page?.data?.data?.animes.map((anime, index) => (
                  <motion.div
                    key={anime.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "backOut",
                    }}
                  >
                    <AnimeCard
                      hide
                      key={anime.id}
                      name={anime.name}
                      id={anime.id}
                      image={anime.poster}
                      subCount={anime.episodes.sub}
                      dubCount={anime.episodes.dub}
                    />
                  </motion.div>
                ))
              )
            ) : (
              <ErrorCard error={error} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
