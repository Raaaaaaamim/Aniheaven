/// import swiper and all necessary packages

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
    <div className="w-full flex  items-center flex-col h-full ">
      <div className=" w-full mb-3 h-auto flex items-center justify-between ">
        <h1 className=" px-3 border-l-4 border-primary ml-4 w-fit text-lg md:text-xl font-outfit font-semibold text-text/90">
          Estimated Schedule
        </h1>

        <div className="flex items-center  mr-4 justify-end  gap-2">
          <button className="w-8 h-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300  flex items-center justify-center date-prev">
            <IoIosArrowRoundBack className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] transition-all duration-300 flex items-center justify-center date-next">
            <IoIosArrowRoundForward className="w-5 h-5" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView="auto"
        className="w-full px-4"
        navigation={{
          prevEl: ".date-prev",
          nextEl: ".date-next",
        }}
      >
        {thirtyDays.map((_, i) => {
          const { dayName, date, month, fullDate } = getDateInfo(i);
          return (
            <SwiperSlide key={i} className="!w-auto">
              <div
                onClick={() => setSelectedDate(fullDate)}
                className={`relative cursor-pointer group w-28 h-36 flex flex-col justify-center items-center rounded-2xl bg-[#0f0f0f] border border-white/[0.05] hover:border-primary/50 transition-all duration-300 overflow-hidden ${
                  selectedDate === fullDate
                    ? "bg-gradient-to-br from-primary/20 via-transparent to-transparent border-primary/30"
                    : ""
                }`}
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative flex flex-col items-center gap-2 p-4">
                  {/* Day name with highlight effect */}
                  <div className="text-sm font-outfit text-text/50 group-hover:text-primary/70 transition-colors duration-300">
                    {dayName}
                  </div>

                  {/* Date with larger emphasis */}
                  <div className="text-3xl font-outfit font-bold bg-gradient-to-r from-text/90 to-text/70 group-hover:from-primary group-hover:to-primary/70 bg-clip-text text-transparent transition-all duration-300">
                    {date}
                  </div>

                  {/* Month with subtle styling */}
                  <div className="text-sm font-outfit text-text/30 group-hover:text-primary/50 transition-colors duration-300">
                    {month}
                  </div>

                  {/* Active indicator dot */}
                  <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                      selectedDate === fullDate
                        ? "bg-primary scale-100"
                        : "bg-text/30 scale-0 group-hover:scale-100"
                    }`}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className=" flex flex-col mt-5 w-full justify-center items-start ">
        <h1 className=" px-3 border-l-4 border-primary ml-4 w-fit text-lg md:text-xl font-outfit font-semibold text-text/90">
          {selectedDate && ` Schedule for ${selectedDate}`}
        </h1>

        {isLoading ? (
          <div className="w-full flex justify-center items-center mt-8">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : isError ? (
          <div className="w-full text-center mt-8 text-text/70">
            Failed to load schedule
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data?.data?.data?.scheduledAnimes &&
              data?.data?.data?.scheduledAnimes.length === 0 && (
                <div className="w-full text-center mt-8 text-text/70">
                  No scheduled animes
                </div>
              )}
            {data?.data?.data?.scheduledAnimes.map((anime) => {
              // Convert timestamp to local time (timestamp is already in milliseconds)
              const localDate = new Date(anime.airingTimestamp);

              // Format time in user's local timezone
              const timeString = localDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <div
                  key={anime.id}
                  className="group relative overflow-hidden bg-secondaryBg rounded-2xl border border-white/[0.05] hover:border-primary/50 transition-all min-w-full md:min-w-72 duration-300"
                >
                  {/* Time indicator */}
                  <div className="absolute top-3 right-3 px-2 py-1.5 rounded-xl bg-background backdrop-blur-sm border border-white/[0.05] text-sm font-outfit text-text/90">
                    {timeString}
                  </div>

                  <div className="p-4">
                    {/* Content container */}
                    <div className="flex flex-col gap-2">
                      {/* Title section */}
                      <div className="space-y-1">
                        <h3 className="text-lg w-[75%] font-semibold font-outfit text-text/90 line-clamp-2">
                          {anime.name}
                        </h3>
                        <p className="text-sm font-outfit text-text/50 line-clamp-1">
                          {anime.jname}
                        </p>
                      </div>

                      {/* Countdown section */}
                      <div className="flex items-center gap-2 mt-2">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedules;
