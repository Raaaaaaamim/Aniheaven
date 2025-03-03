import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { calculateVideoProgressPercentage } from "../../lib/utils.js";
import CardSkeleton from "../skeletons/CardSkeleton.jsx";
import ContinueWatchingCard from "../ui/ContinueWatchingCard.jsx";
import ErrorCard from "../ui/ErrorCard.jsx";
import MagicLoader from "../ui/MagicLoader.jsx";

const ContinueWatchingTab = React.memo(function ContinueWatchingTab() {
  const {
    data,
    isFetchingNextPage,
    isFetchNextPageError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["continueWatching"],
    queryFn: async ({ pageParam = 1 }) => {
      return await axios.get(`/anime/continue-watching?page=${pageParam}`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.data?.hasNextPage ? allPages.length + 1 : undefined,
  });
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    console.log(inView);

    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <MagicLoader />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {data?.pages?.map((page) =>
          page.data?.data.map((anime, index) => (
            <ContinueWatchingCard
              key={anime.HiAnimeId + index}
              imageUrl={anime.poster}
              title={anime.name}
              animeId={anime.HiAnimeId}
              episodeId={anime.epId}
              timeStamp={anime.startFrom}
              subCount={anime.episodes?.sub}
              dubCount={anime.episodes?.dub}
              totalEpisodes={anime.episodes?.sub}
              episodeNumber={anime.epNumber}
              progress={calculateVideoProgressPercentage(
                anime?.duration,
                anime?.startFrom,
              )}
            />
          )),
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
        {isFetchNextPageError && <ErrorCard error={isFetchNextPageError} />}
        <div ref={ref}></div>
      </div>
    </div>
  );
});

export default ContinueWatchingTab;
