import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsBookmarkHeart } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import AnimeCard from "../components/ui/AnimeCard.jsx";
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

  useEffect(() => {
    if (data?.data?.data?.anime?.info?.malId) {
      refetch();
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
        <div className="absolute h-[300px]  sm:h-[400px] inset-0">
          <img
            src={info.poster}
            className="w-full h-full  object-cover   object-top"
            alt={info.name}
          />
          <div className=" absolute inset-0 backdrop-blur-sm "></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent" />
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
                  <FaPlay size={14} />
                  <span className="text-sm font-medium">Watch Now</span>
                </Link>
                <button className="w-full h-9 sm:h-10 bg-secondary/5 hover:bg-secondary/10 text-text border border-text/10 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <BsBookmarkHeart size={14} />
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
                  <span className="truncate">{moreInfo.genres.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Characters & Voice Actors */}
      {!charactersLoading &&
        !charactersError &&
        characters?.data?.data?.length > 0 && (
          <section className="container mx-auto  lg:mt-0 px-4 py-8">
            <div className=" text-xl font-bold border-l-4 px-2 border-primary text-text mb-6">
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
        )}

      {/* Related Anime */}
      {relatedAnimes?.length > 0 && (
        <section className="container mx-auto  px-4 py-6">
          <h2 className="  text-xl font-bold border-l-4 px-2 border-primary text-text mb-4">
            Related Anime
          </h2>
          <div className="grid place-items-center grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
          <h2 className=" text-xl border-l-4 px-2 border-primary font-bold text-text mb-4">
            Recommended Anime
          </h2>
          <div className="grid place-items-center grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
