import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaPlay } from "react-icons/fa";

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
  const [currentSpotlight, setCurrentSpotlight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpotlight((prev) => (prev + 1) % animeSpotlights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ml-[250px] flex items-center justify-center flex-col home min-h-screen bg-background  pt-2 p-12">
      <motion.div
        className="w-full max-w-7xl flex justify-between items-center bg-black h-[600px] rounded-3xl relative overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Text Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 text-white">
          <motion.h1
            className="text-6xl mb-4 font-poppins"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="font-light">Discover</span>{" "}
            <span className="font-semibold bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
              {animeSpotlights[currentSpotlight].title}
            </span>
          </motion.h1>
          <motion.p
            className="text-[15px] font-poppins mb-6 max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {animeSpotlights[currentSpotlight].description}
          </motion.p>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button className="bg-gradient-to-r from-primary to-purple-800  text-white px-8 py-4 rounded-full flex items-center hover:from-primary hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              <FaPlay className="mr-2" /> Watch Now
            </button>
            <button className="bg-border text-white px-8 py-4 rounded-full flex items-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              <FaInfoCircle className="mr-2" /> More Info
            </button>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          className="absolute inset-0 z-10"
          key={currentSpotlight}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img
            className="h-full w-full object-cover"
            src={animeSpotlights[currentSpotlight].image}
            alt="anime-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
