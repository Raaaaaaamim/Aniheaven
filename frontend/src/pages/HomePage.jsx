import { motion } from "framer-motion";
import {
  BsCalendar3,
  BsCollectionPlay,
  BsFire,
  BsGrid,
  BsListUl,
  BsPlayFill,
  BsSearch,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../assets/aniheaven.svg";

const FeatureCard = ({
  to,
  icon: Icon,
  title,
  description,
  gradient,
  delay,
}) => (
  <Link
    to={to}
    className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02]"
  >
    <div
      className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: gradient }}
    />
    <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 h-full backdrop-blur-sm">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="relative z-10"
      >
        <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-2xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
        </div>
        <h3 className="text-xl font-medium mb-3 text-text group-hover:text-white transition-colors duration-500">
          {title}
        </h3>
        <p className="text-sm text-text/60 group-hover:text-white/80 line-clamp-2 transition-colors duration-500">
          {description}
        </p>
      </motion.div>
    </div>
  </Link>
);

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-background/95 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-transparent z-10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            src="https://w.wallhaven.cc/full/yx/wallhaven-yxj6eg.png"
            alt=""
            className="w-full  h-full object-cover opacity-30"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen">
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6">
          <div className="w-full max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <Link to="/" className="inline-block mb-6 mt-8">
                <img
                  src={logo}
                  alt="AniHeaven"
                  className="h-16 sm:h-20 mx-auto"
                />
              </Link>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-outfit font-bold bg-gradient-to-r from-text/90 to-text/60 bg-clip-text text-transparent mb-6">
                Your Anime Journey Begins Here
              </h1>
              <p className="text-lg sm:text-xl text-text/60 mb-12 px-4 max-w-2xl mx-auto">
                Discover, watch, and explore the best anime collection curated
                just for you
              </p>

              {/* Search Section */}
              <div className="relative mb-16">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 via-primary/20 to-transparent blur-2xl rounded-2xl opacity-70" />
                <Link to="/search" className="block">
                  <div className="relative flex bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl p-2 hover:bg-white/[0.05] transition-all duration-500">
                    <input
                      type="text"
                      placeholder="Search your favorite anime..."
                      className="flex-1 bg-transparent px-6 py-4 text-lg text-text placeholder:text-text/40 focus:outline-none cursor-pointer"
                      readOnly
                    />
                    <button className="bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-500 flex items-center gap-3 font-medium">
                      <BsSearch className="w-5 h-5" />
                      <span className="hidden sm:inline">Search</span>
                    </button>
                  </div>
                </Link>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                <Link
                  to="/home"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-white px-8 py-4 rounded-xl transition-all duration-500 flex items-center gap-3 font-medium"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <BsPlayFill className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Start Watching</span>
                </Link>
                <Link
                  to="/schedules"
                  className="group relative overflow-hidden px-8 py-4 rounded-xl text-text border border-white/[0.05] hover:border-primary/30 transition-all duration-500 backdrop-blur-sm flex items-center gap-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <BsCalendar3 className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Schedule</span>
                </Link>
                <Link
                  to="/category"
                  className="group relative overflow-hidden px-8 py-4 rounded-xl text-text border border-white/[0.05] hover:border-primary/30 transition-all duration-500 backdrop-blur-sm flex items-center gap-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <BsGrid className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Categories</span>
                </Link>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-4">
                <FeatureCard
                  to="/az"
                  icon={BsListUl}
                  title="A-Z Collection"
                  description="Browse our extensive library alphabetically and find your next favorite series"
                  gradient="linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)"
                  delay={0.2}
                />
                <FeatureCard
                  to="/home"
                  icon={BsCollectionPlay}
                  title="Latest Episodes"
                  description="Stay up to date with the newest releases and never miss an episode"
                  gradient="linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(244, 63, 94, 0.05) 100%)"
                  delay={0.3}
                />
                <FeatureCard
                  to="/category"
                  icon={BsFire}
                  title="Popular & Trending"
                  description="Discover what's hot in the anime world and join the conversation"
                  gradient="linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(234, 179, 8, 0.05) 100%)"
                  delay={0.4}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
