import { motion } from "framer-motion";
import { useState } from "react";
import { BsCcCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoCalendarClear } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { PiMicrophoneFill } from "react-icons/pi";
import { TbClockHour4Filled } from "react-icons/tb";

const Card = () => {
  const [hovered, setHovered] = useState(false);

  const cardVariants = {
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const infoVariants = {
    initial: {
      y: 300,
      opacity: 0,
    },
    hover: {
      y: -280,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden bg-purple-900 w-64 rounded-xl h-[350px]"
    >
      <motion.img
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
        src="https://cdn.noitatnemucod.net/thumbnail/300x400/100/9b25eb117ecc8cf228d361540c7cfd67.jpg"
        alt=""
        className="inset-0 rounded-xl"
      />

      <motion.div
        variants={infoVariants}
        initial="initial"
        animate={hovered ? "hover" : "initial"}
        className="overflow-hidden absolute h-full rounded-xl left-0 -bottom-45 flex justify-center items-center w-full bg-gray-800/90 backdrop-blur-sm"
      >
        <motion.div
          variants={textVariants}
          className="p-4 mb-16 text-white flex flex-col gap-2 w-full h-[80%]"
        >
          <motion.div variants={textVariants} className="flex gap-1 flex-col">
            <h3 className="text-lg font-poppins font-bold">Jujutsu Kaisen</h3>
            <p className="text-sm">
              This anime is about a high school student who gains the power to
              control cursed spirits.
            </p>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="flex justify-center self-start py-2 gap-1 items-center"
          >
            <div className="badge  badge-sm bg-primary text-xs font-bold border-none ">
              HD
            </div>
            <div className="badge badge-sm  flex justify-center items-center bg-[#B0E3AF] text-black gap-1 dm border-none">
              <BsCcCircleFill className="text-xs " />
              <span className="text-xs ">112</span>
            </div>
            <div className="badge badge-sm  flex justify-center items-center bg-blue-400 text-black gap-1 dm border-none">
              <PiMicrophoneFill className="text-xs " />
              <span className="text-xs ">456</span>
            </div>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="flex self-start justify-center items-center gap-2 md:gap-4 text-sm md:text-base"
          >
            <div className="flex justify-center items-center gap-1 md:gap-2">
              <IoCalendarClear size={15} className="" />
              <span className="text-gray-300 text-xs">Aug 6, 2024</span>
            </div>
            <div className="flex justify-center items-center gap-1 md:gap-2">
              <TbClockHour4Filled size={15} className="" />
              <span className="text-xs">24M</span>
            </div>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="text-xs self-start flex justify-center items-center gap-2 text-gray-300"
          >
            <MdCategory size={15} />
            <span>Romance, sports</span>
          </motion.div>

          <motion.div
            variants={textVariants}
            className="flex mt-1 gap-2 justify-center justify-items-stretch"
          >
            <motion.button
              variants={buttonVariants}
              whileTap="tap"
              className="btn h-10 w-44 btn-primary btn-sm rounded-full"
            >
              <FaPlay className="text-xs" />
              Watch Now
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileTap="tap"
              className="p-3 hover:bg-slate-300/80 ease-in-out duration-100 rounded-full bg-slate-300 flex justify-center items-center"
            >
              <FiPlus className="text-black" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Card;
