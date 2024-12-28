import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { IoLayersOutline } from "react-icons/io5";
import { MdOutlineTheaterComedy } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import AnimeCard from "../components/ui/AnimeCard.jsx";
import AnimeInfoSkeleton from "../components/ui/AnimeInfoSkeleton";
import CharactersSkeleton from "../components/ui/CharactersSkeleton";
import HeroSkeleton from "../components/ui/HeroSkeleton";
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
    isError: MALError,
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
      <div className="w-full min-h-screen mt-16 lg:mt-8 bg-background/95 flex items-center justify-center">
        <div className="text-text text-center">
          <h2 className="text-2xl font-bold mb-2">No Data Available</h2>
          <p className="text-text/70">
            The requested anime information could not be found.
          </p>
        </div>
      </div>
    );
  }

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

          <div className="absolute inset-0  bg-gradient-to-t from-background via-background/95 backdrop-blur-sm to-transparent" />
          <div className="absolute inset-0 mask   " />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent    " />
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto px-4">
          <div className="flex flex-col sm:flex-row h-full sm:items-end pb-4 sm:pb-8  gap-4 sm:gap-8">
            {/* Left Side - Poster & Buttons */}
            <div className=" w-[200px] flex-shrink-0 mx-auto sm:mx-0 -mt-20 md:-mt-8 sm:mt-0  ">
              <img
                src={info.poster}
                alt={info.name}
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg"
              />
              <div className="mt-3 sm:mt-4 flex flex-col gap-2">
                <Link
                  to={`/watch/${info.id}`}
                  className="w-full h-9 sm:h-10 bg-[#9147ff] hover:bg-[#772ce8] text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <PiTelevisionSimpleBold size={14} />
                  <span className="text-sm font-medium">Watch Now</span>
                </Link>
                <button className="w-full h-9 sm:h-10 bg-secondary/5 hover:bg-secondary/10 text-text border border-text/10 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <MdOutlineTheaterComedy size={14} />
                  <span className="text-sm font-medium">Add to List</span>
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
                <p className="text-xs sm:text-sm text-text/70 leading-relaxed line-clamp-3">
                  {info.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid font-outfit grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-2 text-xs sm:text-sm">
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
          <section className="container mx-auto  lg:mt-0 px-4 py-8">
            <div className=" text-xl font-bold border-l-4 px-2 border-primary font-outfit text-text mb-6">
              Characters & Voice Actors
            </div>
            <div className="grid font-outfit grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {characters?.data?.data
                ?.slice(0, showAllCharacters ? undefined : 6)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex bg-secondary/5 hover:bg-secondary/10 p-4 rounded-lg transition-all duration-300"
                  >
                    {/* Character Side */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="relative">
                        <img
                          src={
                            item?.character?.images?.webp?.image_url ||
                            item?.character?.images?.jpg?.image_url
                          }
                          alt={item.character.name}
                          className="w-[65px]  h-[65px] sm:w-[75px] sm:h-[75px] rounded-full object-cover ring-2 ring-primary/20 hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-1 right-0 bg-secondary/90 text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full">
                          {item.role}
                        </div>
                      </div>
                      <div className="w-full mt-2">
                        <p className="text-xs sm:text-sm font-medium text-text/90 text-center truncate px-1">
                          {item.character.name}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-3 self-stretch w-[1px] bg-text/10"></div>

                    {/* Voice Actor Side */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="relative">
                        <img
                          src={
                            item.voice_actors?.[0]?.person?.images?.webp
                              ?.image_url ||
                            item.voice_actors?.[0]?.person?.images?.jpg
                              ?.image_url ||
                            "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                          }
                          alt={
                            item.voice_actors?.[0]?.person?.name ||
                            "Unknown Person"
                          }
                          className="w-[65px] h-[65px] sm:w-[75px] sm:h-[75px] rounded-full object-cover ring-2 ring-primary/20 hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-1 right-0 bg-primary/90 text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full">
                          {item.voice_actors?.[0]?.language || "Unknown"}
                        </div>
                      </div>

                      <div className="w-full mt-2">
                        <p className="text-xs sm:text-sm font-medium text-text/90 text-center truncate px-1">
                          {item.voice_actors?.[0]?.person?.name || "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {characters?.data?.data?.length > 4 && (
              <button
                onClick={() => setShowAllCharacters(!showAllCharacters)}
                className="mt-6 mx-auto block px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-text rounded-lg transition-all duration-300"
              >
                {showAllCharacters ? "Show Less" : "Show More"}
              </button>
            )}
          </section>
        )
      )}

      {/* Additional Anime Information */}
      <section className="container font-poppins mx-auto px-4 py-8">
        <div className="relative bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-md rounded-xl border border-white/5 shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0)_50%)]"></div>

          <div className="relative p-4 sm:p-6 md:p-8">
            {/* Header with improved alignment */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-outfit font-bold text-text">
                Additional Information
              </h2>
            </div>

            {MALLoading ? (
              <AnimeInfoSkeleton />
            ) : MALData?.data?.data ? (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="group relative bg-secondary/5 hover:bg-secondary/10 transition-all duration-300 p-3 sm:p-4 rounded-xl text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-700"></div>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-700"></div>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-700"></div>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-700"></div>
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
                    <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:bg-secondary/10 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                    <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:bg-secondary/10 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                    <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:bg-secondary/10 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                    <div className="group bg-secondary/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:bg-secondary/10 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
          <h2 className="  text-xl font-bold border-l-4 px-2 border-primary font-outfit text-text mb-4">
            Related Anime
          </h2>
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
          <h2 className=" text-xl border-l-4 px-2 border-primary font-bold text-text font-outfit mb-4">
            Recommended Anime
          </h2>
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
