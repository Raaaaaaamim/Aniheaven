import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { parseAsString, useQueryState } from "nuqs";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCardSkeleton from "../components/skeletons/AnimeCardSkeleton.jsx";

import AnimeCard from "../components/ui/AnimeCard.jsx";
import ErrorCard from "../components/ui/ErrorCard.jsx";

export const CategoryPage = () => {
  const [name, setName] = useQueryState(
    "name",
    parseAsString.withDefault("recently-updated"),
  );

  const {
    data,
    isError,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    isFetchNextPageError,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [name || ""],
    queryFn: ({ pageParam }) => {
      return axios.get(`/hianime/category/${name}?page=${pageParam}`);
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
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <div className="bg-background/95 min-h-screen w-full">
      {/* Decorative Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-1/2 -right-1/2 h-full w-full rounded-full blur-3xl"></div>
        <div className="bg-primary/3 absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <h1 className="font-outfit from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            Browse Categories
          </h1>
          <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
        </div>

        {/* Category Pills */}
        <div className="relative mb-12">
          <div className="flex flex-wrap gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-xs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setName(category)}
                className={`group font-outfit relative rounded-xl border border-white/[0.05] px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  name === category
                    ? "from-primary/20 via-primary/10 border-primary/30 bg-linear-to-r to-transparent"
                    : "hover:bg-white/[0.03]"
                } `}
              >
                {/* Background Glow */}
                <div
                  className={`from-primary/20 absolute inset-0 -z-10 rounded-xl bg-linear-to-r via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${name === category ? "opacity-100" : ""} `}
                />

                {/* Text with Gradient */}
                <span
                  className={`bg-linear-to-r ${
                    name === category
                      ? "from-primary to-primary/70"
                      : "from-text/90 to-text/60 group-hover:from-primary/90 group-hover:to-primary/60"
                  } bg-clip-text text-transparent capitalize transition-all duration-300`}
                >
                  {category.split("-").join(" ")}
                </span>

                {/* Active Indicator */}
                <div
                  className={`from-primary absolute -bottom-[2px] left-1/2 h-[2px] w-12 -translate-x-1/2 rounded-full bg-linear-to-r to-transparent transition-all duration-300 ${
                    name === category
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  } `}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="relative">
          <div className="mb-6 flex items-center space-x-4">
            <h2 className="font-outfit from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-xl font-bold text-transparent capitalize">
              {name.split("-").join(" ")}
            </h2>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 place-items-center gap-4 md:grid-cols-3 lg:grid-cols-5 xl:gap-6 2xl:grid-cols-6">
            {isLoading ? (
              Array(10)
                .fill(0)
                .map((_, index) => (
                  <AnimeCardSkeleton key={index} index={index} />
                ))
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
                )),
              )
            ) : (
              <ErrorCard error={error} />
            )}

            {isFetchingNextPage &&
              !isFetchNextPageError &&
              Array(10)
                .fill(0)
                .map((_, index) => (
                  <AnimeCardSkeleton key={index} index={index} />
                ))}
            {isFetchNextPageError && <ErrorCard error={isFetchNextPageError} />}
            <div ref={ref}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
