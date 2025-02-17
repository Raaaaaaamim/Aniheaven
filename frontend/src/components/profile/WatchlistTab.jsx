import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { parseAsString, useQueryState } from "nuqs";
import Card from "../ui/Card.jsx";
import Loader from "../ui/Loader.jsx";

const WatchlistTab = () => {
  const [page, setPage] = useQueryState("page", parseAsString.withDefault("1"));
  const { data, isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      return await axios.get(`/anime/watchlist?page=${page}`);
    },
  });
  const animes = data?.data.data;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader size="md" />
      </div>
    );
  }

  return (
    <div className="sectionA w-full p-4">
      <div className="grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {animes?.map((anime, index) => (
            <Card
              key={anime.HiAnimeId + index}
              imageUrl={anime.poster}
              title={anime.name}
              id={anime.HiAnimeId}
              subCount={anime.episodes?.sub}
              dubCount={anime.episodes?.dub}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WatchlistTab;
