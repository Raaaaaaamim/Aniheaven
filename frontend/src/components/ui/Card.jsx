import { motion } from "framer-motion";
import { useState } from "react";
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

const Card = ({ imageUrl, title, id, upcoming, subCount, dubCount }) => {
  const [hovered, setHovered] = useState(false);

  const { refetch, isLoading, data, isError } = useAnimeInfo(id);
  const anime = data?.data?.data?.anime;
  console.log(anime);

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onMouseEnter={() => {
        refetch();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className="group hover:border-text   relative self-start overflow-hidden bg-gray-800 md:w-64 w-[180px] rounded-xl md:h-[370px]"
    >
      <motion.img
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
        src={imageUrl}
        loading="lazy"
        alt={title}
        className="inset-0 overflow-hidden w-full h-full rounded-xl"
      />

      <motion.div
        variants={infoVariants}
        initial="initial"
        animate={hovered ? "hover" : "initial"}
        className="overflow-hidden absolute h-[90%] rounded-xl left-0 -bottom-0 z-20 flex justify-center  items-center w-full bg-secondary/80 backdrop-blur-sm"
      >
        <div className="p-4 mb-16 justify-center  text-white flex flex-col lg:gap-2 gap-[3px] w-full h-full">
          {isLoading ? (
            <div className="flex  mt-auto justify-center items-center w-full h-[90%]">
              <span className="loading loading-ring loading-md"></span>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center w-full h-full">
              Error loading content
            </div>
          ) : (
            <>
              <div className="flex   md:mt-12 mt-16 md:gap-1  gap-[3px] flex-col">
                <div className="flex justify-between w-full  items-center">
                  <h3 className="lg:text-lg h-10 overflow-hidden md:h-fit text-sm font-outfit line-clamp-2 font-bold">
                    {title}
                  </h3>

                  <Link
                    to={`/info/${id}`}
                    className="flex justify-center items-center"
                  >
                    <BsFillInfoCircleFill className=" w-4 h-4  cursor-pointer " />
                  </Link>
                </div>
                <p className=" line-clamp-4 text-ellipsis max-h-8  w-full md:h-fit md:max-h-20 font-poppins overflow-hidden text-xs ">
                  {anime?.info?.description}
                </p>
              </div>

              <div className="flex justify-center self-start py-2 gap-1 items-center">
                <div className="badge badge-xs text-background md:badge-sm bg-primary text-xs font-outfit font-bold border-none ">
                  {anime?.info?.stats?.type || "N/A"}
                </div>
                {anime?.info?.stats?.episodes?.sub && (
                  <div className="badge font-poppins badge-xs  md:badge-sm flex justify-center  items-center bg-[#B0E3AF] text-background/90 gap-1 dm border-none">
                    <BsCcCircleFill className="text-xs" />
                    <span className="text-xs font-bold ">
                      {anime?.info?.stats?.episodes?.sub}
                    </span>
                  </div>
                )}

                {anime?.info?.stats?.episodes?.dub && (
                  <div className="badge badge-xs  md:badge-sm flex justify-center items-center   bg-blue-400 text-background/90 gap-1  border-none">
                    <PiMicrophoneFill className="text-xs" />
                    <span className="text-xs font-bold font-poppins  ">
                      {anime?.info?.stats?.episodes?.dub}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row self-start justify-center font-inter items-center gap-1 md:gap-4   text-sm md:text-base">
                <div className="flex md:self-center self-start justify-center items-center gap-1 ">
                  <IoCalendarClear size={15} className="" />
                  <span className="text-gray-300 text-xs">
                    {upcoming
                      ? anime?.duration || "N/A"
                      : anime?.moreInfo?.aired?.split("to")[0]}
                  </span>
                </div>
                <div className="flex md:self-center self-start justify-center items-center gap-1 ">
                  <TbClockHour4Filled size={15} className="" />
                  <span className="text-xs">
                    {anime?.moreInfo?.duration || "N/A"}
                  </span>
                </div>
              </div>

              <div className="text-xs self-start flex justify-center items-center gap-1 font-inter  text-gray-300">
                <MdCategory size={15} />
                {anime?.moreInfo?.genres?.length > 1 ? (
                  <>
                    <span>{anime?.moreInfo?.genres[0] || ""}</span>|
                    <span>{anime?.moreInfo?.genres[1] || ""}</span>
                    {anime?.moreInfo?.genres?.length > 1 && (
                      <span className=" hidden md:flex ">
                        | {anime?.moreInfo?.genres[2] || ""}
                      </span>
                    )}
                  </>
                ) : (
                  <span>Not available</span>
                )}
              </div>

              <div className="flex self-start md:self-center  md:mt-2 md:gap-2  mt-3 md:justify-center gap-2 justify-evenly w-full items-center">
                <Link to={`/watch/${id}`}>
                  <button className="flex justify-center items-center md:h-10 md:w-44 md:text-sm w-[6.5rem] h-8 gap-2 text-text bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:opacity-90 transition-all duration-300 text-[11px] rounded-full">
                    <FaPlay className="md:text-sm text-xs " />
                    <span className=" text-[11px] font-dmsans md:text-xs  md:flex ">
                      Watch Now
                    </span>
                  </button>
                </Link>
                <button className=" md:w-10 md:h-10 w-8 h-8   hover:bg-white/90 ease-in-out duration-100 rounded-full bg-white flex justify-center items-center">
                  <FiPlus className="text-black" />
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
      <div className="absolute z-10  flex justify-end flex-col  bottom-0 w-full h-32 bg-gradient-to-t gap-2 from-black to-transparent">
        <h1 className=" ml-3 line-clamp-1 w-[90%] font-outfit text-sm md:text-[1rem] font-bold ">
          {title}
        </h1>
        <motion.div
          variants={textVariants}
          className="flex justify-center ml-3 mb-4 self-start  gap-1 items-center"
        >
          {subCount && (
            <div className="badge badge-sm flex justify-center items-center bg-[#B0E3AF] text-black gap-1 dm border-none">
              <BsCcCircleFill className="text-xs" />

              <span className="text-xs">{subCount}</span>
            </div>
          )}

          {dubCount && (
            <div className="badge badge-sm flex justify-center items-center bg-blue-400 text-black gap-1 dm border-none">
              <PiMicrophoneFill className="text-xs" />
              <span className="text-xs">{dubCount}</span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Card;
