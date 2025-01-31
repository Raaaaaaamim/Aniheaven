import { BiMoviePlay } from "react-icons/bi";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi2";
import { MdStarOutline } from "react-icons/md";

const AnimeInfoCard = ({ animeInfo, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border-[1px] border-white/[0.05] bg-secondaryBg/95 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-pulse">
          <div className="relative w-full sm:w-40 h-52 sm:h-56 shrink-0">
            <div className="absolute inset-0 rounded-xl bg-white/[0.05]"></div>
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent rounded-xl"></div>
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="h-6 w-2/3 rounded-md bg-white/[0.05]"></div>
              <div className="h-5 w-1/2 rounded-md bg-white/[0.05]"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-7 w-24 rounded-lg bg-white/[0.05]"
                ></div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 rounded-md bg-white/[0.05]"></div>
              <div className="h-4 rounded-md bg-white/[0.05]"></div>
              <div className="h-4 w-2/3 rounded-md bg-white/[0.05]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!animeInfo?.data?.data?.anime) {
    return null;
  }

  const { info, moreInfo } = animeInfo.data.data.anime;
  const totalEpisodes = info.stats.episodes;
  const episodeInfo = totalEpisodes
    ? `Sub: ${totalEpisodes.sub || 0}, Dub: ${totalEpisodes.dub || 0}`
    : "Episodes N/A";

  return (
    <div className="group">
      <div className="w-full rounded-2xl font-outfit border-[1px] border-white/[0.05] bg-secondaryBg/95 p-4 sm:p-5 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

        <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Poster Section */}
          <div className="relative w-full sm:w-40 shrink-0">
            <div className="relative h-52 sm:h-56 rounded-xl overflow-hidden">
              <img
                src={info.poster}
                alt={info.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            {/* Rating Badge */}
            {info.stats?.rating && (
              <div className="absolute top-2 right-2 sm:-top-2 sm:-right-2 bg-primary/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-primary/30">
                <div className="flex items-center gap-1.5">
                  <MdStarOutline className="text-primary w-4 h-4" />
                  <span className="text-white/90 text-sm font-medium">
                    {info.stats.rating}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Title and Metadata */}
            <div className="space-y-3">
              <h2 className="text-lg font-outfit font-semibold text-white/90 leading-snug line-clamp-2 group-hover:text-primary/90 transition-colors duration-300">
                {info.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/50">
                {moreInfo?.aired && (
                  <div className="flex items-center gap-1.5">
                    <HiOutlineCalendar className="w-4 h-4 text-primary/80" />
                    <span>{moreInfo.aired}</span>
                  </div>
                )}
                {info.stats?.duration && (
                  <div className="flex items-center gap-1.5">
                    <HiOutlineClock className="w-4 h-4 text-primary/80" />
                    <span>{info.stats.duration}</span>
                  </div>
                )}
                {moreInfo?.status && (
                  <div className="flex items-center gap-1.5">
                    <BiMoviePlay className="w-4 h-4 text-primary/80" />
                    <span>{moreInfo.status}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-white/50 shrink-0">Episodes:</span>
                <span className="text-white/70 truncate">{episodeInfo}</span>
              </div>
              {moreInfo?.studios && (
                <div className="flex items-center gap-2">
                  <span className="text-white/50 shrink-0">Studios:</span>
                  <span className="text-white/70 truncate">
                    {moreInfo.studios}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-white/50 shrink-0">Type:</span>
                <span className="text-white/70 truncate">
                  {info.stats?.type || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/50 shrink-0">Quality:</span>
                <span className="text-white/70 truncate">
                  {info.stats?.quality || "N/A"}
                </span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {moreInfo?.genres?.map((genre, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1 rounded-lg bg-primary/10 text-text border border-primary/5 hover:bg-primary/20 transition-colors duration-300"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/50 line-clamp-3 sm:line-clamp-2">
              {info.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfoCard;
