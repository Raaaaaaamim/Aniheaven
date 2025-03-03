import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeatureCard = ({
  to,
  icon: Icon,
  title,
  description,
  gradient,
  delay,
}) => (
  <Link to={to} className="group">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative h-[200px] sm:h-[200px] bg-background/20 rounded-2xl overflow-hidden backdrop-blur-xs border border-white/[0.05] hover:border-primary/20 transition-colors font-outfit duration-500"
    >
      {/* Content Container */}
      <div className="relative h-full p-6 flex flex-col">
        {/* Icon */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/20 group-hover:bg-white/10 transition-all duration-500">
              <Icon className="w-6 h-6 text-primary/80 group-hover:text-primary transition-colors duration-500" />
            </div>
          </div>
          <motion.h3 className="text-lg font-medium text-text/90 group-hover:text-white transition-colors duration-500">
            {title}
          </motion.h3>
        </div>

        {/* Description */}
        <p className="text-sm text-text/60 group-hover:text-text/80 transition-colors duration-500 line-clamp-3">
          {description}
        </p>

        {/* Bottom Action */}
        <div className="mt-auto pt-4 flex items-center text-primary/70 group-hover:text-primary transition-colors duration-500">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>Learn more</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>

        {/* Hover Effects */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-primary/5 to-transparent rounded-full blur-2xl transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-primary/5 to-transparent rounded-full blur-2xl transform -translate-x-12 translate-y-12 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-700" />
      </div>
    </motion.div>
  </Link>
);

export default FeatureCard;
