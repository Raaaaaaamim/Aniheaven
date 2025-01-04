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
      return axios.get(`${api}/hianime/category/${name}?page=${pageParam} 
`);
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
  // console log stuffs
  console.log(data);

  return (
    <div className=" w-full h-full flex flex-col justify-center items-center  ">
      <div className=" w-full py-6 px-2 flex flex-wrap justify-start items-center   gap-6 flex-col rounded-2xl ">
        <h2 className=" px-2 border-l-4 border-l-primary self-start ml-2 font-outfit font-semibold text-lg ">
          All Categories
        </h2>
        <div className=" flex  flex-wrap gap-2 justify-center items-center ">
          {categories.map((category) => (
            <button
              key={category}
              className={` ${
                name === category
                  ? "bg-primary/80 hover:bg-primary/90"
                  : "hover:bg-white/[0.05]"
              } flex px-3 bg-background border-white/[0.05] rounded-xl py-2 text-sm hover:bg-white/[0.05] ease-in duration-200 font-semibold border-[1px] font-poppins justify-center items-center `}
              onClick={() => setName(category)}
            >
              <div className=" flex justify-center items-center">
                <span className=" capitalize font-poppins">
                  {category.split("-").join(" ")}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className=" w-full py-6 px-2 flex flex-wrap justify-start items-center   gap-6 flex-col rounded-2xl ">
        <h2 className=" px-2 border-l-4 border-l-primary self-start ml-2 font-outfit font-semibold text-lg capitalize ">
          {name.split("-").join(" ")}
        </h2>
        <motion.div
          variants={{
            staggerChildren: 0.1,
            delayChildren: 0.1,
          }}
          className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center 2xl:grid-cols-6 gap-3 xl:gap-5 "
        >
          {isLoading ? (
            Array(10)
              .fill(0)
              .map((_, index) => <AnimeCardSkeleton key={index} />)
          ) : !isError ? (
            data.pages.map((page) =>
              page?.data?.data?.animes.map((anime) => (
                <AnimeCard
                  hide
                  key={anime.id}
                  name={anime.name}
                  id={anime.id}
                  image={anime.poster}
                  subCount={anime.episodes.sub}
                  dubCount={anime.episodes.dub}
                />
              ))
            )
          ) : (
            <ErrorCard error={error} />
          )}
        </motion.div>
      </div>
    </div>
  );
};
