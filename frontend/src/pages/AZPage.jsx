import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { parseAsString, useQueryState } from "nuqs";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CardSkeleton from "../components/skeletons/CardSkeleton.jsx";
import Card from "../components/ui/Card.jsx";
import ErrorCard from "../components/ui/ErrorCard.jsx";
const AZPage = () => {
  const characters = [
    "all",
    "other",
    "0-9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const [selected, setSelected] = useQueryState(
    "sortby",
    parseAsString.withDefault("all"),
  );

  const {
    data,
    isLoading,
    isFetchNextPageError,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["AZ", selected],
    queryFn: async ({ pageParam = 1 }) => {
      return await axios.get(`/hianime/azlist/${selected}?page=${pageParam}`);
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

  const { inView, ref } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  console.log(data);

  return (
    <div className="bg-background/95 flex min-h-screen w-full flex-col items-center">
      {/* Decorative Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-1/2 -right-1/2 h-full w-full rounded-full blur-3xl"></div>
        <div className="bg-primary/3 absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="mb-12 flex items-center space-x-4">
          <h1 className="font-outfit from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            Browse Anime
          </h1>
          <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
        </div>

        {/* Character Navigation */}
        <div className="relative">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-xs">
            {characters.map((char, i) => (
              <button
                key={char}
                onClick={() => setSelected(char)}
                className={`group relative flex min-h-7 min-w-7 items-center justify-center rounded-lg px-2 transition-all duration-200 md:min-h-8 md:min-w-8 ${
                  selected === char
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-white/[0.03]"
                } `}
              >
                {/* Character */}
                <span
                  className={`font-outfit text-sm uppercase transition-all duration-200 md:text-base ${
                    selected === i
                      ? "font-semibold"
                      : "text-text/60 group-hover:text-text/90"
                  } `}
                >
                  {char}
                </span>

                {/* Highlight Effect */}
                <div
                  className={`absolute inset-0 -z-10 transition-all duration-300 ${
                    selected === i
                      ? "scale-100 opacity-100"
                      : "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  } `}
                >
                  <div className="from-primary/10 absolute inset-0 rounded-lg bg-linear-to-br via-transparent to-transparent"></div>
                  <div className="from-primary/20 via-primary/5 absolute -inset-[1px] rounded-lg bg-linear-to-br to-transparent opacity-0 group-hover:opacity-100"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center px-4">
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {isLoading ? (
            Array(12)
              .fill(0)
              .map((_, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "backOut",
                  }}
                  key={index}
                >
                  <CardSkeleton key={index} />
                </motion.div>
              ))
          ) : isError ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-outfit flex h-full w-full items-center justify-center text-xs lg:text-sm"
            >
              Error loading content
            </motion.div>
          ) : (
            data?.pages?.map((page, index) => (
              <React.Fragment key={index}>
                {page?.data?.data?.animes?.map((anime, index) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "backOut",
                    }}
                    key={index}
                  >
                    <Card
                      imageUrl={anime?.poster}
                      title={anime?.name}
                      id={anime?.id}
                      upcoming={anime?.upcoming || false}
                      subCount={anime?.subCount}
                      dubCount={anime?.dubCount}
                    />
                  </motion.div>
                ))}
              </React.Fragment>
            ))
          )}
          {isFetchingNextPage &&
            !isFetchNextPageError &&
            Array(10)
              .fill(0)
              .map((_, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "backOut",
                  }}
                  key={index}
                >
                  <CardSkeleton key={index} />
                </motion.div>
              ))}
          {isFetchNextPageError && <ErrorCard />}

          <div ref={ref}></div>
        </div>
      </div>
    </div>
  );
};

export default AZPage;
