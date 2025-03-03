import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsCcCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { FiCheck, FiPlus } from "react-icons/fi";
import { IoCalendarClear } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";
import { PiMicrophoneFill } from "react-icons/pi";
import { TbClockHour4Filled } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAddToWatchlist from "../../hooks/useAddToWatchlist.jsx";
import useAnimeInfo from "../../hooks/useAnimeInfo.jsx";
import Badge from "./Badge.jsx";
import Loader from "./Loader.jsx";

const AnimeCard = ({
  rank,
  hide,
  name,
  image,
  id,
  subCount,
  dubCount,
  index,
}) => {
  const { refetch, isLoading, data, isError } = useAnimeInfo(id);
  const { mutate, isPending } = useAddToWatchlist();

  const anime = data?.data?.data?.anime;
  const initialIsInWatchlist = anime?.isInWatchlist || false;
  const [isInWatchlist, setIsInWatchlist] = useState(initialIsInWatchlist);
  const addToWatchlist = () => {
    if (!data) return;
    mutate(
      {
        HiAnimeId: id,
        name: anime?.info?.name,
        poster: anime?.info?.poster,
        type: anime?.info?.stats?.type,
        jname: anime?.moreInfo?.japanese,
        episodes: anime?.info?.stats?.episodes,
      },
      {
        onSuccess: () => {
          setIsInWatchlist((pre) => !pre);
        },
      },
    );
  };
  useEffect(() => {
    setIsInWatchlist(data?.data?.data?.anime?.isInWatchlist || false);
  }, [data]);
  return (
    <div
      onMouseEnter={refetch}
      className="group relative h-[270px] w-[180px] overflow-hidden rounded-xl border border-white/[0.05] bg-[#0f0f0f] duration-300 ease-in-out hover:scale-[1.02] sm:h-[280px] sm:w-[190px] md:w-[200px]"
    >
      <img
        className="absolute top-0 left-0 z-10 h-full w-full rounded-xl duration-300 ease-in-out group-hover:scale-110"
        loading="lazy"
        src={image}
        alt={name}
      />
      {!hide && (
        <h1 className="from-primary via-primary to-primary/80 font-poppins absolute top-0 right-0 z-10 flex h-11 w-9 items-center justify-center rounded-bl-xl border-b-2 bg-linear-to-r text-xl font-[800] text-black/90">
          {rank >= 10 ? rank : `0${rank}`}
        </h1>
      )}
      <div className="absolute right-0 bottom-0 left-0 z-10 flex w-full justify-start bg-linear-to-t from-black/80 to-transparent">
        <div className="relative ml-2 flex items-center gap-2 py-2 md:py-4">
          <div className="mr-2 flex flex-col-reverse justify-center gap-1">
            <div className="flex items-center gap-[2px]">
              {dubCount && (
                <Badge
                  Icon={PiMicrophoneFill}
                  title={dubCount ? dubCount : "N/A"}
                />
              )}
              {subCount && (
                <Badge
                  Icon={BsCcCircleFill}
                  title={subCount ? subCount : "N/A"}
                />
              )}
            </div>
            <h3 className="font-outfit text-text/90 line-clamp-1 h-5 w-[100%] text-[1rem] font-semibold">
              {name}
            </h3>
          </div>
        </div>
      </div>
      <motion.div className="absolute -bottom-[100%] left-0 z-20 flex h-[90%] w-full items-center justify-center rounded-xl border-t border-white/[0.05] bg-[#0f0f0f]/80 backdrop-blur-xs duration-200 ease-in-out group-hover:bottom-0">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader size="sm" />
          </div>
        ) : isError ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-outfit flex h-full items-center justify-center text-xs lg:text-sm"
          >
            <div className="text-text/70">Error fetching anime info</div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex h-fit w-[90%] flex-col justify-center gap-1"
          >
            <div
              id="anime-info"
              className="font-outfit flex flex-col gap-[3px] md:gap-1"
            >
              <div className="flex w-full items-center justify-between">
                <Link
                  to={`/info/${id}`}
                  className="font-outfit text-text/90 line-clamp-2 w-[80%] overflow-hidden text-sm font-semibold md:h-fit"
                >
                  {name}
                </Link>
                <Link
                  to={`/info/${id}`}
                  className="hover:text-primary flex items-center justify-center text-white/80 transition-colors duration-300"
                >
                  <BsFillInfoCircleFill className="h-4 w-4 cursor-pointer" />
                </Link>
              </div>
              <p className="text-text/70 line-clamp-2 w-full overflow-hidden text-xs text-ellipsis">
                {anime?.info?.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1">
              {anime?.moreInfo?.genres?.slice(0, 2).map((genre, index) => (
                <div
                  key={index}
                  className="font-outfit text-text/90 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-1 text-xs font-medium transition-all duration-300 hover:bg-white/[0.04]"
                >
                  {genre}
                </div>
              ))}
            </div>

            <div className="mt-2 flex flex-col gap-1">
              <div className="text-text/70 flex items-center gap-1 text-xs">
                <IoCalendarClear size={14} className="text-primary/90" />
                <span className="font-outfit">
                  {anime?.moreInfo?.aired?.split("to")[0] || "N/A"}
                </span>
              </div>
              <div className="text-text/70 flex items-center gap-1 text-xs">
                <TbClockHour4Filled size={14} className="text-primary/90" />
                <span className="font-outfit">
                  {anime?.moreInfo?.duration || "N/A"}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <Link to={`/watch/${id}`} className="mr-2 flex-1">
                <button className="from-primary via-primary to-primary/90 font-outfit flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r px-4 py-2 text-xs font-semibold text-black transition-all duration-300 hover:opacity-90">
                  <span>Watch Now</span>
                </button>
              </Link>
              <button
                onClick={addToWatchlist}
                className="text-text/90 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04]"
              >
                {isPending ? (
                  <LuLoader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                ) : isInWatchlist ? (
                  <FiCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <FiPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AnimeCard;
