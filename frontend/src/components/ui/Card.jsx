import { motion } from "framer-motion";
import { useState } from "react";
import { BsCcCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoCalendarClear } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import { TbClockHour4Filled } from "react-icons/tb";
import {
  buttonVariants,
  cardVariants,
  infoVariants,
  textVariants,
  trimmedContent,
} from "../../../lib/utils.js";
import useAnimeInfo from "../../hooks/useAnimeInfo.jsx";

const Card = ({
  imageUrl,
  title,
  id,
  description,
  releaseDate,
  duration,
  categories,
  subCount,
  dubCount,
}) => {
  const [hovered, setHovered] = useState(false);

  const { refetch, isLoading, data, isError } = useAnimeInfo(id);
  const anime = data?.data?.data?.anime;
  console.log(anime);
  console.log(isLoading);

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onMouseEnter={() => {
        refetch();
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className="group relative self-start overflow-hidden bg-gray-800 md:w-64 w-[180px] rounded-xl md:h-[350px]"
    >
      <motion.img
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
        src={imageUrl}
        alt={title}
        className="inset-0 overflow-hidden w-full h-full rounded-xl"
      />

      <motion.div
        variants={infoVariants}
        initial="initial"
        animate={hovered ? "hover" : "initial"}
        className="overflow-hidden absolute h-[90%] rounded-xl left-0 -bottom-0 z-20 flex justify-center  items-center w-full bg-secondary/90 backdrop-blur-sm"
      >
        <motion.div
          variants={textVariants}
          className="p-4 mb-16 justify-center  text-white flex flex-col gap-2 w-full h-full"
        >
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
              <motion.div
                variants={textVariants}
                className="flex mt-12 gap-1 flex-col"
              >
                <div className="flex justify-between w-full  items-center">
                  <h3 className="lg:text-lg text-md font-poppins font-bold">
                    {title?.length > 30 ? trimmedContent(title, 30) : title}
                  </h3>
                  <div className="flex justify-center items-center">
                    <BsFillInfoCircleFill className=" w-4 h-4  cursor-pointer " />
                  </div>
                </div>
                <p className="lg:text-sm text-xs ">
                  {anime?.info?.description?.length > 65
                    ? trimmedContent(anime?.info?.description, 65)
                    : anime?.info?.description}
                </p>
              </motion.div>

              <motion.div
                variants={textVariants}
                className="flex justify-center self-start py-2 gap-1 items-center"
              >
                <div className="badge  badge-sm bg-primary text-xs font-bold border-none ">
                  {anime?.info?.stats?.quality || "N/A"}
                </div>
                {anime?.info?.stats?.episodes?.sub && (
                  <div className="badge badge-sm flex justify-center items-center bg-[#B0E3AF] text-black gap-1 dm border-none">
                    <BsCcCircleFill className="text-xs" />
                    <span className="text-xs">
                      {anime?.info?.stats?.episodes?.sub}
                    </span>
                  </div>
                )}

                {anime?.info?.stats?.episodes?.dub && (
                  <div className="badge badge-sm flex justify-center items-center bg-blue-400 text-black gap-1 dm border-none">
                    <PiMicrophoneFill className="text-xs" />
                    <span className="text-xs">
                      {anime?.info?.stats?.episodes?.dub}
                    </span>
                  </div>
                )}
              </motion.div>

              <motion.div
                variants={textVariants}
                className="flex self-start justify-center items-center gap-2 md:gap-4 text-sm md:text-base"
              >
                <div className="flex justify-center items-center gap-1 ">
                  <IoCalendarClear size={15} className="" />
                  <span className="text-gray-300 text-xs">
                    {anime?.moreInfo?.aired?.split("to")[0]}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-1 ">
                  <TbClockHour4Filled size={15} className="" />
                  <span className="text-xs">
                    {anime?.moreInfo?.duration || "N/A"}
                  </span>
                </div>
              </motion.div>

              <motion.div
                variants={textVariants}
                className="text-xs self-start flex justify-center items-center gap-1 text-gray-300"
              >
                <MdCategory size={15} />
                {anime?.moreInfo?.genres?.map((genre, index) => {
                  if (index === 3) {
                    return "";
                  }
                  if (
                    index === 2 ||
                    index === anime?.moreInfo?.genres?.length - 1
                  ) {
                    return <span key={index}>{genre}</span>;
                  }
                  return <span key={index}>{genre} |</span>;
                })}
                <span>{categories}</span>
              </motion.div>

              <motion.div
                variants={textVariants}
                className="flex md:mt-2 md:gap-2 gap-4 mt-3 justify-center justify-items-stretch"
              >
                <motion.button
                  variants={buttonVariants}
                  whileTap="tap"
                  className="btn  flex
                   justify-center items-center md:h-10 md:w-44   md:text-sm w-10 h-10  btn-primary text-xs btn-sm rounded-full"
                >
                  <FaPlay className="md:text-sm text-xs " />
                  <span className=" hidden md:flex ">Watch Now</span>
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileTap="tap"
                  className=" w-10 h-10   hover:bg-accent/90 ease-in-out duration-100 rounded-full bg-accent flex justify-center items-center"
                >
                  <FiPlus className="text-black" />
                </motion.button>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
      <div className="absolute z-10  flex justify-end flex-col  bottom-0 w-full h-32 bg-gradient-to-t gap-2 from-black to-transparent">
        <motion.h1 className=" ml-3  font-poppins text-md font-bold ">
          {title?.length > 40 ? trimmedContent(title, 40) : title}
        </motion.h1>
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
