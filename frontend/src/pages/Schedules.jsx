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
import MagicLoader from "../components/ui/MagicLoader.jsx";
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
      return await axios.get(`/hianime/schedule?date=${selectedDate}`);
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
    <div className="bg-background/95 min-h-screen w-full">
      {/* Decorative Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-1/2 -right-1/2 h-full w-full rounded-full blur-3xl"></div>
        <div className="bg-primary/3 absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <h1 className="font-outfit from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            Airing Schedule
          </h1>
          <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          <div className="flex items-center gap-2">
            <button className="text-text/90 date-prev flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04]">
              <IoIosArrowRoundBack className="h-5 w-5" />
            </button>
            <button className="text-text/90 date-next flex h-8 w-8 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04]">
              <IoIosArrowRoundForward className="h-5 w-5" />
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
                    className={`group hover:border-primary/50 relative flex h-32 w-24 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300 active:cursor-grabbing ${
                      selectedDate === fullDate
                        ? "from-primary/20 border-primary/30 bg-linear-to-br via-transparent to-transparent"
                        : ""
                    }`}
                  >
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-linear-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Content */}
                    <div className="relative flex flex-col items-center gap-2">
                      <div className="font-outfit text-text/50 group-hover:text-primary/70 text-sm transition-colors duration-300">
                        {dayName}
                      </div>
                      <div className="font-outfit from-text/90 to-text/70 group-hover:from-primary group-hover:to-primary/70 bg-linear-to-r bg-clip-text text-2xl font-bold text-transparent transition-all duration-300">
                        {date}
                      </div>
                      <div className="font-outfit text-text/30 group-hover:text-primary/50 text-sm transition-colors duration-300">
                        {month}
                      </div>
                    </div>

                    {/* Active indicator dot */}
                    <div
                      className={`absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all duration-300 ${
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
            <h2 className="font-outfit from-text/90 to-text/60 bg-linear-to-r bg-clip-text text-xl font-bold text-transparent">
              {selectedDate && `Schedule for ${selectedDate}`}
            </h2>
            <div className="from-primary/20 h-[1px] flex-1 bg-linear-to-r to-transparent"></div>
          </div>

          {isLoading ? (
            <div className="flex w-full items-center justify-center py-12">
              <MagicLoader />
            </div>
          ) : isError ? (
            <div className="text-text/70 w-full py-12 text-center">
              Failed to load schedule
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data?.data?.data?.scheduledAnimes &&
                data?.data?.data?.scheduledAnimes.length === 0 && (
                  <div className="text-text/70 w-full py-12 text-center">
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
                      className="group hover:border-primary/50 relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] transition-all duration-300"
                    >
                      {/* Time indicator */}
                      <div className="bg-background/80 font-outfit text-text/90 absolute top-3 right-3 rounded-xl border border-white/[0.05] px-3 py-1.5 text-sm backdrop-blur-xs">
                        {timeString}
                      </div>

                      <div className="p-5">
                        <div className="space-y-3">
                          <h3 className="font-outfit text-text/90 line-clamp-2 w-[73%] text-lg font-semibold">
                            {anime.name}
                          </h3>
                          <p className="font-outfit text-text/50 line-clamp-1 text-sm">
                            {anime.jname}
                          </p>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                              <span className="font-outfit text-text/70 text-sm">
                                {formatTimeLeft(anime.secondsUntilAiring)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover effect overlay */}
                      <div className="from-primary/10 absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
