import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { IoLayersOutline } from "react-icons/io5";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import AnimeInfoSkeleton from "../components/skeletons/AnimeInfoSkeleton";
import CharactersSkeleton from "../components/skeletons/CharactersSkeleton";
import HeroSkeleton from "../components/skeletons/HeroSkeleton";
import AnimeCard from "../components/ui/AnimeCard.jsx";
import useAnimeInfo from "../hooks/useAnimeInfo.jsx";

const AnimeInfo = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useAnimeInfo(id, {}, true);
  const [showAllCharacters, setShowAllCharacters] = useState(false);

  const {
    data: characters,
    isLoading: charactersLoading,
    isError: charactersError,
    refetch,
  } = useQuery({
    queryKey: ["characters", data?.data?.data?.anime?.info?.malId],
    queryFn: async () => {
      return await axios.get(
        `https://api.jikan.moe/v4/anime/${data?.data?.data?.anime?.info?.malId}/characters`,
        {
          withCredentials: false,
          credentials: false,
        },
      );
    },
  });
  const {
    data: MALData,
    isLoading: MALLoading,
    isError: isMALError,
    refetch: refetchMAL,
  } = useQuery({
    queryKey: ["MAL", data?.data?.data?.anime?.info?.malId],
    queryFn: async () => {
      return await axios.get(
        `https://api.jikan.moe/v4/anime/${data?.data?.data?.anime?.info?.malId}`,
        {
          withCredentials: false,
          credentials: false,
        },
      );
    },
    enabled: false,
  });
  console.log(MALData);

  useEffect(() => {
    if (data?.data?.data?.anime?.info?.malId) {
      refetch();
      refetchMAL();
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="bg-background/95 mt-16 min-h-screen w-full lg:mt-8">
        <HeroSkeleton />
        <CharactersSkeleton />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="bg-background/95 mt-16 flex min-h-screen w-full items-center justify-center lg:mt-8">
        <div className="text-text text-center">
          <h2 className="mb-2 text-2xl font-bold">Error</h2>
          <p className="text-text/70">
            Failed to load anime information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const {
    anime: { info, moreInfo },
    recommendedAnimes,
    relatedAnimes,
  } = data?.data?.data;

  if (!info || !moreInfo) {
    return (
      <div className="bg-background/95 mt-16 flex min-h-screen w-full items-center justify-center lg:mt-8">
        <div className="text-text text-center">
          <h2 className="mb-2 text-2xl font-bold">No Data Available</h2>
          <p className="text-text/70">
            The requested anime information could not be found.
          </p>
        </div>
      </div>
    );
  }
  console.log(characters);

  return (
    <div className="bg-background/95 mt-16 min-h-screen w-full lg:mt-8">
      <div className="relative h-fit w-full">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0 h-[300px] overflow-hidden sm:h-[400px]">
          <img
            src={info.poster}
            className="pixelated relative h-[160%] w-full scale-[1.01] transform object-top"
            style={{
              imageRendering: "pixelated",
              transform: "scale(1.01)", // Forcing a slight scale up
            }}
            alt={info.name}
          />

          <div className="from-background via-background/95 absolute inset-0 bg-linear-to-t to-transparent backdrop-blur-xs" />
          <div className="mask absolute inset-0" />
          <div className="from-background via-background/20 absolute inset-0 bg-linear-to-t to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto h-full px-4">
          <div className="flex h-full flex-col gap-4 pb-4 sm:flex-row sm:items-end sm:gap-8 sm:pb-8">
            {/* Left Side - Poster & Buttons */}
            <div className="mx-auto -mt-20 w-[200px] shrink-0 sm:mx-0 sm:mt-0 md:-mt-8">
              <img
                src={info.poster}
                alt={info.name}
                className="aspect-2/3 w-full rounded-lg object-cover shadow-lg"
              />
              <div className="mt-3 flex flex-col gap-2 sm:mt-4">
                <Link
                  to={`/watch/${info.id}`}
                  className="group relative flex h-9 w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#772ce8]/90 text-white transition-colors hover:bg-[#772ce8] sm:h-10"
                >
                  <PiTelevisionSimpleBold size={14} />
                  <span className="text-sm font-medium">Watch Now</span>

                  <div className="via-text/20 absolute inset-0 -translate-x-[100%] bg-linear-to-r from-transparent to-transparent transition-all duration-500 group-hover:translate-x-[200%]"></div>
                </Link>
                <button className="group bg-secondary/5 hover:bg-secondary/10 text-text border-text/10 relative flex h-9 w-full items-center justify-center gap-2 overflow-hidden rounded-lg border transition-colors sm:h-10">
                  <MdOutlineTheaterComedy size={14} />
                  <span className="text-sm font-medium">Add to List</span>

                  <div className="via-primary/10 absolute inset-0 -translate-x-[100%] bg-linear-to-r from-transparent to-transparent transition-all duration-500 group-hover:translate-x-[200%]"></div>
                </button>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="text-text flex-1 text-center sm:text-left">
              {/* Title */}
              <h1 className="font-outfit text-text/90 mb-2 line-clamp-2 text-2xl font-bold sm:mb-3 sm:text-3xl md:text-4xl">
                {info.name}
              </h1>

              {/* Metadata */}
              <div className="font-outfit text-text/70 mb-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:justify-start sm:gap-3 sm:text-sm">
                <span>{moreInfo.aired}</span>
                <span className="hidden sm:inline">•</span>
                <span>{info.stats.type}</span>
                <span className="hidden sm:inline">•</span>
                <span>{info.stats.duration}</span>
                <span className="hidden sm:inline">•</span>
                <span>Rating: {info.stats.rating}</span>
              </div>

              {/* Synopsis */}
              <div className="mb-4 sm:mb-6">
                <p className="font-Jost text-text/70 line-clamp-3 text-sm leading-relaxed">
                  {info.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="font-outfit mb-6 grid grid-cols-2 gap-3 text-sm sm:mb-8 sm:gap-4 2xl:grid-cols-4">
                <div className="flex gap-2">
                  <span className="text-text/60">Episodes:</span>
                  <span className="truncate">
                    Sub: {info.stats.episodes.sub}, Dub:{" "}
                    {info.stats.episodes.dub}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-text/60">Status:</span>
                  <span className="truncate">{moreInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-text/60">Studios:</span>
                  <span className="truncate">{moreInfo.studios}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-text/60">Genres:</span>
                  <span className="truncate">
                    {Array.isArray(moreInfo.genres)
                      ? moreInfo.genres.join(", ")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Characters & Voice Actors */}
      {charactersLoading ? (
        <CharactersSkeleton />
      ) : (
        !charactersError &&
        characters?.data?.data?.length > 0 && (
          <section
            id="characters"
            className="container mx-auto px-4 py-8 lg:mt-0"
          >
            <div className="font-outfit mb-6 flex items-center space-x-4">
              <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
                Characters & Voice Actors
              </h1>
              <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
            </div>
            <div className="font-outfit grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {characters?.data?.data
                ?.slice(0, showAllCharacters ? undefined : 6)
                .map((item, index) => (
                  <Link
                    key={index}
                    to={`/character/${item?.character?.mal_id}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay:
                          index *
                          (characters?.data?.data?.length > 200 ? 0 : 0.05),
                        ease: "backOut",
                      }}
                    >
                      <div className="group bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl transition-all duration-500">
                        {/* Animated Background Effect */}
                        <div className="from-primary/5 via-secondary/5 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
                        <div className="from-primary/10 to-secondary/10 absolute -inset-1 bg-linear-to-r opacity-0 blur-xl transition-all duration-500 group-hover:opacity-30"></div>

                        <div className="relative p-4">
                          <div className="flex gap-4">
                            {/* Character Image with Hover Effect */}
                            <div className="relative h-28 w-20 overflow-hidden rounded-lg">
                              <div className="from-background/80 absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent"></div>
                              <img
                                src={item.character.images.jpg.image_url}
                                alt={item.character.name}
                                className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>

                            {/* Character Info with Modern Layout */}
                            <div className="min-w-0 flex-1">
                              <h3 className="text-text mb-1 truncate text-sm font-semibold">
                                {item.character.name}
                              </h3>
                              <p className="text-text/60 mb-2 text-xs">
                                {item.role}
                              </p>
                              {item.voice_actors?.length > 0 && (
                                <div className="space-y-2">
                                  {item.voice_actors
                                    .slice(0, 2)
                                    .map((va, vaIndex) => (
                                      <div
                                        key={vaIndex}
                                        className="flex items-center gap-2"
                                      >
                                        <div className="ring-primary/20 relative h-6 w-6 overflow-hidden rounded-full ring-1">
                                          <img
                                            src={va.person.images.jpg.image_url}
                                            alt={va.person.name}
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                        <span className="text-text/80 truncate text-xs">
                                          {va.person.name}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute top-2 right-2 flex gap-1">
                            <span className="bg-primary/40 h-1 w-1 rounded-full"></span>
                            <span className="bg-secondary/40 h-1 w-1 rounded-full"></span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>

            {characters?.data?.data?.length > 6 && (
              <HashLink smooth to="#characters">
                <button
                  onClick={() => setShowAllCharacters(!showAllCharacters)}
                  className="bg-secondary/10 hover:bg-secondary/20 group relative mx-auto mt-8 block overflow-hidden rounded-lg px-6 py-2 transition-all duration-300"
                >
                  <div className="from-primary/10 to-secondary/10 absolute inset-0 translate-x-[-100%] bg-linear-to-r transition-all duration-500 group-hover:translate-x-[100%]"></div>
                  <span className="text-text/80 group-hover:text-text relative text-sm font-medium">
                    {showAllCharacters ? "Show Less" : "View All"}
                  </span>
                </button>
              </HashLink>
            )}
          </section>
        )
      )}

      {/* Additional Anime Information */}
      <section className="font-poppins container mx-auto px-4 py-8">
        <div className="from-background/80 to-background/40 relative overflow-hidden rounded-xl border border-white/5 bg-linear-to-br shadow-2xl backdrop-blur-md">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0)_50%)]"></div>

          <div className="relative p-4 sm:p-6 md:p-8">
            {/* Header with improved alignment */}
            <div className="mb-8 flex items-center gap-4">
              <h2 className="font-outfit text-text text-xl font-bold">
                Additional Information
              </h2>
            </div>

            {MALLoading && !isMALError ? (
              <AnimeInfoSkeleton />
            ) : MALData?.data?.data ? (
              <>
                {/* Stats Overview */}
                <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:grid-cols-4 sm:gap-4">
                  <div className="group bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl p-3 text-center transition-all duration-300 sm:p-4">
                    <div className="via-primary/5 absolute inset-0 translate-x-[-200%] bg-linear-to-r from-transparent to-transparent transition-all duration-700 group-hover:translate-x-[200%]"></div>
                    <div className="relative">
                      <div className="text-primary mb-1 text-xl font-bold transition-all duration-300 group-hover:scale-105 sm:text-2xl">
                        {MALData.data.data.score || "N/A"}
                      </div>
                      <div className="text-text/70 font-outfit group-hover:text-text/90 text-xs font-medium transition-colors sm:text-sm">
                        Score
                      </div>
                    </div>
                  </div>

                  <div className="group bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl p-3 text-center transition-all duration-300 sm:p-4">
                    <div className="via-primary/5 absolute inset-0 translate-x-[-200%] bg-linear-to-r from-transparent to-transparent transition-all duration-700 group-hover:translate-x-[200%]"></div>
                    <div className="relative">
                      <div className="text-primary mb-1 text-xl font-bold transition-all duration-300 group-hover:scale-105 sm:text-2xl">
                        #{MALData.data.data.rank || "N/A"}
                      </div>
                      <div className="text-text/70 font-outfit group-hover:text-text/90 text-xs font-medium transition-colors sm:text-sm">
                        Rank
                      </div>
                    </div>
                  </div>

                  <div className="group bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl p-3 text-center transition-all duration-300 sm:p-4">
                    <div className="via-primary/5 absolute inset-0 translate-x-[-200%] bg-linear-to-r from-transparent to-transparent transition-all duration-700 group-hover:translate-x-[200%]"></div>
                    <div className="relative">
                      <div className="text-primary mb-1 text-xl font-bold transition-all duration-300 group-hover:scale-105 sm:text-2xl">
                        #{MALData.data.data.popularity || "N/A"}
                      </div>
                      <div className="text-text/70 font-outfit group-hover:text-text/90 text-xs font-medium transition-colors sm:text-sm">
                        Popularity
                      </div>
                    </div>
                  </div>

                  <div className="group bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl p-3 text-center transition-all duration-300 sm:p-4">
                    <div className="via-primary/5 absolute inset-0 translate-x-[-200%] bg-linear-to-r from-transparent to-transparent transition-all duration-700 group-hover:translate-x-[200%]"></div>
                    <div className="relative">
                      <div className="text-primary mb-1 text-xl font-bold transition-all duration-300 group-hover:scale-105 sm:text-2xl">
                        {MALData.data.data.members
                          ? MALData.data.data.members > 999999
                            ? `${(MALData.data.data.members / 1000000).toFixed(
                                1,
                              )}M`
                            : MALData.data.data.members.toLocaleString()
                          : "N/A"}
                      </div>
                      <div className="text-text/70 font-outfit group-hover:text-text/90 text-xs font-medium transition-colors sm:text-sm">
                        Members
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
                  {/* Left Column */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Information Grid */}
                    <div className="group bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl p-4 backdrop-blur-xs transition-all duration-300 sm:p-6">
                      <div className="from-primary/5 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="mb-4 flex items-center gap-2 sm:mb-6">
                        <div className="group relative">
                          <HiOutlineInformationCircle className="text-primary h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[360deg] sm:h-6 sm:w-6" />
                          <div className="bg-primary/20 absolute inset-0 scale-150 rounded-full opacity-0 blur-md transition-all duration-300 group-hover:opacity-100"></div>
                        </div>
                        <h3 className="font-outfit text-primary text-base font-semibold sm:text-lg">
                          Basic Details
                        </h3>
                      </div>
                      <div className="relative grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-text/60 group-hover/item:text-primary/60 font-outfit text-sm transition-colors">
                              Type
                            </div>
                            <div className="text-text group-hover/item:text-primary font-medium transition-colors">
                              {MALData.data.data.type || "N/A"}
                            </div>
                          </div>
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-text/60 group-hover/item:text-primary/60 font-outfit text-sm transition-colors">
                              Episodes
                            </div>
                            <div className="text-text group-hover/item:text-primary font-medium transition-colors">
                              {MALData.data.data.episodes || "N/A"}
                            </div>
                          </div>
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-text/60 group-hover/item:text-primary/60 font-outfit text-sm transition-colors">
                              Duration
                            </div>
                            <div className="text-text group-hover/item:text-primary font-medium transition-colors">
                              {MALData.data.data.duration || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-text/60 group-hover/item:text-primary/60 font-outfit text-sm transition-colors">
                              Status
                            </div>
                            <div className="text-text group-hover/item:text-primary font-medium transition-colors">
                              {MALData.data.data.status || "N/A"}
                            </div>
                          </div>
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-text/60 group-hover/item:text-primary/60 font-outfit text-sm transition-colors">
                              Rating
                            </div>
                            <div className="text-text group-hover/item:text-primary font-medium transition-colors">
                              {MALData.data.data.rating || "N/A"}
                            </div>
                          </div>
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-text/60 group-hover/item:text-primary/60 font-outfit text-sm transition-colors">
                              Source
                            </div>
                            <div className="text-text group-hover/item:text-primary font-medium transition-colors">
                              {MALData.data.data.source || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Broadcast Information */}
                    <div className="group bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl p-4 backdrop-blur-xs transition-all duration-300 sm:p-6">
                      <div className="from-primary/5 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="mb-4 flex items-center gap-2 sm:mb-6">
                        <div className="group relative">
                          <PiTelevisionSimpleBold className="text-primary h-5 w-5 transition-all duration-300 group-hover:translate-y-[-2px] group-hover:scale-110 sm:h-6 sm:w-6" />
                          <div className="bg-primary/20 absolute inset-0 scale-150 rounded-full opacity-0 blur-md transition-all duration-300 group-hover:opacity-100"></div>
                        </div>
                        <h3 className="text-primary font-outfit text-base font-semibold sm:text-lg">
                          Broadcast Information
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="group/item transition-all duration-300 hover:translate-x-2">
                          <div className="text-text/60 group-hover/item:text-primary/60 font-outfit text-sm transition-colors">
                            Season
                          </div>
                          <div className="text-text group-hover/item:text-primary font-medium capitalize transition-colors">
                            {MALData.data.data.season}{" "}
                            {MALData.data.data.year || "N/A"}
                          </div>
                        </div>
                        <div className="group/item transition-all duration-300 hover:translate-x-2">
                          <div className="text-text/60 group-hover/item:text-primary/60 font-outfit text-sm transition-colors">
                            Broadcast
                          </div>
                          <div className="text-text group-hover/item:text-primary font-medium transition-colors">
                            {MALData.data.data.broadcast?.string || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Studios & Producers */}
                    <div className="group bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl p-4 backdrop-blur-xs transition-all duration-300 sm:p-6">
                      <div className="from-primary/5 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="mb-4 flex items-center gap-2 sm:mb-6">
                        <div className="group relative">
                          <MdOutlineTheaterComedy className="text-primary h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-10deg] sm:h-6 sm:w-6" />
                          <div className="bg-primary/20 absolute inset-0 scale-150 rounded-full opacity-0 blur-md transition-all duration-300 group-hover:opacity-100"></div>
                        </div>
                        <h3 className="font-outfit text-primary text-base font-semibold sm:text-lg">
                          Production
                        </h3>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-text/60 group-hover:text-primary/60 font-outfit mb-3 text-sm transition-colors">
                            Studios
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {MALData.data.data.studios?.map((studio) => (
                              <span
                                key={studio.mal_id}
                                className="bg-primary/10 hover:bg-primary/20 text-text/90 hover:text-text hover:shadow-primary/20 cursor-pointer rounded-full px-3 py-1 text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-4 sm:py-1.5 sm:text-sm"
                              >
                                {studio.name}
                              </span>
                            )) || "N/A"}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-text/60 group-hover:text-primary/60 font-outfit mb-3 text-sm transition-colors">
                            Producers
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {MALData.data.data.producers?.map((producer) => (
                              <span
                                key={producer.mal_id}
                                className="bg-primary/10 hover:bg-primary/20 text-text/90 hover:text-text hover:shadow-primary/20 cursor-pointer rounded-full px-3 py-1 text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-4 sm:py-1.5 sm:text-sm"
                              >
                                {producer.name}
                              </span>
                            )) || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Genres & Themes */}
                    <div className="group bg-secondary/5 hover:bg-secondary/10 relative overflow-hidden rounded-xl p-4 backdrop-blur-xs transition-all duration-300 sm:p-6">
                      <div className="from-primary/5 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="mb-4 flex items-center gap-2 sm:mb-6">
                        <div className="group relative">
                          <IoLayersOutline className="text-primary h-5 w-5 transition-all duration-300 group-hover:translate-y-[-2px] group-hover:scale-110 sm:h-6 sm:w-6" />
                          <div className="bg-primary/20 absolute inset-0 scale-150 rounded-full opacity-0 blur-md transition-all duration-300 group-hover:opacity-100"></div>
                        </div>
                        <h3 className="font-outfit text-primary text-base font-semibold sm:text-lg">
                          Categories
                        </h3>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-text/60 group-hover:text-primary/60 mb-3 text-sm transition-colors">
                            Genres
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {MALData.data.data.genres?.map((genre) => (
                              <span
                                key={genre.mal_id}
                                className="bg-primary/10 hover:bg-primary/20 text-text/90 hover:text-text hover:shadow-primary/20 cursor-pointer rounded-full px-3 py-1 text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-4 sm:py-1.5 sm:text-sm"
                              >
                                {genre.name}
                              </span>
                            )) || "N/A"}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-text/60 group-hover:text-primary/60 font-outfit mb-3 text-sm transition-colors">
                            Themes
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {MALData.data.data.themes?.map((theme) => (
                              <span
                                key={theme.mal_id}
                                className="bg-primary/10 hover:bg-primary/20 text-text/90 hover:text-text hover:shadow-primary/20 cursor-pointer rounded-full px-3 py-1 text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg sm:px-4 sm:py-1.5 sm:text-sm"
                              >
                                {theme.name}
                              </span>
                            )) || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-text/70 py-8 text-center sm:py-12">
                <svg
                  className="text-primary/50 mx-auto mb-3 h-12 w-12 sm:mb-4 sm:h-16 sm:w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="font-outfit text-base font-medium sm:text-lg">
                  No additional information available
                </p>
                <p className="mt-1 text-xs sm:mt-2 sm:text-sm">
                  Try refreshing the page or check back later
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Anime */}
      {relatedAnimes?.length > 0 && (
        <section className="container mx-auto px-4 py-6">
          <div className="font-outfit mb-6 flex items-center space-x-4">
            <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
              Related Anime
            </h1>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>
          <div className="grid w-full grid-cols-2 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {relatedAnimes.map((anime) => (
              <AnimeCard
                key={anime.id}
                hide={true}
                rank={anime.rank}
                name={anime.name}
                image={anime.poster}
                id={anime.id}
                subCount={anime.episodes.sub}
                dubCount={anime.episodes.dub}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recommended Anime */}
      {recommendedAnimes?.length > 0 && (
        <section className="container mx-auto px-4 py-6">
          <div className="font-outfit mb-6 flex items-center space-x-4">
            <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
              Recommended Anime
            </h1>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>
          <div className="grid w-full grid-cols-2 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {recommendedAnimes.map((anime) => (
              <AnimeCard
                key={anime.id}
                hide={true}
                rank={anime.rank}
                name={anime.name}
                image={anime.poster}
                id={anime.id}
                subCount={anime.episodes.sub}
                dubCount={anime.episodes.dub}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AnimeInfo;
