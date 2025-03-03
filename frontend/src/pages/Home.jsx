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
import HomeSuspense from "../components/skeletons/HomeSuspense.jsx";
import Badge from "../components/ui/Badge.jsx";
import Card from "../components/ui/Card";

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
      return await axios.get(`/hianime/home`);
    },
    staleTime: 1000 * 60 * 3, // 10 minutes cache
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
      <div className="flex h-screen w-full items-center justify-center text-white">
        <p>Error loading data: {error.message}</p>
      </div>
    );
  }
  console.log(data);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-[100vh] w-full flex-col items-center justify-center p-4 lg:w-[100%] 2xl:max-w-[1920px]"
    >
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-primary/80! hover:bg-primary! w-[6px]! h-[6px]!"></span>`;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="max-w-8xl h-[300px] max-h-[700px] w-full overflow-hidden rounded-xl border border-white/[0.05] md:h-[400px] lg:mx-auto lg:min-h-[80vh] 2xl:min-h-[70vh]"
      >
        {/* Mapping spotlight anime data to slides */}
        {data?.data?.spotlightAnimes?.map((anime, i) => (
          <SwiperSlide key={anime.id + i}>
            <motion.div
              variants={spotlightVariants}
              className="relative h-full w-full overflow-hidden rounded-xl bg-[#0f0f0f]"
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
                <div className="absolute inset-0 z-10 bg-linear-to-r from-black via-black/80 to-transparent" />
                <img
                  className="h-full w-full object-cover"
                  src={anime.poster}
                  alt={anime.name}
                />
              </motion.div>

              {/* Anime information overlay */}
              <motion.div className="text-text absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-8 lg:px-12">
                {/* Title */}
                <h1 className="font-outfit flex flex-wrap gap-3 text-2xl md:text-3xl lg:mb-4 lg:text-[2.8rem] xl:text-[3rem]">
                  <span className="text-text/90 line-clamp-1 font-bold lg:line-clamp-2">
                    {anime.name}
                  </span>
                </h1>

                {/* Episode badges */}
                <div className="flex items-center justify-start gap-1 py-2 md:gap-2 md:py-4">
                  <Badge title={anime.otherInfo[3] || "N/A"} />
                  {/* Sub episodes badge */}
                  {anime?.episodes?.sub && (
                    <Badge Icon={BsCcCircleFill} title={anime.episodes.sub} />
                  )}
                  {/* Dub episodes badge */}
                  {anime?.episodes?.dub && (
                    <Badge Icon={PiMicrophoneFill} title={anime.episodes.dub} />
                  )}
                </div>

                {/* Anime metadata (release date and duration) */}
                <div className="text-text/70 mb-2 flex items-center justify-start gap-2 self-start text-xs md:mb-3 md:gap-4">
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <IoCalendarClear className="text-primary/90 text-[14px] 2xl:text-[16px]" />
                    <span className="font-sans text-xs 2xl:text-sm">
                      {anime.otherInfo[2] || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1 md:gap-2">
                    <TbClockHour4Filled className="text-primary/90 text-[14px] 2xl:text-sm 2xl:text-[16px]" />
                    <span className="font-sans text-xs 2xl:text-sm">
                      {anime.otherInfo[1] || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Description with length limit */}
                <p className="font-Jost text-text/70 mb-3 line-clamp-2 w-[80%] max-w-[38rem] text-sm leading-relaxed italic md:mb-8 md:line-clamp-3 md:w-full 2xl:line-clamp-4 2xl:max-w-3xl">
                  {anime.description}
                </p>

                {/* Action buttons */}
                <div className="flex gap-4">
                  <Link to={`/watch/${anime.id}`}>
                    <button className="from-primary via-primary to-primary/90 font-outfit flex w-32 items-center justify-center gap-2 rounded-xl bg-linear-to-r px-4 py-2 text-xs font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] md:w-48 md:px-6 md:py-3 md:text-sm">
                      <FaPlay className="hidden text-sm md:flex" />
                      <span>Watch Now</span>
                    </button>
                  </Link>
                  <Link to={`/info/${anime.id}`}>
                    <button className="text-text/90 flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04] active:scale-[0.98] md:h-12 md:w-12">
                      <FaInfoCircle className="h-3 w-3 md:h-5 md:w-5" />
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
      <motion.div className="max-w-8xl mt-8 w-full lg:mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-outfit flex w-full items-center space-x-4">
            <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
              Trending Animes
            </h1>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>
          <div className="flex items-center gap-2">
            <button className="trending-prev text-text/90 trending-prev flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04]">
              <IoIosArrowRoundBack className="h-5 w-5" />
            </button>
            <button className="trending-next text-text/90 trending-next flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04]">
              <IoIosArrowRoundForward className="h-5 w-5" />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".trending-next",
            prevEl: ".trending-prev",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 5, spaceBetween: 5 },
            1280: { slidesPerView: 5, spaceBetween: 10 },
            1536: { slidesPerView: 6, spaceBetween: 15 },
            1920: { slidesPerView: 7, spaceBetween: 20 },
          }}
          className="relative overflow-hidden rounded-xl"
        >
          {/* Trending anime cards */}
          {data?.data?.trendingAnimes?.slice(0, 10).map((anime, index) => (
            <SwiperSlide key={anime.id + index}>
              <Suspense
                fallback={
                  <div className="border-border font-poppins relative h-[280px] w-full animate-pulse overflow-hidden rounded-xl border-[1px] bg-[#1f1f1f] md:h-[300px] md:w-[220px] lg:h-[270px] lg:w-[190px] xl:h-[280px] xl:w-[200px]"></div>
                }
              >
                <TrendingCard
                  rank={index + 1}
                  title={anime.name}
                  image={anime.poster}
                  id={anime.id}
                />
              </Suspense>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <div className="max-w-8xl mt-8 w-full lg:mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-outfit flex w-full items-center space-x-4">
            <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
              Latest Episodes
            </h1>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>
        </div>
        <div className="sectionA grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 2xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {data?.data?.latestEpisodeAnimes?.map((anime, index) => (
              <Card
                key={anime.id + index}
                imageUrl={anime.poster}
                title={anime.name}
                rank={anime.rank}
                id={anime.id}
                subCount={anime.episodes.sub}
                dubCount={anime.episodes.dub}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-8xl mt-8 w-full lg:mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-outfit flex w-full items-center space-x-4">
            <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
              Top Upcoming
            </h1>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>
        </div>
        <div className="sectionA grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
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
      <div className="max-w-8xl mt-8 w-full lg:mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-outfit flex w-full items-center space-x-4">
            <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
              Latest Completed
            </h1>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>
        </div>
        <div className="sectionA grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {data?.data?.latestCompletedAnimes?.map((anime, index) => (
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
      <div className="max-w-8xl mt-8 w-full lg:mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-outfit flex w-full items-center space-x-4">
            <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
              Most Favorite
            </h1>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>
        </div>
        <div className="sectionA grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {data?.data?.mostFavoriteAnimes?.map((anime, index) => (
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
      <div className="max-w-8xl mt-8 w-full lg:mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-outfit flex w-full items-center space-x-4">
            <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
              Most Popular
            </h1>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>
        </div>
        <div className="sectionA grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {data?.data?.mostPopularAnimes?.map((anime, index) => (
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

      <div className="max-w-8xl mt-8 w-full lg:mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BsTrophyFill className="text-primary/90" />
            <h2 className="font-outfit text-text/90 text-lg font-semibold md:text-xl">
              Top 10 Anime
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.02] p-1">
            <button
              onClick={() => setTimePeriod("today")}
              className={`font-outfit rounded-lg px-3 py-1 text-xs transition-all duration-300 ${
                timePeriod === "today"
                  ? "text-text/90 bg-white/[0.04]"
                  : "text-text/70 hover:text-text/90"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimePeriod("week")}
              className={`font-outfit rounded-lg px-3 py-1 text-xs transition-all duration-300 ${
                timePeriod === "week"
                  ? "text-text/90 bg-white/[0.04]"
                  : "text-text/70 hover:text-text/90"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimePeriod("month")}
              className={`font-outfit rounded-lg px-3 py-1 text-xs transition-all duration-300 ${
                timePeriod === "month"
                  ? "text-text/90 bg-white/[0.04]"
                  : "text-text/70 hover:text-text/90"
              }`}
            >
              This Month
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 2xl:gap-6">
          <AnimatePresence mode="popLayout">
            {data?.data?.top10Animes[timePeriod]?.map((anime, index) => (
              <motion.div
                key={anime.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "backOut",
                }}
              >
                <AnimeCard
                  name={anime?.name}
                  image={anime?.poster}
                  rank={anime?.rank ? anime?.rank : index + 1}
                  id={anime?.id}
                  subCount={anime?.episodes?.sub}
                  dubCount={anime?.episodes?.dub}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {data?.data?.topAiringAnimes?.length > 0 && (
        <div className="max-w-8xl mt-8 mb-8 w-full lg:mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-outfit flex w-full items-center space-x-4">
              <h1 className="from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-lg font-bold text-transparent md:text-xl">
                Top Airing
              </h1>
              <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 2xl:gap-6">
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
