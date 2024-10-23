import { motion } from "framer-motion";
import React from "react";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
import { IoCalendarClear } from "react-icons/io5";
import { TbClockHour4Filled } from "react-icons/tb";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { BsCcCircleFill } from "react-icons/bs";
import { PiMicrophoneFill } from "react-icons/pi";

const animeSpotlights = [
  {
    id: 1,
    title: "Bleach: Thousand-Year Blood War",
    description:
      "The final arc of the epic Bleach saga unfolds in this thrilling continuation.",
    image: "https://images5.alphacoders.com/125/thumb-1920-1255445.png",
  },
  {
    id: 2,
    title: "Demon Slayer",
    description:
      "Follow Tanjiro's journey to save his sister and fight demons in feudal Japan.",
    image:
      "https://images.squarespace-cdn.com/content/v1/54fc8146e4b02a22841f4df7/1613993182428-R5SIXOIEUZ5FP6XTU9XE/Cover.png",
  },
  {
    id: 3,
    title: "Attack on Titan",
    description:
      "Humanity's last stand against giant humanoid creatures in a post-apocalyptic world.",
    image: "https://pbs.twimg.com/media/F-Fs4wqbQAAhI4r?format=jpg&name=large",
  },
];

const Home = () => {
  return (
    <div className="ml-[250px] flex items-center  flex-col min-h-screen bg-background p-12">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-primary hover:!bg-purple-500 !w-3 !h-3"></span>`;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full max-w-7xl mx-auto h-[600px] rounded-3xl overflow-hidden"
      >
        {animeSpotlights.map((anime) => (
          <SwiperSlide key={anime.id}>
            <motion.div
              className="relative w-full h-full bg-black rounded-3xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Image with Gradient */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                <img
                  className="h-full w-full object-cover"
                  src={anime.image}
                  alt={anime.title}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 text-white">
                <motion.h1
                  className="text-7xl mb-4 font-poppins"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="font-light dm ">Discover</span>{" "}
                  <span className="font-bold font-poppins bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    {anime.title}
                  </span>
                </motion.h1>
                <motion.div
                  className=" flex justify-center self-start py-4 gap-2 items-center  "
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className=" badge bg-primary  text-back border-none dm ">
                    HD
                  </div>
                  <div className=" badge flex justify-center items-center bg-[#B0E3AF] text-black gap-1 dm  border-none ">
                    <BsCcCircleFill />
                    112
                  </div>
                  <div className=" badge flex justify-center items-center bg-blue-400 text-black gap-1 dm  border-none ">
                    <PiMicrophoneFill />
                    456
                  </div>
                </motion.div>
                <motion.div
                  className="flex mb-3 self-start justify-center items-center gap-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className=" flex justify-center items-center gap-2 ">
                    <IoCalendarClear />
                    <span className="text-gray-300   ">Aug 6, 2024</span>
                  </div>
                  <div className=" flex justify-center items-center gap-2 ">
                    <TbClockHour4Filled />

                    <span className="text-gray-300">24M</span>
                  </div>
                </motion.div>
                <motion.p
                  className="text-md font-poppins mb-8 max-w-md text-gray-300"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {anime.description}
                </motion.p>

                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <button className="bg-gradient-to-r from-primary to-purple-800 px-8 py-4 rounded-full flex items-center gap-2 hover:from-primary hover:to-purple-700 transition-all font-poppins duration-300 transform hover:scale-105">
                    <FaPlay /> Watch Now
                  </button>
                  <button className="bg-border font-poppins px-8 py-4 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all duration-300">
                    <FaInfoCircle /> More Info
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
