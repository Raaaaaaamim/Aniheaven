import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const TrendingCard = ({ rank, image, title, id }) => {
  const rankNumber = Number(rank);

  return (
    <>
      <div className="relative border-white/[0.05] border font-outfit w-full h-[280px] md:w-[220px] md:h-[300px] lg:w-[190px] lg:h-[270px] xl:w-[200px] xl:h-[280px] rounded-xl overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.4)] bg-[#0f0f0f]">
        {/* Image */}
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="w-full h-full absolute transition-transform duration-300 group-hover:scale-110 z-10 top-0 left-0 rounded-xl"
        />

        {/* Play button - appears on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20"
        >
          <Link to={`/watch/${id}`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-text hover:text-primary transition-all duration-300"
            >
              <FaPlay className="w-12 h-12" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-[10]">
          <Link
            to={`/info/${id}`}
            className="text-text/90 cursor-pointer font-outfit text-[15px] font-semibold line-clamp-1"
          >
            {title}
          </Link>
        </div>
      </div>
    </>
  );
};

export default TrendingCard;
