import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { BsCcCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FiCheck, FiPlus } from "react-icons/fi";
import { IoCalendarClear } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import { TbClockHour4Filled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { cardVariants, infoVariants, textVariants } from "../../animations";

import useAddToWatchlist from "../../hooks/useAddToWatchlist.jsx";
import useAnimeInfo from "../../hooks/useAnimeInfo";
import Badge from "./Badge.jsx";
import Loader from "./Loader.jsx";

const Card = forwardRef(
  ({ imageUrl, title, id, upcoming, subCount, dubCount }, ref) => {
    const [hovered, setHovered] = useState(false);
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
      <motion.div
        ref={ref}
        variants={cardVariants}
        whileHover="hover"
        onMouseEnter={() => {
          refetch();
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        className="group relative h-[280px] w-[180px] overflow-hidden rounded-2xl border border-white/[0.05] bg-[#0f0f0f] transition-all duration-300 sm:h-[340px] sm:w-[240px] md:h-[38vw] md:w-[28vw] lg:h-[340px] lg:w-[230px] xl:h-[370px] xl:w-64 2xl:h-[24rem] 2xl:w-[16rem]"
      >
        <motion.img
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
          src={imageUrl}
          loading="lazy"
          alt={title}
          className="inset-0 h-full w-full overflow-hidden rounded-2xl"
        />

        <motion.div
          variants={infoVariants}
          initial="initial"
          animate={hovered ? "hover" : "initial"}
          className="absolute -bottom-0 left-0 z-20 flex h-[90%] w-full items-center justify-center overflow-hidden rounded-2xl border-t border-white/[0.05] bg-[#0f0f0f]/80 backdrop-blur-xs"
        >
          <div className="mb-16 flex h-full w-full flex-col justify-center gap-[3px] p-4 text-white lg:gap-2">
            {isLoading ? (
              <div className="mt-auto flex h-[90%] w-full items-center justify-center">
                <Loader size="md" />
              </div>
            ) : isError ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="font-outfit flex h-full w-full items-center justify-center text-xs lg:text-sm"
              >
                Error loading content
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.3 },
                }}
                className="flex flex-col gap-1"
              >
                <div className="mt-16 flex flex-col gap-[3px] md:mt-12 md:gap-1">
                  <div className="flex w-full items-center justify-between">
                    <h3 className="font-outfit text-text/90 line-clamp-2 text-sm font-semibold sm:text-base md:h-fit lg:text-lg">
                      {title}
                    </h3>

                    <Link
                      to={`/info/${id}`}
                      className="hover:text-primary flex items-center justify-center transition-colors duration-300"
                    >
                      <BsFillInfoCircleFill className="h-4 w-4 cursor-pointer" />
                    </Link>
                  </div>
                  <p className="font-outfit text-text/70 line-clamp-2 max-h-16 w-full overflow-hidden text-[11px] text-ellipsis sm:max-h-20 sm:text-xs md:h-fit md:max-h-24 lg:line-clamp-4 2xl:line-clamp-5">
                    {anime?.info?.description}
                  </p>
                </div>

                <div className="flex items-center justify-start gap-1 self-start py-1 sm:py-2">
                  <Badge title={anime?.info?.stats?.type || "N/A"} />
                  {anime?.info?.stats?.episodes?.sub && (
                    <Badge
                      Icon={BsCcCircleFill}
                      title={anime?.info?.stats?.episodes?.sub}
                    />
                  )}

                  {anime?.info?.stats?.episodes?.dub && (
                    <Badge
                      Icon={PiMicrophoneFill}
                      title={anime?.info?.stats?.episodes?.dub}
                    />
                  )}
                </div>

                <div className="font-outfit text-text/70 flex flex-col items-center justify-start gap-1 self-start text-[11px] sm:text-xs md:flex-row md:gap-4">
                  <div className="flex items-center justify-center gap-1 self-start md:self-center">
                    <IoCalendarClear size={14} className="text-primary/90" />
                    <span className="text-[11px] sm:text-xs">
                      {upcoming
                        ? anime?.duration || "N/A"
                        : anime?.moreInfo?.aired?.split("to")[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 self-start md:self-center">
                    <TbClockHour4Filled size={14} className="text-primary/90" />
                    <span className="text-[11px] sm:text-xs">
                      {anime?.moreInfo?.duration || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="font-outfit text-text/70 flex items-center justify-start gap-1 self-start text-[11px] sm:text-xs">
                  <MdCategory size={14} className="text-primary/90" />
                  {anime?.moreInfo?.genres?.length > 1 ? (
                    <>
                      <span>{anime?.moreInfo?.genres[0] || ""}</span>|
                      <span>{anime?.moreInfo?.genres[1] || ""}</span>
                      {anime?.moreInfo?.genres?.length > 1 && (
                        <span className="hidden md:flex">
                          <span>
                            {anime?.moreInfo?.genres[2]
                              ? ` | ${anime?.moreInfo?.genres[2]}`
                              : ""}
                          </span>
                        </span>
                      )}
                    </>
                  ) : (
                    <span>Not available</span>
                  )}
                </div>

                <div className="mt-2 flex w-full items-center justify-evenly gap-1.5 self-start md:mt-2 md:gap-2 md:self-center">
                  <Link
                    to={`/watch/${id}`}
                    className="from-primary via-primary to-primary/90 font-outfit flex w-full flex-1 items-center justify-center gap-1.5 rounded-xl bg-linear-to-r px-3 py-1.5 text-[10px] font-semibold text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)] transition-all duration-300 hover:opacity-90 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs md:py-3"
                  >
                    <FaPlay className="text-[10px] sm:text-xs md:text-sm" />
                    <span className="sm:inline">Watch Now</span>
                  </Link>
                  <button
                    onClick={addToWatchlist}
                    disabled={isPending}
                    className="text-text/90 flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04] sm:h-10 sm:w-10"
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
          </div>
        </motion.div>
        <div className="absolute bottom-0 z-10 flex h-32 w-full flex-col justify-end gap-2 bg-linear-to-t from-black to-transparent">
          <h1 className="font-outfit text-text/90 ml-2 line-clamp-1 w-[90%] text-xs font-bold sm:ml-3 sm:text-sm md:text-[1rem]">
            {title}
          </h1>
          <motion.div
            variants={textVariants}
            className="mb-3 ml-2 flex items-center justify-center gap-1 self-start sm:mb-4 sm:ml-3"
          >
            {subCount && (
              <div className="text-text/90 flex items-center gap-1 rounded-xl border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 transition-all duration-300 hover:bg-white/[0.04] sm:px-3 sm:py-1">
                <BsCcCircleFill className="text-primary/90 text-[10px] sm:text-xs" />
                <span className="font-outfit text-[10px] sm:text-xs">
                  {subCount}
                </span>
              </div>
            )}

            {dubCount && (
              <div className="text-text/90 flex items-center gap-1 rounded-xl border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 transition-all duration-300 hover:bg-white/[0.04] sm:px-3 sm:py-1">
                <PiMicrophoneFill className="text-primary/90 text-[10px] sm:text-xs" />
                <span className="font-outfit text-[10px] sm:text-xs">
                  {dubCount}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  },
);

Card.displayName = "Card";

export default Card;
