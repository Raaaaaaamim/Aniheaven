/// import swiper and all necessary packages

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { api } from "./Home.jsx";
const Schedules = () => {
  const [selectedDate, setSelectedDate] = useQueryState("date", {
    defaultValue: new Date().toISOString().split("T")[0],
    parse: (value) => value || new Date().toISOString().split("T")[0],
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDays = Array(30).fill(0);

  const formatDateToISO = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDateInfo = (dayOffset) => {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    // Ensure we're working with the start of the day in local timezone
    date.setHours(0, 0, 0, 0);
    return {
      dayName: daysOfWeek[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      fullDate: formatDateToISO(date),
    };
  };

  const formatTimeLeft = (secondsUntilAiring) => {
    if (!secondsUntilAiring) return "N/A";

    const isNegative = secondsUntilAiring < 0;
    const absSeconds = Math.abs(secondsUntilAiring);

    const days = Math.floor(absSeconds / (3600 * 24));
    const hours = Math.floor((absSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);

    let timeString = "";
    if (days > 0) {
      timeString = `${days}d ${hours}h`;
    } else if (hours > 0) {
      timeString = `${hours}h ${minutes}m`;
    } else {
      timeString = `${minutes}m`;
    }

    return isNegative ? `Aired ${timeString} ago` : `Airing in ${timeString}`;
  };

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["schedule", selectedDate],
    queryFn: async () => {
      return await axios.get(`${api}/hianime/schedule?date=${selectedDate}`);
    },
    enabled: false,
    cacheTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [selectedDate, refetch]);

  return (
    <div className="w-full min-h-screen bg-background/95">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full  mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <h1 className="text-2xl md:text-3xl font-outfit font-bold bg-linear-to-r from-text/90 to-text/60 bg-clip-text text-transparent">
            Airing Schedule
          </h1>
          <div className="flex-1 h-[1px] bg-linear-to-r from-primary/20 to-transparent"></div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300 flex items-center justify-center date-prev">
              <IoIosArrowRoundBack className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300 flex items-center justify-center date-next">
              <IoIosArrowRoundForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Date Slider */}
        <div className="relative mb-12">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView="auto"
            className="w-full"
            navigation={{
              prevEl: ".date-prev",
              nextEl: ".date-next",
            }}
          >
            {thirtyDays.map((_, i) => {
              const { dayName, date, month, fullDate } = getDateInfo(i);
              return (
                <SwiperSlide key={i} className="w-auto!">
                  <div
                    onClick={() => setSelectedDate(fullDate)}
                    className={`relative  cursor-pointer group w-24 h-32 flex flex-col  active:cursor-grabbing justify-center items-center rounded-2xl 
                      bg-white/[0.02] border border-white/[0.05] hover:border-primary/50 transition-all duration-300 overflow-hidden
                      ${
                        selectedDate === fullDate
                          ? "bg-linear-to-br from-primary/20 via-transparent to-transparent border-primary/30"
                          : ""
                      }`}
                  >
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-linear-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative flex flex-col items-center gap-2">
                      <div className="text-sm font-outfit text-text/50 group-hover:text-primary/70 transition-colors duration-300">
                        {dayName}
                      </div>
                      <div className="text-2xl font-outfit font-bold bg-linear-to-r from-text/90 to-text/70 group-hover:from-primary group-hover:to-primary/70 bg-clip-text text-transparent transition-all duration-300">
                        {date}
                      </div>
                      <div className="text-sm font-outfit text-text/30 group-hover:text-primary/50 transition-colors duration-300">
                        {month}
                      </div>
                    </div>

                    {/* Active indicator dot */}
                    <div
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 
                      ${
                        selectedDate === fullDate
                          ? "bg-primary scale-100"
                          : "bg-text/30 scale-0 group-hover:scale-100"
                      }`}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Schedule Content */}
        <div className="relative">
          <div className="mb-6 flex items-center space-x-4">
            <h2 className="text-xl font-outfit font-bold bg-linear-to-r from-text/90 to-text/60 bg-clip-text text-transparent">
              {selectedDate && `Schedule for ${selectedDate}`}
            </h2>
            <div className="flex-1 h-[1px] bg-linear-to-r from-primary/20 to-transparent"></div>
          </div>

          {isLoading ? (
            <div className="w-full flex justify-center items-center py-12">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          ) : isError ? (
            <div className="w-full text-center py-12 text-text/70">
              Failed to load schedule
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.data?.data?.scheduledAnimes &&
                data?.data?.data?.scheduledAnimes.length === 0 && (
                  <div className="w-full text-center py-12 text-text/70">
                    No scheduled animes
                  </div>
                )}
              {data?.data?.data?.scheduledAnimes.map((anime, index) => {
                const localDate = new Date(anime.airingTimestamp);
                const timeString = localDate.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
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
                    <div
                      key={anime.id}
                      className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-primary/50 transition-all duration-300"
                    >
                      {/* Time indicator */}
                      <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-background/80 backdrop-blur-xs border border-white/[0.05] text-sm font-outfit text-text/90">
                        {timeString}
                      </div>

                      <div className="p-5">
                        <div className="space-y-3">
                          <h3 className="text-lg w-[73%] font-semibold font-outfit text-text/90 line-clamp-2">
                            {anime.name}
                          </h3>
                          <p className="text-sm font-outfit text-text/50 line-clamp-1">
                            {anime.jname}
                          </p>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                              <span className="text-sm font-outfit text-text/70">
                                {formatTimeLeft(anime.secondsUntilAiring)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedules;
