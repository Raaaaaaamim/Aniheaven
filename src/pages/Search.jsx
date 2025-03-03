import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import { parseAsString, useQueryState } from "nuqs";
import React, { useCallback, useState } from "react";
import { BsFilterLeft, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import CardSkeleton from "../components/skeletons/CardSkeleton.jsx";
import Card from "../components/ui/Card";
import DatePicker from "../components/ui/DatePicker";

const Search = () => {
  const [debouncedSearchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault(""),
  );
  const [type, setType] = useQueryState("type", parseAsString.withDefault(""));
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault(""),
  );
  const [season, setSeason] = useQueryState(
    "season",
    parseAsString.withDefault(""),
  );
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault(""));
  const [genres, setGenres] = useQueryState(
    "genres",
    parseAsString.withDefault(""),
  );
  const [isFilterOpen, setIsFilterOpen] = useState(
    debouncedSearchQuery !== "" ? false : true,
  );

  const [startDate, setStartDate] = useQueryState(
    "start_date",
    parseAsString.withDefault(""),
  );
  const [endDate, setEndDate] = useQueryState(
    "end_date",
    parseAsString.withDefault(""),
  );
  const [rated, setRated] = useQueryState(
    "rated",
    parseAsString.withDefault(""),
  );
  const [score, setScore] = useQueryState(
    "score",
    parseAsString.withDefault(""),
  );
  const [language, setLanguage] = useQueryState(
    "language",
    parseAsString.withDefault(""),
  );

  const types = ["tv", "ova", "movie", "special", "ona"];
  const statuses = ["currently-airing", "finished-airing", "not-yet-aired"];
  const seasons = ["winter", "spring", "summer", "fall"];
  const ratings = ["pg-13", "r", "r+"];
  const scores = [
    "appalling",
    "horrible",
    "very-bad",
    "bad",
    "average",
    "fine",
    "good",
    "very-good",
    "great",
    "masterpiece",
  ];
  const languages = ["sub", "dub", "sub-&-dub"];
  const sortOptions = ["name-a-z", "name-z-a", "recently-updated", "score"];

  const genresList = [
    "action",
    "adventure",
    "cars",
    "comedy",
    "dementia",
    "demons",
    "drama",
    "ecchi",
    "fantasy",
    "game",
    "harem",
    "historical",
    "horror",
    "isekai",
    "josei",
    "kids",
    "magic",
    "martial-arts",
    "mecha",
    "military",
    "music",
    "mystery",
    "parody",
    "police",
    "psychological",
    "romance",
    "samurai",
    "school",
    "sci-fi",
    "seinen",
    "shoujo",
    "shoujo-ai",
    "shounen",
    "shounen-ai",
    "slice-of-life",
    "space",
    "sports",
    "super-power",
    "supernatural",
    "thriller",
    "vampire",
  ];

  const {
    data: searchResults,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "search",
      debouncedSearchQuery,
      type,
      status,
      season,
      sort,
      genres,
      startDate,
      endDate,
      rated,
      score,
      language,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const formatDate = (date) => {
        if (!date) return "";
        const [year, month, day] = date.split("-").map((part) => part || "0");
        return `${year}-${month}-${day}`;
      };
      const response = await axios.get(
        `/hianime/search?q=${encodeURIComponent(
          debouncedSearchQuery,
        )}&type=${type}&status=${status}&season=${season}&sort=${sort}&genres=${genres}&page=${pageParam}&start_date=${formatDate(
          startDate,
        )}&end_date=${formatDate(
          endDate,
        )}&rated=${rated}&score=${score}&language=${language}`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.hasNextPage ? lastPage?.data?.currentPage + 1 : undefined,
    enabled: debouncedSearchQuery.length > 0,
  });

  const debouncedSetSearchQuery = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    [setSearchQuery],
  );

  const handleSearchInput = (e) => {
    const value = e.target.value;
    debouncedSetSearchQuery(value);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0D0D0D] px-2 md:px-4">
      {/* Modern Background Elements */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] animate-[spin_60s_linear_infinite] bg-[radial-gradient(circle_at_center,#1a1a1a_0%,transparent_25%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(132,95,214,0.05),transparent_50%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 pb-4"
        >
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-outfit from-text/90 to-text/60 mb-2 bg-linear-to-r bg-clip-text text-[2rem] leading-tight font-bold tracking-[-0.02em] text-transparent md:text-[2.5rem]"
            >
              Discover Anime
            </motion.h1>
          </div>

          {/* Modern Search Bar */}
          <div className="relative mx-auto max-w-2xl px-4">
            <div className="group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#141414]/80 shadow-xl backdrop-blur-xs transition-all duration-500 hover:border-white/10">
              <div className="absolute inset-0 bg-linear-to-r from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <input
                type="text"
                defaultValue={debouncedSearchQuery}
                onChange={handleSearchInput}
                placeholder="Search for anime..."
                className="relative z-10 w-full rounded-2xl bg-transparent px-6 py-4 text-base text-white/90 placeholder:text-zinc-500 focus:outline-hidden md:px-8 md:py-5 md:text-lg"
              />
              <div className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 items-center gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setSort(
                      sort === "recently-updated"
                        ? "score"
                        : "recently-updated",
                    )
                  }
                  className="rounded-xl bg-white/[0.02] p-2 transition-all duration-300 hover:bg-white/[0.08] md:p-2.5"
                >
                  {sort === "recently-updated" ? (
                    <BsSortDownAlt className="text-lg text-zinc-400 transition-colors group-hover:text-zinc-300 md:text-xl" />
                  ) : (
                    <BsSortDown className="text-lg text-zinc-400 transition-colors group-hover:text-zinc-300 md:text-xl" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="rounded-xl bg-white/[0.02] p-2 transition-all duration-300 hover:bg-white/[0.08] md:p-2.5"
                >
                  <BsFilterLeft className="text-lg text-zinc-400 transition-colors group-hover:text-zinc-300 md:text-xl" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Panel */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isFilterOpen ? "auto" : 0,
            opacity: isFilterOpen ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="relative mx-auto my-8 max-w-6xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#141414]/80 shadow-xl backdrop-blur-xs">
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/[0.02] to-transparent" />
              {/* Filter Categories */}
              <div className="relative grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:gap-10 md:p-8 lg:grid-cols-3">
                {/* Date Range */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full space-y-3 md:col-span-2 lg:col-span-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] flex-1 bg-linear-to-r from-transparent via-white/[0.05] to-transparent" />
                    <h3 className="shrink-0 text-[11px] font-medium tracking-[0.2em] text-zinc-400 uppercase [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                      Date Range
                    </h3>
                    <div className="h-[1px] flex-1 bg-linear-to-r from-transparent via-white/[0.05] to-transparent" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <DatePicker
                      value={startDate}
                      onChange={setStartDate}
                      placeholder="Start date"
                    />
                    <DatePicker
                      value={endDate}
                      onChange={setEndDate}
                      placeholder="End date"
                    />
                  </div>
                </motion.div>

                {/* Main Filter Categories */}
                {[
                  {
                    title: "Type",
                    items: types,
                    state: type,
                    setState: setType,
                  },
                  {
                    title: "Status",
                    items: statuses,
                    state: status,
                    setState: setStatus,
                  },
                  {
                    title: "Rating",
                    items: ratings,
                    state: rated,
                    setState: setRated,
                  },
                  {
                    title: "Score",
                    items: scores,
                    state: score,
                    setState: setScore,
                  },
                  {
                    title: "Season",
                    items: seasons,
                    state: season,
                    setState: setSeason,
                  },
                  {
                    title: "Language",
                    items: languages,
                    state: language,
                    setState: setLanguage,
                  },
                ].map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-[1px] flex-1 bg-linear-to-r from-transparent via-white/[0.05] to-transparent" />
                      <h3 className="shrink-0 text-[11px] font-medium tracking-[0.2em] text-zinc-400 uppercase [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                        {category.title}
                      </h3>
                      <div className="h-[1px] flex-1 bg-linear-to-r from-transparent via-white/[0.05] to-transparent" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {category.items.map((item) => (
                        <motion.button
                          key={item}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            category.setState(
                              category.state === item ? "" : item,
                            )
                          }
                          className={`relative overflow-hidden rounded-lg px-3 py-1.5 text-[10px] transition-all duration-300 md:px-4 md:py-2 md:text-xs ${
                            category.state === item
                              ? "bg-white/[0.08] font-medium text-white shadow-lg shadow-black/20 backdrop-blur-xs"
                              : "text-zinc-400 hover:bg-white/[0.04] hover:text-white hover:shadow-lg hover:shadow-black/10"
                          }`}
                        >
                          <div className="absolute inset-0 bg-linear-to-r from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
                          <span className="relative z-10">
                            {item.replace(/-/g, " ").toUpperCase()}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Genres Section */}
              <div className="relative border-t border-white/[0.05] p-6 md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/[0.02] to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] flex-1 bg-linear-to-r from-transparent via-white/[0.05] to-transparent" />
                    <h3 className="shrink-0 text-[11px] font-medium tracking-[0.2em] text-zinc-400 uppercase [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                      Genres
                    </h3>
                    <div className="h-[1px] flex-1 bg-linear-to-r from-transparent via-white/[0.05] to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {genresList.map((genre) => (
                      <motion.button
                        key={genre}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const currentGenres = genres
                            .split(",")
                            .filter(Boolean);
                          const newGenres = currentGenres.includes(genre)
                            ? currentGenres.filter((g) => g !== genre)
                            : [...currentGenres, genre];
                          setGenres(newGenres.join(","));
                        }}
                        className={`relative overflow-hidden rounded-lg px-3 py-1.5 text-[10px] transition-all duration-300 md:px-4 md:py-2 md:text-xs ${
                          genres.split(",").includes(genre)
                            ? "bg-white/[0.08] font-medium text-white shadow-lg shadow-black/20 backdrop-blur-xs"
                            : "text-zinc-400 hover:bg-white/[0.04] hover:text-white hover:shadow-lg hover:shadow-black/10"
                        }`}
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
                        <span className="relative z-10">
                          {genre.replace(/-/g, " ").toUpperCase()}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Results */}
        {debouncedSearchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto mt-12 max-w-[2000px] px-4"
          >
            <div className="mb-10 flex items-center justify-between">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-medium text-white/90 md:text-2xl"
              >
                Results for &quot;{debouncedSearchQuery}&quot;
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-zinc-400"
              >
                <span className="text-xl font-medium text-white/90 md:text-2xl">
                  {searchResults?.pages?.reduce(
                    (total, page) => total + (page?.data?.animes?.length || 0),
                    0,
                  ) || 0}
                </span>
                <span className="text-xs tracking-wide md:text-sm">
                  results found
                </span>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 place-items-center gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
              {isLoading
                ? Array(12)
                    .fill(0)
                    .map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                          ease: "backOut",
                        }}
                      >
                        <CardSkeleton />
                      </motion.div>
                    ))
                : searchResults?.pages?.map((page) =>
                    page?.data?.animes?.map((anime, index) => (
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
                        <Card
                          imageUrl={anime?.poster}
                          title={anime?.name}
                          id={anime?.id}
                          upcoming={anime?.upcoming}
                          subCount={anime?.subCount}
                          dubCount={anime?.dubCount}
                        />
                      </motion.div>
                    )),
                  )}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fetchNextPage()}
                  disabled={isLoading}
                  className="group relative"
                >
                  <div className="hover:border-primary/20 flex items-center gap-3 rounded-xl border border-white/[0.05] bg-[#141414]/80 px-8 py-4 backdrop-blur-xs transition-all duration-300">
                    {isFetchingNextPage ? (
                      <>
                        <div className="loading loading-spinner loading-sm text-primary" />
                        <span className="text-zinc-400">
                          Loading more anime...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="group-hover:text-primary text-white transition-colors">
                          Discover More
                        </span>
                        <svg
                          className="text-primary h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
