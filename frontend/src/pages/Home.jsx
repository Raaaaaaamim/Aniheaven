import { AnimatePresence, motion } from "framer-motion";
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
import Card from "../components/ui/Card.jsx";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const spotlightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.6,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="lg:w-[100%] flex items-center flex-col min-h-[100vh] colors.gray.950 p-3 lg:p-12"
    >
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-primary hover:!bg-purple-500 !w-[6px] !h-[6px]"></span>`;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full xl:h-[80vh] max-w-8xl md:h-[400px] lg:mx-auto h-[300px] lg:h-[600px] rounded-3xl overflow-hidden"
      >
        {animeSpotlights.map((anime) => (
          <SwiperSlide key={anime.id}>
            <motion.div
              variants={spotlightVariants}
              className="relative w-full h-full bg-black rounded-3xl overflow-hidden"
            >
              {/* Background Image with Enhanced Gradient */}
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
                  src={anime.image}
                  alt={anime.title}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-8 lg:px-12 text-white"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 className="lg:text-7xl text-3xl md:text-5xl mb-4 font-poppins">
                  <span className="font-light">Discover</span>{" "}
                  <span className="font-bold font-poppins bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    {anime.title}
                  </span>
                </motion.h1>

                <motion.div className="flex justify-center self-start py-2 md:py-4 gap-1 md:gap-2 items-center">
                  <div className="badge badge-sm md:badge-md bg-primary text-back border-none dm">
                    HD
                  </div>
                  <div className="badge badge-sm md:badge-md flex justify-center items-center bg-[#B0E3AF] text-black gap-1 dm border-none">
                    <BsCcCircleFill className="text-xs md:text-sm" />
                    <span className="text-xs md:text-sm">112</span>
                  </div>
                  <div className="badge badge-sm md:badge-md flex justify-center items-center bg-blue-400 text-black gap-1 dm border-none">
                    <PiMicrophoneFill className="text-xs md:text-sm" />
                    <span className="text-xs md:text-sm">456</span>
                  </div>
                </motion.div>

                <motion.div className="flex mb-2 md:mb-3 self-start justify-center items-center gap-2 md:gap-4 text-sm md:text-base">
                  <div className="flex justify-center items-center gap-1 md:gap-2">
                    <IoCalendarClear className="text-sm md:text-base" />
                    <span className="text-gray-300 text-xs md:text-base">
                      Aug 6, 2024
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-1 md:gap-2">
                    <TbClockHour4Filled className="text-sm md:text-base" />
                    <span className="text-gray-300 text-xs md:text-base">
                      24M
                    </span>
                  </div>
                </motion.div>

                <motion.p className="lg:text-md text-xs md:text-sm font-poppins mb-8 max-w-md text-gray-300">
                  {anime.description}
                </motion.p>

                <motion.div className="flex gap-4" whileHover={{ scale: 1.02 }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-primary to-purple-800 lg:px-8 lg:py-4 rounded-full flex items-center gap-2 hover:from-primary hover:to-purple-700 transition-all font-poppins duration-300 lg:text-sm justify-center md:py-3 text-xs px-4 md:px-5"
                  >
                    <FaPlay />
                    <span className="hidden md:flex">Watch Now</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900/80 lg:py-4 font-poppins lg:px-8 py-4 rounded-full flex items-center gap-2 hover:bg-gray-900/90 transition-all px-4 text-xs lg:text-sm md:py-3 md:px-5 ease-in duration-200"
                  >
                    <FaInfoCircle />
                    <span className="hidden md:flex">More Info</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        variants={cardContainerVariants}
        className="gap-4 mt-4 w-[106%] flex justify-center items-center flex-wrap min-h-[60vh]"
      >
        <AnimatePresence>
          {[1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Home;
