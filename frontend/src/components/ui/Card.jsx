import { motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { BsCcCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoCalendarClear } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import { TbClockHour4Filled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { cardVariants, infoVariants, textVariants } from "../../animations";
import useAnimeInfo from "../../hooks/useAnimeInfo";
import Badge from "./Badge.jsx";

const Card = forwardRef(
  ({ imageUrl, title, id, upcoming, subCount, dubCount }, ref) => {
    const [hovered, setHovered] = useState(false);

    const { refetch, isLoading, data, isError } = useAnimeInfo(id);
    const anime = data?.data?.data?.anime;

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
        className="group relative  overflow-hidden bg-[#0f0f0f] w-full sm:w-[240px] md:w-[230px]  rounded-2xl h-[280px] sm:h-[340px] md:h-[340px] xl:h-[370px] xl:w-64 border border-white/[0.05]   transition-all 2xl:w-[16rem] 2xl:h-[24rem] duration-300"
      >
        <motion.img
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
          src={imageUrl}
          loading="lazy"
          alt={title}
          className="inset-0 overflow-hidden w-full h-full rounded-2xl"
        />

        <motion.div
          variants={infoVariants}
          initial="initial"
          animate={hovered ? "hover" : "initial"}
          className="overflow-hidden absolute h-[90%] rounded-2xl left-0 -bottom-0 z-20 flex justify-center items-center w-full bg-[#0f0f0f]/80 backdrop-blur-sm border-t border-white/[0.05]"
        >
          <div className="p-4 mb-16 justify-center text-white flex flex-col lg:gap-2 gap-[3px] w-full h-full">
            {isLoading ? (
              <div className="flex mt-auto justify-center items-center w-full h-[90%]">
                <span className="loading loading-ring loading-md"></span>
              </div>
            ) : isError ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center items-center w-full h-full text-xs lg:text-sm font-outfit"
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
                className=" flex flex-col gap-1 "
              >
                <div className="flex md:mt-12 mt-16 md:gap-1 gap-[3px] flex-col">
                  <div className="flex justify-between w-full items-center">
                    <h3 className="text-sm sm:text-base lg:text-lg  md:h-fit font-outfit line-clamp-2 font-semibold text-text/90">
                      {title}
                    </h3>

                    <Link
                      to={`/info/${id}`}
                      className="flex justify-center items-center hover:text-primary transition-colors duration-300"
                    >
                      <BsFillInfoCircleFill className="w-4 h-4 cursor-pointer" />
                    </Link>
                  </div>
                  <p className="lg:line-clamp-4 text-ellipsis max-h-16 sm:max-h-20 w-full md:h-fit md:max-h-24 font-outfit overflow-hidden text-[11px] 2xl:line-clamp-5 line-clamp-2 sm:text-xs text-text/70">
                    {anime?.info?.description}
                  </p>
                </div>

                <div className="flex justify-start self-start py-1 sm:py-2 gap-1 items-center">
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

                <div className="flex flex-col md:flex-row self-start justify-start font-outfit items-center gap-1 md:gap-4 text-[11px] sm:text-xs text-text/70">
                  <div className="flex md:self-center self-start justify-center items-center gap-1">
                    <IoCalendarClear size={14} className="text-primary/90" />
                    <span className="text-[11px] sm:text-xs">
                      {upcoming
                        ? anime?.duration || "N/A"
                        : anime?.moreInfo?.aired?.split("to")[0]}
                    </span>
                  </div>
                  <div className="flex md:self-center self-start justify-center items-center gap-1">
                    <TbClockHour4Filled size={14} className="text-primary/90" />
                    <span className="text-[11px] sm:text-xs">
                      {anime?.moreInfo?.duration || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs self-start flex justify-start items-center gap-1 font-outfit text-text/70">
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

                <div className="flex self-start md:self-center md:mt-2 md:gap-2 mt-2 gap-1.5 justify-evenly   w-full items-center">
                  <Link
                    to={`/watch/${id}`}
                    className="w-full flex-1 py-1.5  sm:py-2 px-3 sm:px-4 rounded-xl md:py-3 bg-gradient-to-r from-primary via-primary to-primary/90 text-black text-[10px] sm:text-xs font-outfit font-semibold hover:opacity-90 transition-all duration-300 shadow-[0_4px_16px_rgba(120,119,198,0.4)] flex items-center justify-center gap-1.5 sm:gap-2"
                  >
                    <FaPlay className="text-[10px] md:text-sm sm:text-xs" />
                    <span className=" sm:inline">Watch Now</span>
                  </Link>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300 flex items-center justify-center">
                    <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        <div className="absolute z-10 flex justify-end flex-col bottom-0 w-full h-32 bg-gradient-to-t gap-2 from-black to-transparent">
          <h1 className="ml-2 sm:ml-3 line-clamp-1 w-[90%] font-outfit text-xs sm:text-sm md:text-[1rem] font-bold text-text/90">
            {title}
          </h1>
          <motion.div
            variants={textVariants}
            className="flex justify-center ml-2 sm:ml-3 mb-3 sm:mb-4 self-start gap-1 items-center"
          >
            {subCount && (
              <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300">
                <BsCcCircleFill className="text-[10px] sm:text-xs text-primary/90" />
                <span className="text-[10px] sm:text-xs font-outfit">
                  {subCount}
                </span>
              </div>
            )}

            {dubCount && (
              <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300">
                <PiMicrophoneFill className="text-[10px] sm:text-xs text-primary/90" />
                <span className="text-[10px] sm:text-xs font-outfit">
                  {dubCount}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
