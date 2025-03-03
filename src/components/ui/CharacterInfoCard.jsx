import { motion } from "motion/react";

const CharacterInfoCard = ({ title, role, image, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      ease: "backOut",
      duration: 0.3,
      delay,
    }}
    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    className="group"
  >
    <div className="relative backdrop-blur-xs rounded-xl overflow-hidden  border-[1px] border-white/[0.05]">
      <div className="relative aspect-3/4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent opacity-90" />
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 md:gap-2 bg-background/20 px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-xs border border-white/[0.05]">
                <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs md:text-sm font-medium text-white">
                  {role}
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-base  leading-tight text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default CharacterInfoCard;
