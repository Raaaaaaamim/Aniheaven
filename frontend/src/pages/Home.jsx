/**
 * Home Component - Main landing page of the anime streaming application
 *
 * This component serves as the primary landing page, featuring multiple sections:
 * - Spotlight carousel for featured anime
 * - Trending anime section with responsive slider
 * - Latest episodes grid
 * - Top upcoming anime showcase
 * - Top 10 anime with time period filtering
 * - Top currently airing anime
 *
 * The component uses React Query for data fetching, Framer Motion for animations,
 * and Swiper for carousel/slider functionality.
 *
 * @component
 * @requires framer-motion
 * @requires swiper
 * @requires @tanstack/react-query
 */

// Animation and Icon imports
import { AnimatePresence, motion } from "framer-motion";
import { BsCcCircleFill, BsTrophyFill } from "react-icons/bs";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { IoCalendarClear } from "react-icons/io5";
import { PiMicrophoneFill } from "react-icons/pi";
import { TbClockHour4Filled } from "react-icons/tb";

// Core functionality imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";

// Swiper related imports
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Utility and component imports
import { containerVariants, spotlightVariants } from "../animations.jsx";
import Card from "../components/ui/Card";
import HomeSuspense from "../components/ui/HomeSuspense";

// Lazy loaded components
const TrendingCard = lazy(() => import("../components/ui/TrendingCard"));
const AnimeCard = lazy(() => import("../components/ui/AnimeCard"));

/** Base API endpoint for all anime-related requests */
export const api = "http://localhost:4000/api/v2";

const Home = () => {
  /**
   * Fetches all required data for the home page using React Query
   * Includes data for spotlight, trending, latest episodes, and various top anime lists
   * Uses a 3-minute stale time for caching optimization
   */
  const {
    data: animeData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      return await axios.get(`${api}/hianime/home`);
    },
    staleTime: 1000 * 60 * 3, // 3 minutes cache
  });

  const data = animeData?.data;

  /** State for managing the time period filter in Top 10 section */
  const [timePeriod, setTimePeriod] = useState("today");

  // If data is loading, show skeleton
  if (isLoading) {
    return <HomeSuspense />;
  }

  // If there's an error, show error message
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        <p>Error loading data: {error.message}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="lg:w-[100%] flex w-full max-w-[1200px] items-center flex-col min-h-[100vh] colors.gray.950 p-4 justify-center"
    >
      {/* Spotlight Section - Featured Anime Carousel
       * Auto-playing carousel with fade effect and custom pagination
       * Displays anime details including title, episodes, and description
       */}
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
        className="w-full  max-w-8xl md:h-[400px] lg:mx-auto h-[300px] lg:h-[80vh]   max-h-[600px] rounded-2xl overflow-hidden custom-swiper"
      >
        {/* Mapping spotlight anime data to slides */}
        {data?.data?.spotlightAnimes?.map((anime, i) => (
          <SwiperSlide key={anime.id + i}>
            <motion.div
              variants={spotlightVariants}
              className="relative w-full h-full bg-black rounded-2xl overflow-hidden"
            >
              {/* Background image with zoom animation */}
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
                <div className="absolute  inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                <img
                  className="h-full w-full object-cover"
                  src={anime.poster}
                  alt={anime.name}
                />
              </motion.div>

              {/* Anime information overlay */}
              <motion.div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-8 lg:px-12 text-text">
                {/* Title */}
                <motion.h1 className="lg:text-6xl text-2xl flex flex-wrap md:text-5xl gap-3 lg:mb-4 font-outfit">
                  <span className="font-bold line-clamp-2 text-text/90">
                    {anime.name}
                  </span>
                </motion.h1>

                {/* Episode badges */}
                <motion.div className="flex justify-center self-start py-2 md:py-4 gap-1 md:gap-2 items-center">
                  <div className="badge badge-sm md:badge-md bg-primary text-black border-none dm">
                    {anime.otherInfo[3] || "N/A"}
                  </div>
                  {/* Sub episodes badge */}
                  {anime?.episodes?.sub && (
                    <div className="badge badge-sm md:badge-md flex justify-center items-center bg-[#B0E3AF] text-black gap-1 dm border-none">
                      <BsCcCircleFill className="text-xs md:text-sm" />
                      <span className="text-xs md:text-sm">
                        {anime.episodes.sub}
                      </span>
                    </div>
                  )}
                  {/* Dub episodes badge */}
                  {anime?.episodes?.dub && (
                    <div className="badge badge-sm md:badge-md flex justify-center items-center bg-blue-400 text-black gap-1 dm border-none">
                      <PiMicrophoneFill className="text-xs md:text-sm" />
                      <span className="text-xs md:text-sm">
                        {anime.episodes.dub}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Anime metadata (release date and duration) */}
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

                {/* Description with length limit */}
                <motion.p className="lg:text-md text-xs md:text-sm font-inter md:mb-8 mb-3 max-w-md line-clamp-3 text-gray-300">
                  {anime.description}
                </motion.p>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <Link
                    to={`/watch/${anime?.id}`}
                    state={{ poster: anime.poster }}
                    className="hover:bg-transparent lg:px-8 lg:py-4 rounded-full flex items-center gap-2 ease-in-out font-poppins lg:text-sm hover:text-gray-200 backdrop-blur-md border-[1px] duration-200 border-white justify-center bg-white text-black md:py-3 text-xs px-4 py-1 md:px-5"
                  >
                    <FaPlay className="lg:text-sm text-[11px]" />
                    <span className="text-xs md:text-sm font-dmsans font-bold md:flex">
                      Watch Now
                    </span>
                  </Link>

                  <Link
                    to={`/info/${anime?.id}`}
                    className="bg-transparent hover:scale-105 lg:py-4 font-poppins py-4 rounded-full flex items-center gap-2 hover:bg-white hover:text-black transition-all text-white px-4 text-xs lg:text-sm md:py-3 md:px-5 backdrop-blur-sm border-[1px] border-white ease-in duration-100"
                  >
                    <FaInfoCircle className="text-md" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Trending Anime Section
       * Features a responsive slider with custom navigation
       * Auto-plays with pause on hover functionality
       */}
      <div className="mt-5 lg:ml-3 w-full">
        <div className="flex w-full justify-start my-4 items-center gap-2">
          <h1 className="rounded-sm text-2xl border-l-4 px-3 border-primary font-bold font-poppins">
            Trending
          </h1>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 5 },
            1280: { slidesPerView: 5, spaceBetween: 10 },
          }}
          className="relative rounded-xl overflow-hidden"
        >
          {/* Trending anime cards */}
          {data?.data?.trendingAnimes?.slice(0, 10).map((anime, index) => (
            <SwiperSlide key={anime.id + index}>
              <Suspense
                fallback={
                  <div className="relative border-border border-[1px] font-poppins w-full h-[280px] md:w-[220px] md:h-[300px] lg:w-[190px] lg:h-[270px] xl:w-[200px] xl:h-[280px] rounded-xl overflow-hidden bg-[#1f1f1f] animate-pulse">
                    <div className="absolute top-0 right-0 z-10 bg-[#2a2a2a] h-11 w-9 rounded-bl-xl" />
                  </div>
                }
              >
                <>
                  <TrendingCard
                    rank={index + 1}
                    title={anime.name}
                    image={anime.poster}
                    id={anime.id}
                  />
                </>
              </Suspense>
            </SwiperSlide>
          ))}
          {/* Custom navigation buttons */}
          <div className="swiper-button-prev after:!content-[''] !w-8 !h-8 flex text-white bg-primary rounded-full justify-center items-center">
            <IoIosArrowRoundBack className="text-sm text-white " />
          </div>
          <div className="swiper-button-next after:!content-[''] !w-8 !h-8 flex text-white bg-primary mr-2 rounded-full justify-center items-center">
            <IoIosArrowRoundForward className="text-sm text-white" />
          </div>
        </Swiper>
      </div>

      {/* Latest Episodes Section
       * Grid layout with animated card entries
       * Shows recently updated anime episodes
       */}
      <div className="gap-[16px] mt-[40px] flex-col w-full flex justify-center items-center flex-wrap min-h-[10vh]">
        <div className="max-w-[67rem] flex flex-col gap-8">
          <div className="self-start md:text-2xl text-2xl flex justify-start border-l-4 px-3 border-primary ml-2 items-center gap-2 font-bold font-poppins">
            Latest Episode Anime
          </div>
          <div className="gap-3 w-full flex justify-center items-center flex-wrap">
            <AnimatePresence>
              {data?.data?.latestEpisodeAnimes?.map((anime, index) => (
                <motion.div
                  key={anime.id + index}
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
        </div>
      </div>

      {/* Top Upcoming Section
       * Displays upcoming anime releases
       * Features animated card entries with staggered animation
       */}
      <div className="gap-4 mt-10 flex-col w-[100%] flex justify-center items-center flex-wrap">
        <div className="max-w-[67rem] flex flex-col gap-8">
          <div className="self-start md:text-2xl text-2xl flex justify-start border-l-4 px-3 border-primary ml-1 items-center gap-2 font-bold font-poppins">
            Top Upcoming
          </div>
          <div className="gap-3 w-[99%] flex justify-center items-center flex-wrap">
            <AnimatePresence>
              {data?.data?.topUpcomingAnimes?.map((anime, index) => (
                <motion.div
                  key={anime.id + index}
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
        </div>
      </div>

      {/* Top 10 Anime Section
       * Interactive time period filter (Today/Week/Month)
       * Animated card layout with ranking display
       */}
      <div className="gap-8 mt-10 flex-col w-[100%] flex justify-center items-center flex-wrap">
        <div className="self-start md:text-2xl md:self-start text-2xl flex justify-center md:ml-7 lg:ml-[1vw] items-center gap-2 font-bold font-poppins">
          <BsTrophyFill />
          Top 10 Anime
        </div>

        {/* Time period filter buttons */}
        <div className="h-12 rounded-xl font-poppins px-3 flex justify-center self-start items-center gap-3">
          <h3
            onClick={() => setTimePeriod("today")}
            className={`${
              timePeriod === "today"
                ? "bg-primary text-black"
                : "bg-transparent text-text"
            } text-sm cursor-pointer font-semibold px-3 rounded-full`}
          >
            Today
          </h3>
          <h3
            onClick={() => setTimePeriod("week")}
            className={`${
              timePeriod === "week"
                ? "bg-primary text-black"
                : "bg-transparent text-text"
            } text-sm cursor-pointer font-semibold px-3 rounded-full`}
          >
            Week
          </h3>
          <h3
            onClick={() => setTimePeriod("month")}
            className={`${
              timePeriod === "month"
                ? "bg-primary text-black"
                : "bg-transparent text-text"
            } text-sm cursor-pointer font-semibold px-3 rounded-full`}
          >
            Month
          </h3>
        </div>

        {/* Top 10 anime grid */}
        <div className="w-full gap-3 flex justify-center items-center flex-wrap">
          {data?.data?.top10Animes[timePeriod].map((anime, i) => (
            <motion.div
              key={anime.id + i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.1, delay: i * 0.01 }}
            >
              <Suspense
                fallback={
                  <div className="relative hover:scale-[1.05] ease-in-out duration-200 group rounded-xl h-[280px] w-[180px] md:w-[200px] overflow-hidden bg-[#1f1f1f] animate-pulse">
                    <div className="absolute top-0 right-0 z-10 bg-[#2a2a2a] h-11 w-9 rounded-bl-xl" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2a2a2a] to-transparent" />
                  </div>
                }
              >
                <AnimeCard
                  key={anime.id + i}
                  name={anime?.name}
                  image={anime?.poster}
                  rank={anime?.rank ? anime?.rank : i + 1}
                  id={anime?.id}
                  subCount={anime?.episodes?.sub}
                  dubCount={anime?.episodes?.dub}
                />
              </Suspense>
            </motion.div>
          ))}
        </div>

        {/* Top Airing Section - Conditionally rendered
         * Only shows if there are currently airing anime
         * Features animated card entries with ranking
         */}
        {data?.data?.topAiringAnimes?.length > 0 && (
          <div className="flex-col w-[100%] flex justify-center items-center min-h-fit">
            <div className="max-w-[66rem] flex flex-col gap-8">
              <div className="md:text-2xl text-2xl flex justify-center items-center gap-2 font-bold w-fit border-l-4 px-3 border-primary font-poppins">
                Top Airing
              </div>
              <div className="gap-3 w-full flex justify-center items-center flex-wrap">
                <AnimatePresence>
                  {data?.data?.topAiringAnimes?.map((anime, i) => (
                    <motion.div
                      key={anime.id + i}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Suspense
                        fallback={
                          <div className="relative hover:scale-[1.05] ease-in-out duration-200 group rounded-xl h-[280px] w-[180px] md:w-[200px] overflow-hidden bg-[#1f1f1f] animate-pulse">
                            <div className="absolute top-0 right-0 z-10 bg-[#2a2a2a] h-11 w-9 rounded-bl-xl" />
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2a2a2a] to-transparent" />
                          </div>
                        }
                      >
                        <AnimeCard
                          hide={true}
                          name={anime?.name}
                          image={anime?.poster}
                          rank={anime?.rank ? anime?.rank : i + 1}
                          id={anime?.id}
                          subCount={anime?.episodes?.sub}
                          dubCount={anime?.episodes?.dub}
                        />
                      </Suspense>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
