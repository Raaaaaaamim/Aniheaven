import { AnimatePresence, motion } from "framer-motion";
import { FaInfoCircle, FaPlay, FaRegHeart } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { IoCalendarClear } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { TbClockHour4Filled } from "react-icons/tb";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BsCcCircleFill, BsTrophyFill } from "react-icons/bs";
import { FaFire } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineTrendingUp } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import { TbBroadcast } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  containerVariants,
  spotlightVariants,
  trimmedContent,
} from "../../lib/utils.js";
import AnimeCard from "../components/ui/AnimeCard.jsx";
import Card from "../components/ui/Card.jsx";
import TrendingCard from "../components/ui/TrendingCard.jsx";

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
  console.log(data);

  const [timePeriod, setTimePeriod] = useState("today");
  return isLoading ? (
    <div className="flex items-center justify-center w-full h-screen">
      <span className="loading loading-ring w-20 h-20"></span>
    </div>
  ) : (
    <>
      {isError ? (
        <div className=" w-[100%] font-poppins flex-col gap-4  flex justify-center items-center h-[100vh] ">
          <h1 className=" text-3xl md:text-6xl  font-bold text-primary ">
            404
          </h1>
          <h3 className=" text-sm text-text ">
            There was an error while loading the content{" "}
          </h3>
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
                return `<span class="${className} !bg-primary/80 hover:!bg-primary !w-[6px] !h-[6px]"></span>`;
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-full xl:h-[80vh] max-w-8xl md:h-[400px] lg:mx-auto h-[300px] lg:h-[600px] max-h-[620px] rounded-3xl overflow-hidden custom-swiper"
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

                  <motion.div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-8 lg:px-12 text-text">
                    <motion.h1 className="lg:text-6xl text-2xl flex flex-wrap md:text-5xl gap-3 lg:mb-4 font-poppins">
                      <div className="flex flex-wrap items-center">
                        <div className="font-bold font-poppins bg-gradient-to-r from-text  to-primary/90 text-transparent bg-clip-text">
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
                      {anime?.episodes?.sub && (
                        <div className="badge badge-sm md:badge-md flex justify-center items-center bg-[#B0E3AF] text-black gap-1 dm border-none">
                          <BsCcCircleFill className="text-xs md:text-sm" />
                          <span className="text-xs md:text-sm">
                            {anime.episodes.sub}
                          </span>
                        </div>
                      )}
                      {anime?.episodes?.dub && (
                        <div className="badge badge-sm md:badge-md flex justify-center items-center bg-blue-400 text-black gap-1 dm border-none">
                          <PiMicrophoneFill className="text-xs md:text-sm" />
                          <span className="text-xs md:text-sm">
                            {anime.episodes.dub}
                          </span>
                        </div>
                      )}
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
                      <Link
                        to={`/watch/${anime?.id}`}
                        state={{ poster: anime.poster }}
                        className="bg-primary hover:scale-105 hover:bg-primary/90  duration-100 lg:px-8 lg:py-4 rounded-full flex items-center gap-2 ease-in font-poppins lg:text-sm text-black justify-center  md:py-3 text-xs px-4 py-1 md:px-5"
                      >
                        <FaPlay className="lg:text-sm text-[11px] " />
                        <span className=" text-xs md:text-sm  font-poppins font-bold md:flex">
                          Watch Now
                        </span>
                      </Link>

                      <Link
                        to={`/${anime?.id}`}
                        className="bg-secondary/90 hover:scale-105  lg:py-4 font-poppins lg:px-8 py-4 rounded-full flex items-center gap-2 hover:bg-secondary transition-all px-4 text-xs lg:text-sm md:py-3 md:px-5 ease-in duration-100"
                      >
                        <FaInfoCircle className="text-md" />
                        <span className="hidden md:flex">More Info</span>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-5 lg:ml-3  w-full">
            <div className=" flex w-full  justify-start my-4 items-center gap-2 ">
              <MdOutlineTrendingUp size={23} />

              <h1 className=" text-2xl font-bold font-poppins ">Trending</h1>
            </div>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              className="relative rounded-xl overflow-hidden"
            >
              {data?.data?.trendingAnimes?.map((anime, index) => (
                <SwiperSlide key={anime.id}>
                  <TrendingCard
                    rank={index + 1}
                    title={anime.name}
                    image={anime.poster}
                  />
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev after:!text-primary after:!text-2xl text-sm flex text-black h-fit bg-primary rounded-full justify-center items-center  hover:after:!text-primary/80">
                <IoIosArrowRoundBack />
              </div>
              <div className="swiper-button-next h-fit after:!text-primary after:!text-2xl  text-black bg-primary text-xs rounded-full hover:after:!text-primary/80">
                <IoIosArrowRoundForward />
              </div>
            </Swiper>
          </div>

          <motion.div className="gap-[16px] mt-[40px] flex-col  w-full  flex justify-center items-center flex-wrap min-h-[60vh]">
            <div className=" self-start md:text-2xl md:self-start text-2xl flex justify-center md:ml-7 lg:ml-[1vw] items-center gap-2   font-bold font-poppins">
              <RiRefreshLine />
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
          <motion.div className="gap-4 mt-10 flex-col w-[100%]   flex justify-center items-center flex-wrap ">
            <div className=" self-start md:text-2xl md:self-start text-2xl flex justify-center md:ml-7 lg:ml-[1vw] items-center gap-2   font-bold font-poppins">
              <RiRefreshLine />
              Top upcoming
            </div>
            <div className="gap-3  w-[99%] flex justify-center items-center flex-wrap">
              <AnimatePresence>
                {data?.data?.topUpcomingAnimes?.map((anime, index) => (
                  <motion.div
                    key={anime.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      upcoming={true}
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
          <div className="   gap-8 mt-10 flex-col w-[100%]   flex justify-center items-center flex-wrap ">
            <div className="self-start md:text-2xl md:self-start text-2xl flex justify-center md:ml-7 lg:ml-[1vw] items-center gap-2   font-bold font-poppins ">
              <BsTrophyFill />
              Top 10 Anime
            </div>

            <div className=" h-12  rounded-xl font-poppins px-3 flex justify-center self-start items-center gap-3  ">
              <h3
                onClick={() => {
                  setTimePeriod("today");
                }}
                className={`${
                  timePeriod === "today"
                    ? "bg-primary text-black "
                    : " bg-transparent text-text "
                } text-sm cursor-pointer font-semibold px-3  rounded-full `}
              >
                Today
              </h3>
              <h3
                onClick={() => {
                  setTimePeriod("week");
                }}
                className={`${
                  timePeriod === "week"
                    ? "bg-primary text-black "
                    : " bg-transparent text-text  "
                } text-sm cursor-pointer font-semibold px-3 rounded-full `}
              >
                Week
              </h3>
              <h3
                onClick={() => {
                  setTimePeriod("month");
                }}
                className={`${
                  timePeriod === "month"
                    ? "bg-primary text-black "
                    : " bg-transparent text-text "
                } text-sm cursor-pointer font-semibold px-3 rounded-full `}
              >
                Month
              </h3>
            </div>

            <div className=" w-full  gap-3 flex justify-center items-center flex-wrap">
              <AnimatePresence>
                {data?.data?.top10Animes[timePeriod].map((anime, i) => {
                  return (
                    <motion.div
                      key={anime.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <AnimeCard
                        key={anime.id}
                        name={anime?.name}
                        image={anime?.poster}
                        rank={anime?.rank ? anime?.rank : i + 1}
                        id={anime?.id}
                        subCount={anime?.episodes?.sub}
                        dubCount={anime?.episodes?.dub}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {data?.data?.topAiringAnimes?.length > 0 && (
              <motion.div className="  gap-8  flex-col w-[100%]  flex justify-center items-center flex-wrap min-h-fit">
                <div className="  md:text-2xl  text-2xl flex justify-center md:ml-7 lg:ml-[1vw] items-center gap-2   font-bold font-poppins">
                  <TbBroadcast />
                  Top Airing
                </div>
                <div className="gap-3  w-[99%] flex justify-start md:justify-center items-center flex-wrap">
                  <AnimatePresence>
                    {data?.data?.topAiringAnimes?.map((anime, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <AnimeCard
                          key={anime.id}
                          hide={true}
                          name={anime?.name}
                          image={anime?.poster}
                          rank={anime?.rank ? anime?.rank : i + 1}
                          id={anime?.id}
                          subCount={anime?.episodes?.sub}
                          dubCount={anime?.episodes?.dub}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
            {data?.data?.mostPopularAnimes?.length > 0 && (
              <motion.div className=" gap-8 flex-col w-[100%] max-w-full  flex justify-center items-center flex-wrap ">
                <div className="  md:text-2xl  text-2xl flex justify-center  items-center gap-2   font-bold font-poppins">
                  <FaFire />
                  Most Popular
                </div>
                <div className="gap-3  w-[99%]  flex js lg:justify-center justify-start md:justify-center items-center flex-wrap">
                  <AnimatePresence>
                    {data?.data?.mostPopularAnimes?.map((anime, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <AnimeCard
                          key={anime.id}
                          hide={true}
                          name={anime?.name}
                          image={anime?.poster}
                          rank={anime?.rank ? anime?.rank : i + 1}
                          id={anime?.id}
                          subCount={anime?.episodes?.sub}
                          dubCount={anime?.episodes?.dub}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {data?.data?.mostFavoriteAnimes.length > 0 && (
              <motion.div className="gap-8  flex-col w-[100%] max-w-full  flex justify-center items-center flex-wrap ">
                <div className=" w-[99%] self-start  md:text-2xl  text-2xl flex justify-center  items-center gap-2   font-bold font-poppins">
                  <FaRegHeart />
                  Most Favorite
                </div>
                <div className="gap-3  w-[99%] flex justify-start md:justify-center items-center flex-wrap">
                  <AnimatePresence>
                    {data?.data?.mostFavoriteAnimes?.map((anime, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <AnimeCard
                          key={anime.id}
                          hide={true}
                          name={anime?.name}
                          image={anime?.poster}
                          rank={anime?.rank ? anime?.rank : i + 1}
                          id={anime?.id}
                          subCount={anime?.episodes?.sub}
                          dubCount={anime?.episodes?.dub}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
            {data?.data?.mostFavoriteAnimes?.length > 0 && (
              <motion.div className="gap-8 flex-col  w-[100%]   flex justify-center items-center flex-wrap ">
                <div className=" w-[99%] md:text-2xl  text-2xl flex justify-center items-center gap-2   font-bold font-poppins">
                  <FiCheckCircle className="  " />
                  <span className="  ">Latest Completed</span>
                </div>
                <div className="gap-3  w-[99%] flex justify-start md:justify-center items-center flex-wrap">
                  <AnimatePresence>
                    {data?.data?.latestCompletedAnimes?.map((anime, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <AnimeCard
                          key={anime.id}
                          hide={true}
                          name={anime?.name}
                          image={anime?.poster}
                          rank={anime?.rank ? anime?.rank : i + 1}
                          id={anime?.id}
                          subCount={anime?.episodes?.sub}
                          dubCount={anime?.episodes?.dub}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Home;
