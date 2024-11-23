import { motion } from "framer-motion";
import { BsCcCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoCalendarClear } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import { TbClockHour4Filled } from "react-icons/tb";
import useAnimeInfo from "../../hooks/useAnimeInfo.jsx";
const AnimeCard = ({ rank, hide, name, image, id, subCount, dubCount }) => {
  const { refetch, isLoading, data, isError } = useAnimeInfo(id);
  const anime = data?.data?.data?.anime;

  return (
    <div
      onMouseEnter={refetch}
      className="relative hover:scale-[1.05] ease-in-out duration-200 group rounded-xl group   h-[280px] w-[180px] md:w-[200px] overflow-hidden"
    >
      <img
        className=" w-full group-hover:scale-110  ease-in-out duration-200 h-full absolute z-10 top-0 left-0 "
        loading="lazy"
        src={image}
        alt={name}
      />
      {!hide && (
        <h1 className="absolute top-0 right-0 z-10 bg-primary/70 backdrop-blur-lg h-11 w-9 flex justify-center items-center text-text text-xl rounded-bl-xl border-text/90 border-b-[2px] font-[800]">
          {rank >= 10 ? rank : `0${rank}`}
        </h1>
      )}
      <div className="absolute z-10 bottom-0  flex justify-start  w-full left-0 right-0   bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex relative py-2 ml-2 md:py-4 items-center gap-2">
          <div className="  flex mr-2   justify-center gap-1  flex-col-reverse ">
            <div className=" flex gap-[1px] items-center  ">
              {dubCount && (
                <div className="badge badge-xs md:badge-sm   flex justify-center items-center rounded-r-lg  bg-blue-400 text-black gap-1 dm border-none">
                  <PiMicrophoneFill className=" text-xs " />
                  <span className="text-xs">{dubCount ? dubCount : "N/A"}</span>
                </div>
              )}
              {subCount && (
                <div className="badge badge-xs md:badge-sm rounded-l-lg     flex justify-center items-center  bg-[#B0E3AF] text-black gap-1 dm border-none">
                  <BsCcCircleFill className=" text-xs " />
                  <span className="text-xs">{subCount ? subCount : "N/A"}</span>
                </div>
              )}
            </div>
            <h3
              className="text-[1rem] font-outfit w-[100%] h-5  font-semibold
           text-white/90  line-clamp-1  "
            >
              {name}
            </h3>
          </div>
        </div>
      </div>
      <motion.div className=" group-hover:bottom-0 ease-in-out duration-200  z-20 rounded-xl  absolute -bottom-[100%] left-0 backdrop-blur-sm w-full items-center flex justify-center  h-[90%] bg-secondary/80 ">
        {isLoading ? (
          <div className="flex  mt-auto justify-center items-center w-full h-[90%]">
            <span className="loading loading-ring loading-md"></span>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-red-500">Error fetching anime info</div>
          </div>
        ) : (
          <div className=" gap-1 flex w-[90%] flex-col justify-center h-fit ">
            <div
              id="anime-info"
              className="flex font-poppins    md:gap-1  gap-[3px] flex-col"
            >
              <div className="flex justify-between w-full  items-center">
                <h3 className=" w-[80%]  line-clamp-2 overflow-hidden md:h-fit text-sm font-outfit font-bold">
                  {name}
                </h3>
                <div className="flex justify-center items-center">
                  <BsFillInfoCircleFill className=" w-4 h-4  cursor-pointer " />
                </div>
              </div>
              <p className=" text-ellipsis   w-full   overflow-hidden text-xs line-clamp-2 ">
                {anime?.info?.description}
              </p>
            </div>

            <div className="flex bg-background/40 px-3 rounded-lg justify-center self-start   gap-1 items-center">
              <div className=" py-[2px] border-r-text/50 bg-transparent   px-1 pr-2 text-text/70 border-r-[1px] text-xs font-poppins font-bold  ">
                {anime?.info?.stats?.type || "N/A"}
              </div>
              {anime?.info?.stats?.episodes?.sub && (
                <div
                  className=" px-1 pr-2
                 py-[2px] border-r-text/50   flex justify-center items-center bg-transparent border-r-[1px] text-text/80 gap-1 font-poppins   "
                >
                  <BsCcCircleFill size={12} />
                  <span className="text-xs">
                    {anime?.info?.stats?.episodes?.sub}
                  </span>
                </div>
              )}

              {anime?.info?.stats?.episodes?.dub && (
                <div className=" px-1  flex justify-center items-center  bg-transparent  text-text/80 gap-1 font-poppins border-none">
                  <PiMicrophoneFill size={12} />
                  <span className="text-xs">
                    {anime?.info?.stats?.episodes?.dub}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row self-start justify-center items-center gap-2    text-sm md:text-base">
              <div className="flex  self-start justify-center items-center gap-1 ">
                <IoCalendarClear size={15} className="" />
                <span className="text-gray-300 line-clamp-1 font-outfit text-xs">
                  {anime?.moreInfo?.aired || "N/A"}
                </span>
              </div>
              <div className="flex  self-start font-outfit justify-center items-center gap-1 ">
                <TbClockHour4Filled size={15} className="" />
                <span className="text-xs">
                  {anime?.moreInfo?.duration || "N/A"}
                </span>
              </div>
            </div>

            <div className="text-xs self-start flex justify-center items-center gap-2 font-outfit  text-gray-300">
              <MdCategory size={15} />
              {anime?.moreInfo?.genres?.length > 1 ? (
                <>
                  <span>{anime?.moreInfo?.genres[0] || ""}</span>|
                  <span>{anime?.moreInfo?.genres[1] || ""}</span>
                </>
              ) : (
                <span>Not available</span>
              )}
            </div>

            <div className="flex self-start    mt-[8px]   gap-[8px] justify-evenly w-full items-center">
              <button
                className="btn  flex
                   justify-center items-center text-text     w-[8.5rem] h-8  btn-primary text-[11px] btn-sm rounded-full"
              >
                <FaPlay className=" text-xs " />
                <span className=" text-[11px]   ">Watch Now</span>
              </button>
              <button className="   w-8 h-8   hover:bg-white/90 ease-in-out duration-100 rounded-full bg-white flex justify-center items-center">
                <FiPlus className="text-black" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnimeCard;
