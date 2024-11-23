import { motion } from "framer-motion";

const TrendingCard = ({ rank, image, title }) => {
  const rankNumber = Number(rank);

  return (
    <div className="relative border-border border-[1px] font-poppins w-full h-[280px] md:w-[220px] md:h-[300px] lg:w-[190px] lg:h-[270px] xl:w-[200px] xl:h-[280px] rounded-xl overflow-hidden group bg-[#1f1f1f]">
      {/* Image */}
      <img
        loading="lazy"
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 rounded-xl"
      />

      {/* Rank */}
      <h1 className="absolute top-0 right-0 z-10 bg-primary/70 backdrop-blur-lg h-11 w-9 flex justify-center items-center text-text text-xl rounded-bl-xl border-text/90 border-b-[2px] font-[800]">
        {rankNumber >= 10 ? rankNumber : `0${rankNumber}`}
      </h1>

      {/* Play button - appears on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20"
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
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-30">
        <h3 className="text-white font-outfit text-[15px] font-semibold truncate">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default TrendingCard;
