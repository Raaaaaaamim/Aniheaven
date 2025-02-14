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
        `https://api.jikan.moe/v4/anime/${data?.data?.data?.anime?.info?.malId}/characters`
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
        `https://api.jikan.moe/v4/anime/${data?.data?.data?.anime?.info?.malId}`
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
      <div className="w-full min-h-screen mt-16 lg:mt-8 bg-background/95">
        <HeroSkeleton />
        <CharactersSkeleton />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="w-full min-h-screen mt-16 lg:mt-8 bg-background/95 flex items-center justify-center">
        <div className="text-text text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
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
      <div className="w-full min-h-screen mt-16 lg:mt-8 bg-background/95 flex items-center justify-center  ">
        <div className="text-text text-center">
          <h2 className="text-2xl font-bold mb-2">No Data Available</h2>
          <p className="text-text/70">
            The requested anime information could not be found.
          </p>
        </div>
      </div>
    );
  }
  console.log(characters);

  return (
    <div className="w-full min-h-screen mt-16 lg:mt-8 bg-background/95">
      <div className="relative w-full h-fit">
        {/* Background Image with Gradient */}
        <div className="absolute h-[300px] overflow-hidden  sm:h-[400px] inset-0">
          <img
            src={info.poster}
            className="w-full h-[160%] transform relative scale-[1.01] pixelated object-top"
            style={{
              imageRendering: "pixelated",
              transform: "scale(1.01)", // Forcing a slight scale up
            }}
            alt={info.name}
          />

          <div className="absolute inset-0  bg-linear-to-t from-background via-background/95 backdrop-blur-xs to-transparent" />
          <div className="absolute inset-0 mask   " />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent    " />
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto px-4">
          <div className="flex flex-col sm:flex-row h-full sm:items-end pb-4 sm:pb-8  gap-4 sm:gap-8">
            {/* Left Side - Poster & Buttons */}
            <div className=" w-[200px] shrink-0 mx-auto sm:mx-0 -mt-20 md:-mt-8 sm:mt-0  ">
              <img
                src={info.poster}
                alt={info.name}
                className="w-full aspect-2/3 object-cover rounded-lg shadow-lg"
              />
              <div className="mt-3 sm:mt-4 flex flex-col gap-2">
                <Link
                  to={`/watch/${info.id}`}
                  className="w-full h-9 sm:h-10 bg-[#772ce8]/90 hover:bg-[#772ce8] text-white rounded-lg flex items-center justify-center gap-2 relative overflow-hidden group transition-colors"
                >
                  <PiTelevisionSimpleBold size={14} />
                  <span className="text-sm font-medium">Watch Now</span>

                  <div className="inset-0 absolute bg-linear-to-r from-transparent -translate-x-[100%] group-hover:translate-x-[200%] transition-all duration-500  via-text/20 to-transparent  "></div>
                </Link>
                <button className="w-full h-9 group sm:h-10 bg-secondary/5 hover:bg-secondary/10 text-text border border-text/10 rounded-lg flex relative overflow-hidden items-center justify-center gap-2 transition-colors">
                  <MdOutlineTheaterComedy size={14} />
                  <span className="text-sm font-medium">Add to List</span>

                  <div className="inset-0 absolute bg-linear-to-r from-transparent -translate-x-[100%] group-hover:translate-x-[200%] transition-all duration-500  via-primary/10 to-transparent  "></div>
                </button>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="flex-1 text-text text-center sm:text-left">
              {/* Title */}
              <h1 className="text-2xl font-outfit sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-text/90 line-clamp-2">
                {info.name}
              </h1>

              {/* Metadata */}
              <div className="flex font-outfit flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text/70 mb-3">
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
                <p className=" font-Jost text-sm text-text/70 leading-relaxed line-clamp-3">
                  {info.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid text-sm font-outfit grid-cols-2 2xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
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
            className="container mx-auto lg:mt-0 px-4 py-8"
          >
            <div className="flex items-center space-x-4 font-outfit mb-6">
              <h1 className="text-lg md:text-xl font-bold bg-linear-to-r from-text/90 to-text/60 bg-clip-text text-transparent">
                Characters & Voice Actors
              </h1>
              <div className="flex-1 h-[1px] bg-linear-to-r from-primary/20 to-transparent"></div>
            </div>
            <div className="grid font-outfit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
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
                      <div className="group relative bg-secondary/5 rounded-xl overflow-hidden hover:bg-secondary/10 transition-all duration-500">
                        {/* Animated Background Effect */}
                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="absolute -inset-1 bg-linear-to-r from-primary/10 to-secondary/10 blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500"></div>

                        <div className="relative p-4">
                          <div className="flex gap-4">
                            {/* Character Image with Hover Effect */}
                            <div className="relative w-20 h-28 overflow-hidden rounded-lg">
                              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent z-10"></div>
                              <img
                                src={item.character.images.jpg.image_url}
                                alt={item.character.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>

                            {/* Character Info with Modern Layout */}
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-text mb-1 truncate">
                                {item.character.name}
                              </h3>
                              <p className="text-xs text-text/60 mb-2">
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
                                        <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-primary/20">
                                          <img
                                            src={va.person.images.jpg.image_url}
                                            alt={va.person.name}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                        <span className="text-xs text-text/80 truncate">
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
                            <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                            <span className="w-1 h-1 rounded-full bg-secondary/40"></span>
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
                  className="mt-8 mx-auto block px-6 py-2 bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-secondary/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-500"></div>
                  <span className="relative text-sm font-medium text-text/80 group-hover:text-text">
                    {showAllCharacters ? "Show Less" : "View All"}
                  </span>
                </button>
              </HashLink>
            )}
          </section>
        )
      )}

      {/* Additional Anime Information */}
      <section className="container font-poppins mx-auto px-4 py-8">
        <div className="relative bg-linear-to-br from-background/80 to-background/40 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0)_50%)]"></div>

          <div className="relative p-4 sm:p-6 md:p-8">
            {/* Header with improved alignment */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-outfit font-bold text-text">
                Additional Information
              </h2>
            </div>

            {MALLoading && !isMALError ? (
              <AnimeInfoSkeleton />
            ) : MALData?.data?.data ? (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="group relative bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 p-3 sm:p-4 rounded-xl text-center overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-700"></div>
                    <div className="relative">
                      <div className="text-xl sm:text-2xl font-bold text-primary mb-1 transition-all duration-300 group-hover:scale-105">
                        {MALData.data.data.score || "N/A"}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-text/70 font-outfit group-hover:text-text/90 transition-colors">
                        Score
                      </div>
                    </div>
                  </div>

                  <div className="group relative bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 p-3 sm:p-4 rounded-xl text-center overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-700"></div>
                    <div className="relative">
                      <div className="text-xl sm:text-2xl font-bold text-primary mb-1 transition-all duration-300 group-hover:scale-105">
                        #{MALData.data.data.rank || "N/A"}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-text/70 font-outfit group-hover:text-text/90 transition-colors">
                        Rank
                      </div>
                    </div>
                  </div>

                  <div className="group relative bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 p-3 sm:p-4 rounded-xl text-center overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-700"></div>
                    <div className="relative">
                      <div className="text-xl sm:text-2xl font-bold text-primary mb-1 transition-all duration-300 group-hover:scale-105">
                        #{MALData.data.data.popularity || "N/A"}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-text/70 font-outfit group-hover:text-text/90 transition-colors">
                        Popularity
                      </div>
                    </div>
                  </div>

                  <div className="group relative bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 p-3 sm:p-4 rounded-xl text-center overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-700"></div>
                    <div className="relative">
                      <div className="text-xl sm:text-2xl font-bold text-primary mb-1 transition-all duration-300 group-hover:scale-105">
                        {MALData.data.data.members
                          ? MALData.data.data.members > 999999
                            ? `${(MALData.data.data.members / 1000000).toFixed(
                                1
                              )}M`
                            : MALData.data.data.members.toLocaleString()
                          : "N/A"}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-text/70 font-outfit group-hover:text-text/90 transition-colors">
                        Members
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Left Column */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Information Grid */}
                    <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-xs hover:bg-secondary/10 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <div className="relative group">
                          <HiOutlineInformationCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-[360deg]" />
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </div>
                        <h3 className="text-base font-outfit sm:text-lg font-semibold text-primary">
                          Basic Details
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-6 relative">
                        <div className="space-y-4">
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-sm text-text/60 group-hover/item:text-primary/60 transition-colors font-outfit">
                              Type
                            </div>
                            <div className="font-medium text-text group-hover/item:text-primary transition-colors">
                              {MALData.data.data.type || "N/A"}
                            </div>
                          </div>
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-sm text-text/60 group-hover/item:text-primary/60 transition-colors font-outfit">
                              Episodes
                            </div>
                            <div className="font-medium text-text group-hover/item:text-primary transition-colors">
                              {MALData.data.data.episodes || "N/A"}
                            </div>
                          </div>
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-sm text-text/60 group-hover/item:text-primary/60 transition-colors font-outfit">
                              Duration
                            </div>
                            <div className="font-medium text-text group-hover/item:text-primary transition-colors">
                              {MALData.data.data.duration || "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-sm text-text/60 group-hover/item:text-primary/60 transition-colors font-outfit">
                              Status
                            </div>
                            <div className="font-medium text-text group-hover/item:text-primary transition-colors">
                              {MALData.data.data.status || "N/A"}
                            </div>
                          </div>
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-sm text-text/60 group-hover/item:text-primary/60 transition-colors font-outfit">
                              Rating
                            </div>
                            <div className="font-medium text-text group-hover/item:text-primary transition-colors">
                              {MALData.data.data.rating || "N/A"}
                            </div>
                          </div>
                          <div className="group/item transition-all duration-300 hover:translate-x-2">
                            <div className="text-sm text-text/60 group-hover/item:text-primary/60 transition-colors font-outfit">
                              Source
                            </div>
                            <div className="font-medium text-text group-hover/item:text-primary transition-colors">
                              {MALData.data.data.source || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Broadcast Information */}
                    <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-xs hover:bg-secondary/10 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <div className="relative group">
                          <PiTelevisionSimpleBold className="w-5 h-5 sm:w-6 sm:h-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:translate-y-[-2px]" />
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-primary font-outfit">
                          Broadcast Information
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="group/item transition-all duration-300 hover:translate-x-2">
                          <div className="text-sm text-text/60 group-hover/item:text-primary/60 transition-colors font-outfit">
                            Season
                          </div>
                          <div className="font-medium text-text group-hover/item:text-primary transition-colors capitalize">
                            {MALData.data.data.season}{" "}
                            {MALData.data.data.year || "N/A"}
                          </div>
                        </div>
                        <div className="group/item transition-all duration-300 hover:translate-x-2">
                          <div className="text-sm text-text/60 group-hover/item:text-primary/60 transition-colors font-outfit">
                            Broadcast
                          </div>
                          <div className="font-medium text-text group-hover/item:text-primary transition-colors">
                            {MALData.data.data.broadcast?.string || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Studios & Producers */}
                    <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-xs hover:bg-secondary/10 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <div className="relative group">
                          <MdOutlineTheaterComedy className="w-5 h-5 sm:w-6 sm:h-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-10deg]" />
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </div>
                        <h3 className="text-base font-outfit sm:text-lg font-semibold text-primary">
                          Production
                        </h3>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm text-text/60 mb-3 group-hover:text-primary/60 font-outfit transition-colors">
                            Studios
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {MALData.data.data.studios?.map((studio) => (
                              <span
                                key={studio.mal_id}
                                className="px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs sm:text-sm text-text/90 hover:text-text transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                              >
                                {studio.name}
                              </span>
                            )) || "N/A"}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm text-text/60 mb-3 group-hover:text-primary/60 font-outfit transition-colors">
                            Producers
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {MALData.data.data.producers?.map((producer) => (
                              <span
                                key={producer.mal_id}
                                className="px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs sm:text-sm text-text/90 hover:text-text transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                              >
                                {producer.name}
                              </span>
                            )) || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Genres & Themes */}
                    <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-xs hover:bg-secondary/10 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex items-center gap-2 mb-4 sm:mb-6">
                        <div className="relative group">
                          <IoLayersOutline className="w-5 h-5 sm:w-6 sm:h-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:translate-y-[-2px]" />
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        </div>
                        <h3 className="text-base font-outfit sm:text-lg font-semibold text-primary">
                          Categories
                        </h3>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm text-text/60 mb-3 group-hover:text-primary/60 transition-colors">
                            Genres
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {MALData.data.data.genres?.map((genre) => (
                              <span
                                key={genre.mal_id}
                                className="px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs sm:text-sm text-text/90 hover:text-text transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                              >
                                {genre.name}
                              </span>
                            )) || "N/A"}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm text-text/60 mb-3 group-hover:text-primary/60 font-outfit transition-colors">
                            Themes
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {MALData.data.data.themes?.map((theme) => (
                              <span
                                key={theme.mal_id}
                                className="px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/10 hover:bg-primary/20 rounded-full text-xs sm:text-sm text-text/90 hover:text-text transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
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
              <div className="text-center py-8 sm:py-12 text-text/70">
                <svg
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-primary/50"
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
                <p className="text-base font-outfit sm:text-lg font-medium">
                  No additional information available
                </p>
                <p className="text-xs sm:text-sm mt-1 sm:mt-2">
                  Try refreshing the page or check back later
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Anime */}
      {relatedAnimes?.length > 0 && (
        <section className="container mx-auto  px-4 py-6">
          <div className="  flex items-center space-x-4   font-outfit  mb-6">
            <h1 className=" text-lg md:text-xl font-bold bg-linear-to-r from-text/90 to-text/60 bg-clip-text text-transparent ">
              Related Anime
            </h1>
            <div className="flex-1 h-[1px] bg-linear-to-r from-primary/20 to-transparent"></div>
          </div>
          <div className="grid place-items-center grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
          <div className="  flex items-center space-x-4   font-outfit  mb-6">
            <h1 className=" text-lg md:text-xl font-bold bg-linear-to-r from-text/90 to-text/60 bg-clip-text text-transparent ">
              Recommended Anime
            </h1>
            <div className="flex-1 h-[1px] bg-linear-to-r from-primary/20 to-transparent"></div>
          </div>
          <div className="grid place-items-center grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  2xl:grid-cols-6">
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
