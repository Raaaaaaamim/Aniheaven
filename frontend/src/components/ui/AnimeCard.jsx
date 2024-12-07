import { motion } from "framer-motion";
import { BsCcCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoCalendarClear } from "react-icons/io5";
import { PiMicrophoneFill } from "react-icons/pi";
import { TbClockHour4Filled } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAnimeInfo from "../../hooks/useAnimeInfo.jsx";

const AnimeCard = ({ rank, hide, name, image, id, subCount, dubCount }) => {
  const { refetch, isLoading, data, isError } = useAnimeInfo(id);
  const anime = data?.data?.data?.anime;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1.0],
          opacity: { duration: 0.4 },
          scale: { duration: 0.3 },
        },
      }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={refetch}
      className="relative hover:scale-[1.02] ease-in-out duration-300 group rounded-xl h-[280px] w-[180px] md:w-[200px] overflow-hidden border border-white/[0.05]  bg-[#0f0f0f]"
    >
      <img
        className="w-full group-hover:scale-110 ease-in-out duration-300 h-full absolute z-10 top-0 left-0 rounded-xl"
        loading="lazy"
        src={image}
        alt={name}
      />
      {!hide && (
        <h1 className="absolute top-0 right-0 z-10 bg-gradient-to-r from-primary via-primary to-primary/80 font-poppins h-11 w-9 flex justify-center items-center text-black/90 text-xl rounded-bl-xl font-[800] border-b-2 ">
          {rank >= 10 ? rank : `0${rank}`}
        </h1>
      )}
      <div className="absolute z-10 bottom-0 flex justify-start w-full left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex relative py-2 ml-2 md:py-4 items-center gap-2">
          <div className="flex mr-2 justify-center gap-1 flex-col-reverse">
            <div className="flex gap-[2px] items-center">
              {dubCount && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300">
                  <PiMicrophoneFill className="text-xs text-primary/90" />
                  <span className="text-xs font-outfit">
                    {dubCount ? dubCount : "N/A"}
                  </span>
                </div>
              )}
              {subCount && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300">
                  <BsCcCircleFill className="text-xs text-primary/90" />
                  <span className="text-xs font-outfit">
                    {subCount ? subCount : "N/A"}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-[1rem] font-outfit w-[100%] h-5 font-semibold text-text/90 line-clamp-1">
              {name}
            </h3>
          </div>
        </div>
      </div>
      <motion.div className="group-hover:bottom-0 ease-in-out duration-200 z-20 rounded-xl absolute -bottom-[100%] left-0 w-full items-center flex justify-center h-[90%] bg-[#0f0f0f]/80 backdrop-blur-sm border-t border-white/[0.05]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-32 flex items-center justify-center"
            >
              <span className="loading loading-ring loading-md"></span>
            </motion.div>
          </div>
        ) : isError ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex justify-center items-center h-full text-xs lg:text-sm font-outfit"
          >
            <div className="text-text/70">Error fetching anime info</div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="gap-1 flex w-[90%] flex-col justify-center h-fit"
          >
            <div
              id="anime-info"
              className="flex font-outfit md:gap-1 gap-[3px] flex-col"
            >
              <div className="flex justify-between w-full items-center">
                <Link
                  to={`/info/${id}`}
                  className="w-[80%] line-clamp-2 overflow-hidden md:h-fit text-sm font-outfit font-semibold text-text/90"
                >
                  {name}
                </Link>
                <Link
                  to={`/info/${id}`}
                  className="flex justify-center items-center hover:text-primary transition-colors duration-300"
                >
                  <BsFillInfoCircleFill className="w-4 h-4 cursor-pointer" />
                </Link>
              </div>
              <p className="text-ellipsis w-full overflow-hidden text-xs line-clamp-2 text-text/70">
                {anime?.info?.description}
              </p>
            </div>

            <div className="flex flex-wrap      gap-1">
              {anime?.moreInfo?.genres?.slice(0, 2).map((genre, index) => (
                <div
                  key={index}
                  className="text-xs font-outfit font-medium px-3 py-1 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300"
                >
                  {genre}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-1 text-xs text-text/70">
                <IoCalendarClear size={14} className="text-primary/90" />
                <span className="font-outfit">
                  {anime?.moreInfo?.aired?.split("to")[0] || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-text/70">
                <TbClockHour4Filled size={14} className="text-primary/90" />
                <span className="font-outfit">
                  {anime?.moreInfo?.duration || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <Link to={`/watch/${id}`} className="flex-1 mr-2">
                <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-primary via-primary to-primary/90 text-black text-xs font-outfit font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2">
                  <span>Watch Now</span>
                </button>
              </Link>
              <button className="w-10 h-10 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300 flex items-center justify-center">
                <FiPlus className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AnimeCard;
