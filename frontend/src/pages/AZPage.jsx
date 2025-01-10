import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, useInView } from "framer-motion";
import { parseAsString, useQueryState } from "nuqs";
import React, { useEffect, useRef } from "react";
import Card from "../components/ui/Card.jsx";
import CardSkeleton from "../components/ui/CardSkeleton.jsx";
import ErrorCard from "../components/ui/ErrorCard.jsx";
import { api } from "./Home.jsx";

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
    parseAsString.withDefault("all")
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
      return await axios.get(
        `${api}/hianime/azlist/${selected}?page=${pageParam}`
      );
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

  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  console.log(data);

  return (
    <div className="w-full min-h-screen flex flex-col items-center  bg-background/95">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 flex items-center space-x-4">
          <h1 className="text-2xl md:text-3xl font-outfit font-bold bg-gradient-to-r from-text/90 to-text/60 bg-clip-text text-transparent">
            Browse Anime
          </h1>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent"></div>
        </div>

        {/* Character Navigation */}
        <div className="relative ">
          <div className="flex flex-wrap gap-x-2 gap-y-3 justify-center items-center p-4 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/5">
            {characters.map((char, i) => (
              <button
                key={char}
                onClick={() => setSelected(char)}
                className={`
                  relative group
                  min-w-7 min-h-7 md:min-w-8 md:min-h-8
                  flex items-center px-2 justify-center
                  rounded-lg
                  transition-all duration-200
                  ${
                    selected === char
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-white/[0.03]"
                  }
                `}
              >
                {/* Character */}
                <span
                  className={`
                  font-outfit text-sm md:text-base uppercase
                  transition-all duration-200
                  ${
                    selected === i
                      ? "font-semibold"
                      : "text-text/60 group-hover:text-text/90"
                  }
                `}
                >
                  {char}
                </span>

                {/* Highlight Effect */}
                <div
                  className={`
                  absolute inset-0 -z-10
                  transition-all duration-300
                  ${
                    selected === i
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                  }
                `}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
                  <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className=" w-full px-4 flex flex-col items-center  ">
        <div className=" w-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-5 gap-4 ">
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
              className="flex justify-center items-center w-full h-full text-xs lg:text-sm font-outfit"
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
