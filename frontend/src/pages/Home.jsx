import { AnimatePresence, motion } from "framer-motion";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
import { IoCalendarClear } from "react-icons/io5";
import { TbClockHour4Filled } from "react-icons/tb";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BsCcCircleFill } from "react-icons/bs";
import { MdOutlineTrendingUp } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import {
  containerVariants,
  spotlightVariants,
  trimmedContent,
} from "../../lib/utils.js";
import Card from "../components/ui/Card.jsx";

export const api = "http://localhost:4000/api/v2";
const Home = () => {
  const {
    data: animeData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      return await axios.get(`${api}/hianime/home`);
    },

    staleTime: 1000 * 60 * 3,
  });
  const data = animeData?.data;

  return isLoading ? (
    <div className="flex items-center justify-center w-full h-screen">
      <span className="loading loading-ring w-20 h-20"></span>
    </div>
  ) : (
    <>
      {isError ? (
        <div className=" w-[100%]  flex justify-center items-center h-[100vh] ">
          Error loading content
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="lg:w-[100%] flex w-full max-w-[1200px] items-center flex-col min-h-[100vh] colors.gray.950 p-4 justify-center "
        >
          {/* Spotlight Swiper */}
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} !bg-primary hover:!bg-purple-500 !w-[6px]  !h-[6px]"></span>`;
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-full xl:h-[80vh] max-w-8xl md:h-[400px] lg:mx-auto h-[300px] lg:h-[600px]  max-h-[650px] rounded-3xl overflow-hidden"
          >
            {data?.data?.spotlightAnimes?.map((anime) => (
              <SwiperSlide key={anime.id}>
                <motion.div
                  variants={spotlightVariants}
                  className="relative w-full h-full bg-black rounded-3xl overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                    <img
                      className="h-full w-full object-cover"
                      src={anime.poster}
                      alt={anime.name}
                    />
                  </motion.div>

                  <motion.div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-8 lg:px-12 text-white">
                    <motion.h1 className="lg:text-7xl text-2xl flex flex-wrap md:text-5xl gap-3 lg:mb-4 font-poppins">
                      <div className="flex flex-wrap items-center">
                        <div className="font-bold font-poppins bg-gradient-to-r from-primary via-[#007262] to-primary/90 text-transparent bg-clip-text">
                          {anime.name.length > 37
                            ? trimmedContent(anime.name, 37)
                            : anime.name}
                        </div>
                      </div>
                    </motion.h1>
                    <motion.div className="flex justify-center self-start py-2 md:py-4 gap-1 md:gap-2 items-center">
                      <div className="badge badge-sm md:badge-md bg-primary text-black border-none dm">
                        {anime.otherInfo[3] || "N/A"}
                      </div>
                      <div className="badge badge-sm md:badge-md flex justify-center items-center bg-[#B0E3AF] text-black gap-1 dm border-none">
                        <BsCcCircleFill className="text-xs md:text-sm" />
                        <span className="text-xs md:text-sm">
                          {anime.episodes.sub}
                        </span>
                      </div>
                      <div className="badge badge-sm md:badge-md flex justify-center items-center bg-blue-400 text-black gap-1 dm border-none">
                        <PiMicrophoneFill className="text-xs md:text-sm" />
                        <span className="text-xs md:text-sm">
                          {anime.episodes.dub}
                        </span>
                      </div>
                    </motion.div>

                    <motion.div className="flex mb-2 md:mb-3 self-start justify-center items-center gap-2 md:gap-4 text-sm md:text-base">
                      <div className="flex justify-center items-center gap-1 md:gap-2">
                        <IoCalendarClear className="text-sm md:text-base" />
                        <span className="text-gray-300 text-xs md:text-base">
                          {anime.otherInfo[2] || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-center items-center gap-1 md:gap-2">
                        <TbClockHour4Filled className="text-sm md:text-base" />
                        <span className="text-gray-300 text-xs md:text-base">
                          {anime.otherInfo[1] || "N/A"}
                        </span>
                      </div>
                    </motion.div>
                    <motion.p className="lg:text-md text-xs md:text-sm font-poppins md:mb-8 mb-3 mb max-w-md text-gray-300">
                      {anime.description.length > 150
                        ? trimmedContent(anime.description, 150)
                        : anime.description}
                    </motion.p>
                    <div className="flex gap-4">
                      <button className="bg-primary hover:scale-105 hover:bg-primary/90  duration-100 lg:px-8 lg:py-4 rounded-full flex items-center gap-2 ease-in font-poppins lg:text-sm text-black justify-center  md:py-3 text-xs px-4 md:px-5">
                        <FaPlay className="text-sm" />
                        <span className="hidden font-poppins font-bold md:flex">
                          Watch Now
                        </span>
                      </button>

                      <button className="bg-secondary/90 hover:scale-105  lg:py-4 font-poppins lg:px-8 py-4 rounded-full flex items-center gap-2 hover:bg-secondary transition-all px-4 text-xs lg:text-sm md:py-3 md:px-5 ease-in duration-100">
                        <FaInfoCircle className="text-md" />
                        <span className="hidden md:flex">More Info</span>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <motion.div className="gap-4 mt-10 flex-col w-[100%] max-w-full  flex justify-center items-center flex-wrap min-h-[60vh]">
            <div className=" self-start md:text-3xl md:self-start text-2xl flex justify-center md:ml-10 lg:ml-[2vw] items-center gap-2 lg:text-3xl  font-bold font-poppins">
              <MdOutlineTrendingUp />
              Latest Episode Anime
            </div>
            <div className="gap-3 w-[99%] flex justify-center items-center flex-wrap">
              <AnimatePresence>
                {data?.data?.latestEpisodeAnimes?.map((anime, index) => (
                  <motion.div
                    key={anime.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      imageUrl={anime.poster}
                      title={anime.name}
                      rank={anime.rank}
                      id={anime.id}
                      subCount={anime.episodes.sub}
                      dubCount={anime.episodes.dub}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Home;
