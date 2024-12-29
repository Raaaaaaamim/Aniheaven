import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";
import { parseAsString, useQueryState } from "nuqs";
import React, { useCallback, useState } from "react";
import { BsFilterLeft, BsSortDown, BsSortDownAlt } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
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
    <div className="min-h-screen w-full bg-background px-2 md:px-4 ">
      {/* Search Header */}
      <div className="flex flex-col gap-6 mb-5">
        <div className="relative w-full max-w-3xl mx-auto">
          <input
            type="text"
            defaultValue={debouncedSearchQuery}
            onChange={handleSearchInput}
            placeholder="Search anime..."
            className="w-full bg-[#0f0f0f] text-text border border-white/[0.05] rounded-2xl py-4 px-6 pl-12 focus:outline-none focus:border-primary/50 outline-none transition-all duration-300"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50 text-xl" />
        </div>

        {/* Filter Toggle Button */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-[#0f0f0f] text-text px-6 py-2 rounded-xl border border-white/[0.05] hover:border-primary/50 transition-all duration-300"
          >
            <BsFilterLeft className="text-xl" />
            Filters
          </button>
          <button
            onClick={() =>
              setSort(
                sort === "recently-updated" ? "score" : "recently-updated"
              )
            }
            className="flex items-center gap-2 bg-[#0f0f0f] text-text px-6 py-2 rounded-xl border border-white/[0.05] hover:border-primary/50 transition-all duration-300"
          >
            {sort === "recently-updated" ? (
              <BsSortDownAlt className="text-xl" />
            ) : (
              <BsSortDown className="text-xl" />
            )}
            Sort
          </button>
        </div>

        {/* Filters Panel */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isFilterOpen ? "auto" : 0,
            opacity: isFilterOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="bg-[#0f0f0f] rounded-2xl border border-white/[0.05] p-6 space-y-6">
            {/* Type Filter */}
            <div className="space-y-3">
              <h3 className="text-text font-outfit font-semibold">Type</h3>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(type === t ? "" : t)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                      type === t
                        ? "bg-primary text-white"
                        : "bg-background/50 border-[1px] border-white/[0.05] text-text hover:bg-white/[0.05]"
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-3">
              <h3 className="text-text font-outfit font-semibold">Status</h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(status === s ? "" : s)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                      status === s
                        ? "bg-primary text-white"
                        : "bg-background/50 border-[1px] border-white/[0.05] text-text hover:bg-white/[0.05]"
                    }`}
                  >
                    {s.replace(/-/g, " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
              <h3 className="text-text font-outfit font-semibold">Rating</h3>
              <div className="flex flex-wrap gap-2">
                {ratings.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRated(rated === r ? "" : r)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                      rated === r
                        ? "bg-primary text-white"
                        : "bg-background/50 border-[1px] border-white/[0.05] text-text hover:bg-white/[0.05]"
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Score Filter */}
            <div className="space-y-3">
              <h3 className="text-text font-outfit font-semibold">Score</h3>
              <div className="flex flex-wrap gap-2">
                {scores.map((s) => (
                  <button
                    key={s}
                    onClick={() => setScore(score === s ? "" : s)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                      score === s
                        ? "bg-primary text-white"
                        : "bg-background/50 border-[1px] border-white/[0.05] text-text hover:bg-white/[0.05]"
                    }`}
                  >
                    {s.replace(/-/g, " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Filter */}
            <div className="space-y-3">
              <h3 className="text-text font-outfit font-semibold">Seasons</h3>
              <div className="flex flex-wrap gap-2">
                {seasons.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSeason(season === s ? "" : s)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                      season === s
                        ? "bg-primary text-white"
                        : "bg-background/50 border-[1px] border-white/[0.05] text-text hover:bg-white/[0.05]"
                    }`}
                  >
                    {s.replace(/-/g, " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className=" flex gap-3 justify-start items-center ">
              {/* Date Filters */}
              <div className="space-y-3">
                <h3 className="text-text font-semibold font-outfit">
                  Start Date
                </h3>
                <div className="flex items-center gap-4">
                  <DatePicker
                    value={startDate}
                    onChange={setStartDate}
                    placeholder="Select start date"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-text font-outfit font-semibold">
                  End Date
                </h3>
                <div className="flex items-center gap-4">
                  <DatePicker
                    value={endDate}
                    onChange={setEndDate}
                    placeholder="Select end date"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-text font-outfit font-semibold">Language</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(language === l ? "" : l)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                      language === l
                        ? "bg-primary text-white"
                        : "bg-background/50 border-[1px] border-white/[0.05] text-text hover:bg-white/[0.05]"
                    }`}
                  >
                    {l.replace(/-/g, " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Genres Filter */}
            <div className="space-y-3">
              <h3 className="text-text font-outfit font-semibold">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {genresList.map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      const currentGenres = genres.split(",").filter(Boolean);
                      const newGenres = currentGenres.includes(g)
                        ? currentGenres.filter((genre) => genre !== g)
                        : [...currentGenres, g];
                      setGenres(newGenres.join(","));
                    }}
                    className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                      genres.split(",").includes(g)
                        ? "bg-primary text-white"
                        : "bg-background/50 border-[1px] border-white/[0.05] text-text hover:bg-white/[0.05]"
                    }`}
                  >
                    {g.replace(/-/g, " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {debouncedSearchQuery && (
        <div className="space-y-6 w-full self-start ">
          <h2 className="text-xl font-outfit font-bold text-text">
            Search Results for &quot;{debouncedSearchQuery}&quot;
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-4">
            {isLoading
              ? Array(8)
                  .fill(0)
                  .map((_, index) => <CardSkeleton key={index} />)
              : searchResults?.pages?.map((page) =>
                  page?.data?.animes?.map((anime) => (
                    <Card
                      key={anime.id}
                      imageUrl={anime?.poster}
                      title={anime?.name}
                      id={anime?.id}
                      upcoming={anime?.upcoming}
                      subCount={anime?.subCount}
                      dubCount={anime?.dubCount}
                    />
                  ))
                )}
          </div>

          {/* Pagination */}
          {hasNextPage && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => fetchNextPage()}
                disabled={isLoading}
                className="bg-white/[0.02] border-[1px] border-white/[0.05] text-white flex justify-center items-center gap-2 px-6 py-2 rounded-xl hover:bg-white/[0.05] transition-all duration-300"
              >
                <div
                  className={` ${
                    isFetchingNextPage ? "flex" : "hidden"
                  } loading bg-grayText loading-xs loading-spinner `}
                ></div>

                <span className={isFetchingNextPage ? "text-grayText" : ""}>
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
