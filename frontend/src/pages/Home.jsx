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
      className="lg:w-[100%] flex w-full items-center flex-col min-h-[100vh]  p-4 justify-center"
    >
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
        className="w-full max-w-8xl md:h-[400px] lg:mx-auto h-[300px] lg:h-[80vh] max-h-[600px] rounded-xl overflow-hidden border border-white/[0.05] "
      >
        {/* Mapping spotlight anime data to slides */}
        {data?.data?.spotlightAnimes?.map((anime, i) => (
          <SwiperSlide key={anime.id + i}>
            <motion.div
              variants={spotlightVariants}
              className="relative w-full h-full bg-[#0f0f0f] rounded-xl overflow-hidden"
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
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
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
                  <span className="font-bold line-clamp-1 lg:line-clamp-2 text-text/90">
                    {anime.name}
                  </span>
                </motion.h1>

                {/* Episode badges */}
                <motion.div className="flex justify-start py-2 md:py-4 gap-1 md:gap-2 items-center">
                  <div className="text-xs font-outfit font-medium px-3 py-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300">
                    {anime.otherInfo[3] || "N/A"}
                  </div>
                  {/* Sub episodes badge */}
                  {anime?.episodes?.sub && (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300">
                      <BsCcCircleFill className="text-xs text-primary/90" />
                      <span className="text-xs font-outfit">
                        {anime.episodes.sub}
                      </span>
                    </div>
                  )}
                  {/* Dub episodes badge */}
                  {anime?.episodes?.dub && (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300">
                      <PiMicrophoneFill className="text-xs text-primary/90" />
                      <span className="text-xs font-outfit">
                        {anime.episodes.dub}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Anime metadata (release date and duration) */}
                <motion.div className="flex mb-2 md:mb-3 self-start justify-start items-center gap-2 md:gap-4 text-xs text-text/70">
                  <div className="flex justify-center items-center gap-1 md:gap-2">
                    <IoCalendarClear size={14} className="text-primary/90" />
                    <span className="text-xs font-outfit">
                      {anime.otherInfo[2] || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-1 md:gap-2">
                    <TbClockHour4Filled size={14} className="text-primary/90" />
                    <span className="text-xs font-outfit">
                      {anime.otherInfo[1] || "N/A"}
                    </span>
                  </div>
                </motion.div>

                {/* Description with length limit */}
                <motion.p className="lg:text-md text-xs md:text-sm font-poppins md:mb-8 mb-3 max-w-md line-clamp-3 text-text/70">
                  {anime.description}
                </motion.p>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <Link to={`/watch/${anime.id}`}>
                    <button className="md:w-48 w-32 py-3 px-6 rounded-xl bg-gradient-to-r from-primary via-primary to-primary/90 text-black text-sm font-outfit font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300  flex items-center justify-center gap-2">
                      <FaPlay className="text-sm md:flex hidden " />
                      <span>Watch Now</span>
                    </button>
                  </Link>
                  <Link to={`/info/${anime.id}`}>
                    <button className="w-12 h-12 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] hover:scale-[1.02] active:scale-[0.98] text-text/90 border border-white/[0.05] transition-all duration-300 flex items-center justify-center">
                      <FaInfoCircle className="w-6 h-6" />
                    </button>
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
      <motion.div className="w-full max-w-8xl lg:mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-outfit font-semibold text-text/90">
            Trending Now
          </h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300  flex items-center justify-center trending-prev">
              <IoIosArrowRoundBack className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300 flex items-center justify-center trending-next">
              <IoIosArrowRoundForward className="w-5 h-5" />
            </button>
          </div>
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
      </motion.div>

      <div className="w-full max-w-8xl lg:mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-outfit font-semibold text-text/90">
            Latest Episodes
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {data?.data?.latestEpisodeAnimes?.map((anime, index) => (
              <Suspense key={anime.id + index} fallback={<HomeSuspense />}>
                <Card
                  imageUrl={anime.poster}
                  title={anime.name}
                  rank={anime.rank}
                  id={anime.id}
                  subCount={anime.episodes.sub}
                  dubCount={anime.episodes.dub}
                />
              </Suspense>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full max-w-8xl lg:mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-outfit font-semibold text-text/90">
            Top Upcoming
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {data?.data?.topUpcomingAnimes?.map((anime, index) => (
              <Suspense key={anime.id + index} fallback={<HomeSuspense />}>
                <Card
                  upcoming={true}
                  imageUrl={anime.poster}
                  title={anime.name}
                  rank={anime.rank}
                  id={anime.id}
                  subCount={anime.episodes.sub}
                  dubCount={anime.episodes.dub}
                />
              </Suspense>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full max-w-8xl lg:mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <BsTrophyFill className="text-primary/90" />
            <h2 className="text-lg md:text-xl font-outfit font-semibold text-text/90">
              Top 10 Anime
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.02] rounded-xl border border-white/[0.05] p-1">
            <button
              onClick={() => setTimePeriod("today")}
              className={`px-3 py-1 rounded-lg text-xs font-outfit transition-all duration-300 ${
                timePeriod === "today"
                  ? "bg-white/[0.04] text-text/90"
                  : "text-text/70 hover:text-text/90"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimePeriod("week")}
              className={`px-3 py-1 rounded-lg text-xs font-outfit transition-all duration-300 ${
                timePeriod === "week"
                  ? "bg-white/[0.04] text-text/90"
                  : "text-text/70 hover:text-text/90"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimePeriod("month")}
              className={`px-3 py-1 rounded-lg text-xs font-outfit transition-all duration-300 ${
                timePeriod === "month"
                  ? "bg-white/[0.04] text-text/90"
                  : "text-text/70 hover:text-text/90"
              }`}
            >
              This Month
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {data?.data?.top10Animes[timePeriod]?.map((anime, index) => (
              <Suspense key={anime.id + index} fallback={<HomeSuspense />}>
                <AnimeCard
                  name={anime?.name}
                  image={anime?.poster}
                  rank={anime?.rank ? anime?.rank : index + 1}
                  id={anime?.id}
                  subCount={anime?.episodes?.sub}
                  dubCount={anime?.episodes?.dub}
                />
              </Suspense>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {data?.data?.topAiringAnimes?.length > 0 && (
        <div className="w-full max-w-8xl lg:mx-auto mt-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-outfit font-semibold text-text/90">
              Top Airing
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {data?.data?.topAiringAnimes?.map((anime, index) => (
                <Suspense key={anime.id + index} fallback={<HomeSuspense />}>
                  <AnimeCard
                    hide={true}
                    name={anime?.name}
                    image={anime?.poster}
                    rank={anime?.rank ? anime?.rank : index + 1}
                    id={anime?.id}
                    subCount={anime?.episodes?.sub}
                    dubCount={anime?.episodes?.dub}
                  />
                </Suspense>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Home;
