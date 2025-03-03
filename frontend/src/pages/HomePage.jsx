import { motion } from "framer-motion";
import { useState } from "react";
import {
  BsCalendar3,
  BsGrid,
  BsListUl,
  BsPlayFill,
  BsSearch,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "../assets/aniheaven.svg";
import { HeroGeometric } from "../components/ui/shape-landing-hero";
import TiltCard from "../components/ui/TitltCard.jsx";

const HomePage = () => {
  const [value, setValue] = useState("");

  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <HeroGeometric />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:py-20">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto w-full max-w-5xl text-center"
          >
            {/* Logo */}
            <Link
              to="/"
              className="mb-12 inline-block transform transition-all duration-500 hover:scale-105 sm:mb-16"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                src={logo}
                alt="AniHeaven"
                className="mx-auto h-14 drop-shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)] sm:h-16"
              />
            </Link>

            {/* Hero Text */}
            <div className="relative mb-12 sm:mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-outfit text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
              >
                <span className="text-text/90">
                  Discover and Stream Your Favorite
                </span>
                <br />
                <span className="image-blend text-primary/40">
                  Anime Collection
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-text/50 mx-auto mt-6 max-w-2xl text-base font-light tracking-wide sm:text-lg"
              >
                Your gateway to endless anime entertainment. Watch, track, and
                discover new series in our carefully curated collection.
              </motion.p>
            </div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto mb-16 max-w-2xl sm:mb-20"
            >
              <div className="group hover:border-primary/20 relative flex rounded-2xl border border-white/5 bg-white/[0.02] p-1.5 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.03]">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  placeholder="Search anime titles, genres, or studios..."
                  className="text-text placeholder:text-text/30 flex-1 bg-transparent px-4 py-3 text-sm font-light tracking-wide focus:outline-none sm:px-6 sm:py-4 sm:text-base"
                />
                <Link to={value ? `/search?q=${value}` : `/search`}>
                  <button className="bg-primary/90 hover:bg-primary relative overflow-hidden rounded-xl px-6 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:text-white sm:px-8 sm:py-4 sm:text-base">
                    <div className="relative flex items-center gap-2 sm:gap-3">
                      <BsSearch className="h-4 w-4" />
                      <span className="hidden sm:inline">Search</span>
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
              className="mb-20 flex flex-wrap items-center justify-center gap-3 sm:mb-24 sm:gap-4"
            >
              <Link
                to="/home"
                className="group bg-primary/90 hover:bg-primary relative overflow-hidden rounded-xl px-6 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:text-white sm:px-8 sm:py-4 sm:text-base"
              >
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <BsPlayFill className="h-5 w-5" />
                  <span>Start Watching</span>
                </div>
              </Link>

              <Link
                to="/schedules"
                className="group text-text/70 hover:border-primary/20 relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.03] hover:text-white sm:px-8 sm:py-4 sm:text-base"
              >
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <BsCalendar3 className="h-4 w-4" />
                  <span>Schedule</span>
                </div>
              </Link>

              <Link
                to="/category"
                className="group text-text/70 hover:border-primary/20 relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.03] hover:text-white sm:px-8 sm:py-4 sm:text-base"
              >
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <BsGrid className="h-4 w-4" />
                  <span>Categories</span>
                </div>
              </Link>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 sm:gap-6 sm:px-4 lg:grid-cols-4"
            >
              <TiltCard
                to="/az"
                icon={BsListUl}
                title="Attack on titan"
                episodes={24}
                rating={8.1}
                imageUrl={
                  "https://images.discovery-prod.axs.com/2024/11/uploadedimage_672bd06c1b838.jpg"
                }
                delay={0.1}
              />
              <TiltCard
                to="/az"
                icon={BsListUl}
                title="Naruto"
                episodes={224}
                rating={8.34}
                imageUrl={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcDtQtykC4lgIBQ3Lkq2M3EIhaW0CCLh9J6A&s"
                }
                delay={0.2}
              />
              <TiltCard
                to="/az"
                icon={BsListUl}
                title="One piece "
                episodes={1111}
                rating={8.1}
                imageUrl={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7NzOWRG0GnLeMJUawixp2d7zjtKyu5iggyw&s"
                }
                delay={0.3}
              />
              <TiltCard
                to="/az"
                icon={BsListUl}
                title="Bleach "
                episodes={375}
                rating={8.15}
                imageUrl={
                  "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/02/naruto-lionsgate.jpg"
                }
                delay={0.3}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
