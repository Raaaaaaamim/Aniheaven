import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import { parseAsString, useQueryState } from "nuqs";
import React, { useCallback, useState } from "react";
import { BsFilterLeft, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import Card from "../components/ui/Card";
import CardSkeleton from "../components/ui/CardSkeleton.jsx";
import DatePicker from "../components/ui/DatePicker";
import { api } from "../services/api";

const Search = () => {
  const [debouncedSearchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString.withDefault("")
  );
  const [type, setType] = useQueryState("type", parseAsString.withDefault(""));
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault("")
  );
  const [season, setSeason] = useQueryState(
    "season",
    parseAsString.withDefault("")
  );
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault(""));
  const [genres, setGenres] = useQueryState(
    "genres",
    parseAsString.withDefault("")
  );
  const [isFilterOpen, setIsFilterOpen] = useState(
    debouncedSearchQuery !== "" ? false : true
  );

  const [startDate, setStartDate] = useQueryState(
    "start_date",
    parseAsString.withDefault("")
  );
  const [endDate, setEndDate] = useQueryState(
    "end_date",
    parseAsString.withDefault("")
  );
  const [rated, setRated] = useQueryState(
    "rated",
    parseAsString.withDefault("")
  );
  const [score, setScore] = useQueryState(
    "score",
    parseAsString.withDefault("")
  );
  const [language, setLanguage] = useQueryState(
    "language",
    parseAsString.withDefault("")
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
      const response = await axios.get(
        `${api}/hianime/search?q=${encodeURIComponent(
          debouncedSearchQuery
        )}&type=${type}&status=${status}&season=${season}&sort=${sort}&genres=${genres}&page=${pageParam}&start_date=${startDate}&end_date=${endDate}&rated=${rated}&score=${score}&language=${language}`
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
    [setSearchQuery]
  );

  const handleSearchInput = (e) => {
    const value = e.target.value;
    debouncedSetSearchQuery(value);
  };

  return (
    <div className="min-h-screen w-full bg-[#0D0D0D] px-2 md:px-4 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,#1a1a1a_0%,transparent_25%)] animate-[spin_60s_linear_infinite]" />
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
          <div className="max-w-3xl mx-auto text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[2rem] md:text-[2.5rem] font-bold mb-2 text-white/90 tracking-[-0.02em] leading-tight [text-shadow:_0_2px_10px_rgba(255,255,255,0.1)]"
            >
              Discover Anime
            </motion.h1>
          </div>

          {/* Modern Search Bar */}
          <div className="relative max-w-2xl mx-auto px-4">
            <div className="relative overflow-hidden bg-[#141414]/80 backdrop-blur-sm rounded-2xl border border-white/[0.05] shadow-xl group hover:border-white/10 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <input
                type="text"
                defaultValue={debouncedSearchQuery}
                onChange={handleSearchInput}
                placeholder="Search for anime..."
                className="w-full bg-transparent text-base md:text-lg px-6 md:px-8 py-4 md:py-5 rounded-2xl text-white/90 placeholder:text-zinc-500 focus:outline-none relative z-10"
              />
              <div className="absolute right-3 flex items-center gap-1.5 top-1/2 -translate-y-1/2 z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setSort(
                      sort === "recently-updated" ? "score" : "recently-updated"
                    )
                  }
                  className="p-2 md:p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] transition-all duration-300"
                >
                  {sort === "recently-updated" ? (
                    <BsSortDownAlt className="text-lg md:text-xl text-zinc-400 group-hover:text-zinc-300 transition-colors" />
                  ) : (
                    <BsSortDown className="text-lg md:text-xl text-zinc-400 group-hover:text-zinc-300 transition-colors" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="p-2 md:p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] transition-all duration-300"
                >
                  <BsFilterLeft className="text-lg md:text-xl text-zinc-400 group-hover:text-zinc-300 transition-colors" />
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
          <div className="relative max-w-6xl mx-auto my-8">
            <div className="relative bg-[#141414]/80 backdrop-blur-sm rounded-2xl border border-white/[0.05] shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
              {/* Filter Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 p-6 md:p-8 relative">
                {/* Date Range */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 col-span-full md:col-span-2 lg:col-span-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
                    <h3 className="text-[11px] font-medium text-zinc-400 tracking-[0.2em] uppercase flex-shrink-0 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                      Date Range
                    </h3>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
                  </div>
                  <div className="flex gap-3 flex-wrap justify-center">
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
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
                      <h3 className="text-[11px] font-medium text-zinc-400 tracking-[0.2em] uppercase flex-shrink-0 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                        {category.title}
                      </h3>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
                    </div>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {category.items.map((item) => (
                        <motion.button
                          key={item}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            category.setState(
                              category.state === item ? "" : item
                            )
                          }
                          className={`relative px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs transition-all duration-300 overflow-hidden ${
                            category.state === item
                              ? "bg-white/[0.08] text-white font-medium shadow-lg shadow-black/20 backdrop-blur-sm"
                              : "text-zinc-400 hover:text-white hover:bg-white/[0.04] hover:shadow-lg hover:shadow-black/10"
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
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
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
                    <h3 className="text-[11px] font-medium text-zinc-400 tracking-[0.2em] uppercase flex-shrink-0 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">
                      Genres
                    </h3>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
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
                        className={`relative px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs transition-all duration-300 overflow-hidden ${
                          genres.split(",").includes(genre)
                            ? "bg-white/[0.08] text-white font-medium shadow-lg shadow-black/20 backdrop-blur-sm"
                            : "text-zinc-400 hover:text-white hover:bg-white/[0.04] hover:shadow-lg hover:shadow-black/10"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
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
            className="relative max-w-[2000px] mx-auto mt-12 px-4"
          >
            <div className="flex items-center justify-between mb-10">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl md:text-2xl font-medium text-white/90 "
              >
                Results for &quot;{debouncedSearchQuery}&quot;
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-zinc-400 flex items-center gap-2"
              >
                <span className="text-xl md:text-2xl font-medium text-white/90 ">
                  {searchResults?.pages?.reduce(
                    (total, page) => total + (page?.data?.animes?.length || 0),
                    0
                  ) || 0}
                </span>
                <span className="text-xs md:text-sm tracking-wide">
                  results found
                </span>
              </motion.div>
            </div>

            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 place-items-center  gap-6">
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
                    ))
                  )}
            </div>

            {/* Load More Button */}
            {hasNextPage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mt-16"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fetchNextPage()}
                  disabled={isLoading}
                  className="relative group"
                >
                  <div className="px-8 py-4 bg-[#141414]/80 backdrop-blur-sm rounded-xl border border-white/[0.05] flex items-center gap-3 transition-all duration-300 hover:border-primary/20">
                    {isFetchingNextPage ? (
                      <>
                        <div className="loading loading-spinner loading-sm text-primary" />
                        <span className="text-zinc-400">
                          Loading more anime...
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-white group-hover:text-primary transition-colors">
                          Discover More
                        </span>
                        <svg
                          className="w-5 h-5 text-primary transform transition-transform duration-300 group-hover:translate-x-1"
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
