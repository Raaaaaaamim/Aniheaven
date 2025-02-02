import { motion } from "framer-motion";
import { useState } from "react";
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
import banner from "../assets/banner.webp";
import FeatureCard from "../components/ui/FeatureCard.jsx";

const HomePage = () => {
  const [value, setValue] = useState("");

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* Gradient Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,0.95))]" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(var(--color-primary-rgb),0.15)_0deg,transparent_60deg,transparent_300deg,rgba(var(--color-primary-rgb),0.15)_360deg)] animate-slow-spin" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--color-primary-rgb),0.1),transparent_70%)]" />
          </div>

          {/* Animated Lines - Hidden on Mobile */}
          <div className="absolute inset-0 opacity-20 hidden sm:block">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse" />
            <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse delay-75" />
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-pulse delay-150" />
          </div>

          {/* Banner Image with Advanced Blend */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 mix-blend-overlay"
          >
            <img
              src={banner}
              alt=""
              className="w-full h-full object-cover filter brightness-50 contrast-125 saturate-50"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto text-center"
          >
            {/* Logo */}
            <Link
              to="/"
              className="inline-block mb-8 sm:mb-12 transform hover:scale-105 transition-all duration-500 hover:rotate-3"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                src={logo}
                alt="AniHeaven"
                className="h-16 sm:h-20 mx-auto drop-shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]"
              />
            </Link>

            {/* Hero Text */}
            <div className="relative mb-10 sm:mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl font-outfit font-bold leading-tight"
              >
                <span className="inline-block bg-gradient-to-br from-white via-primary/90 to-primary/60 bg-clip-text text-transparent pb-2">
                  Start Your Anime
                </span>
                <br />
                <span className="inline-block bg-gradient-to-br from-primary/90 via-primary/70 to-white bg-clip-text text-transparent">
                  Journey Today
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 text-base sm:text-lg text-text/70 max-w-2xl mx-auto font-light"
              >
                Discover a world of endless possibilities in anime
                entertainment, curated just for you
              </motion.p>
            </div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative max-w-2xl mx-auto mb-12 sm:mb-20"
            >
              {/* Search Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500" />

              {/* Search Input */}
              <div className="relative flex bg-background/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 group">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  placeholder="Search your favorite anime..."
                  className="flex-1 bg-transparent px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-text placeholder:text-text/40 focus:outline-none font-light"
                />
                <Link to={value ? `/search?q=${value}` : `/search`}>
                  <button className="relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-white font-medium group-hover:shadow-lg group-hover:shadow-primary/50 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center gap-2 sm:gap-3">
                      <BsSearch className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline text-sm sm:text-base">
                        Search
                      </span>
                    </div>
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-16 sm:mb-24"
            >
              <Link
                to="/home"
                className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-white font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <BsPlayFill className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-base">Start Watching</span>
                </div>
              </Link>

              <Link
                to="/schedules"
                className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-background/40 backdrop-blur-xl border border-white/10 text-text hover:text-white hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <BsCalendar3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Schedule</span>
                </div>
              </Link>

              <Link
                to="/category"
                className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-background/40 backdrop-blur-xl border border-white/10 text-text hover:text-white hover:border-primary/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <BsGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Categories</span>
                </div>
              </Link>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-4"
            >
              <FeatureCard
                to="/az"
                icon={BsListUl}
                title="A-Z Collection"
                description="Browse our extensive library alphabetically and find your next favorite series"
                gradient="linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0.1) 100%)"
                delay={0.2}
              />
              <FeatureCard
                to="/home"
                icon={BsCollectionPlay}
                title="Latest Episodes"
                description="Stay up to date with the newest releases and never miss an episode"
                gradient="linear-gradient(135deg, rgba(244, 63, 94, 0.3) 0%, rgba(244, 63, 94, 0.1) 100%)"
                delay={0.3}
              />
              <FeatureCard
                to="/category"
                icon={BsFire}
                title="Popular & Trending"
                description="Discover what's hot in the anime world and join the conversation"
                gradient="linear-gradient(135deg, rgba(234, 179, 8, 0.3) 0%, rgba(234, 179, 8, 0.1) 100%)"
                delay={0.4}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
