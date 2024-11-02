import { motion } from "framer-motion";

const TrendingCard = ({ rank, image, title }) => {
  const rankNumber = Number(rank);
  return (
    <div className="relative  font-poppins md:w-[220px] md:h-[300px] lg:w-[190px] lg:h-[270px] rounded-xl overflow-hidden group">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Play button - appears on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary/80 p-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-background"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Title overlay */}
      <div className="absolute flex    bottom-0 left-0 gap-1 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h1 className="font-bold text-3xl  text-primary ">
          {rankNumber >= 10 ? rankNumber : `0${rankNumber}`}
        </h1>
        <h3 className="text-white mt-[9px]  text-[15px] font-semibold truncate">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default TrendingCard;
