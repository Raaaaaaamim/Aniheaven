import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useState } from "react";
import { BsCcCircleFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TbClockHour4Filled } from "react-icons/tb";
import { Link } from "react-router-dom";

const ContinueWatchingCard = ({
  imageUrl,
  title,
  episodeNumber,
  totalEpisodes,
  progress,
  timeStamp,
  animeId,
  episodeId,
  onDelete,
}) => {
  const [hovered, setHovered] = useState(false);

  const formatTime = (timestamp) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="group relative h-[280px] w-[180px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] shadow-lg transition-all duration-300 sm:h-[340px] sm:w-[240px] md:h-[38vw] md:w-[28vw] lg:h-[340px] lg:w-[230px] xl:h-[370px] xl:w-64 2xl:h-[24rem] 2xl:w-[16rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glass Effect Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 backdrop-blur-[2px]" />

      {/* Progress Bar at Top */}
      <div className="absolute top-0 left-0 z-30 h-1.5 w-full overflow-hidden bg-white/10">
        <motion.div
          initial={{ width: 0, x: -100 }}
          animate={{ width: `${progress}%`, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="from-primary via-primary/90 to-primary/80 h-full bg-gradient-to-r"
          style={{
            boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.5)",
          }}
        />
      </div>

      {/* Main Image */}
      <motion.div className="absolute inset-0 overflow-hidden">
        <motion.img
          animate={{
            scale: hovered ? 1.1 : 1,
            filter: hovered
              ? "brightness(0.7) contrast(1.1)"
              : "brightness(0.9) contrast(1)",
          }}
          transition={{ duration: 0.3 }}
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
        <motion.div
          animate={{
            opacity: hovered ? 0.85 : 0.7,
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.3), transparent)"
              : "linear-gradient(to top, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0) 70%)",
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Episode Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="absolute top-3 left-3 z-20"
      >
        <div className="font-outfit flex items-center gap-1.5 rounded-lg bg-black/40 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
          <BsCcCircleFill className="text-primary h-3.5 w-3.5" />
          <span className="text-primary">EP {episodeNumber}</span>
        </div>
      </motion.div>

      {/* Progress Text Badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="absolute top-3 right-3 z-20"
      >
        <div className="font-outfit flex items-center gap-1.5 rounded-lg bg-black/40 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
          <span className="text-text/90 font-semibold">{progress}%</span>
        </div>
      </motion.div>

      {/* Always Visible Title */}
      <motion.div
        animate={{ y: hovered ? -80 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`absolute right-0 -bottom-2 left-0 z-20 p-4 ${
          hovered ? "mb-4" : "mb-0"
        }`}
      >
        <h1 className="font-outfit text-text/90 line-clamp-2 text-sm font-semibold sm:text-base md:h-fit lg:text-lg">
          {title}
        </h1>
      </motion.div>

      {/* Sliding Content */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 bottom-0 left-0 z-20 space-y-3 bg-gradient-to-t from-black/80 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-lg bg-black/30 px-3 py-1.5 backdrop-blur-md">
                <IoTime className="text-primary h-3.5 w-3.5" />
                <span className="font-outfit text-xs text-white/90">
                  {formatTime(timeStamp)} left
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-black/30 px-3 py-1.5 backdrop-blur-md">
                <TbClockHour4Filled className="text-primary h-3.5 w-3.5" />
                <span className="font-outfit text-xs text-white/90">
                  {episodeNumber}/{totalEpisodes}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <Link
                to={`/watch/${animeId}?ep=${episodeId}`}
                className="group/btn from-primary via-primary/90 to-primary/80 relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r px-4 py-2.5 text-sm font-medium text-white transition-all duration-300"
              >
                <motion.div
                  animate={{ x: hovered ? 0 : -20, opacity: hovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-white/10"
                />
                <FaPlay className="text-xs transition-transform duration-300 group-hover/btn:scale-110" />
                <span className="font-semibold">Continue</span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/30 text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-red-500/20 hover:text-red-500"
              >
                <MdDelete className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ContinueWatchingCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  totalEpisodes: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  timeStamp: PropTypes.number.isRequired,
  animeId: PropTypes.string.isRequired,
  episodeId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContinueWatchingCard;
