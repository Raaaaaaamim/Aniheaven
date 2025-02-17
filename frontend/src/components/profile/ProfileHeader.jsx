import { motion } from "framer-motion";
import React from "react";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";

const ProfileHeader = () => {
  return (
    <div className="font-outfit relative flex h-[250px] w-full justify-center overflow-hidden md:h-[300px]">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        className="banner absolute z-0 h-full w-full"
      >
        {/* Enhanced gradient system */}
        <div className="from-background via-background/90 absolute inset-0 bg-linear-to-t to-transparent" />
        <div className="from-background/50 to-background/50 absolute inset-0 bg-linear-to-r via-transparent" />
        <div className="from-primary/10 absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent opacity-60" />
      </motion.div>

      <div className="relative z-10 container mx-auto flex h-full flex-col justify-end px-4 md:px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 flex flex-col items-start gap-4 md:mb-6 md:flex-row md:items-end md:gap-6"
        >
          {/* Profile Image Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="group relative flex-shrink-0"
          >
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                src="https://i.pinimg.com/474x/a6/5f/27/a65f27a398dde264514e50b73ab3c7ec.jpg"
                className="group-hover:border-primary/50 h-28 w-28 rounded-xl border-[3px] border-white/10 object-cover shadow-lg transition-all duration-300 md:h-36 md:w-36"
                alt="profile"
              />
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 to-transparent" />
              {/* Verified Badge with glow effect */}
              <div className="bg-primary/10 absolute -right-1.5 -bottom-1.5 rounded-full border border-white/10 p-1.5 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] backdrop-blur-md md:-right-2 md:-bottom-2 md:p-2">
                <BiSolidBadgeCheck className="text-primary text-lg md:text-xl" />
              </div>
            </div>
          </motion.div>

          {/* Profile Info Section */}
          <div className="flex flex-col items-start gap-2 md:gap-3">
            <div className="flex flex-col gap-1 md:gap-1.5">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-1.5 md:gap-2"
              >
                <h2 className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
                  Tahmid Ramim
                </h2>
                <BiSolidBadgeCheck className="text-primary text-xl md:text-2xl" />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-3"
              >
                <span className="text-xs font-medium text-white/90 md:text-sm">
                  @ramim55x
                </span>
                <div className="flex items-center gap-1.5 text-white/60">
                  <FaCalendarAlt className="text-[10px] md:text-xs" />
                  <span className="text-[10px] md:text-xs">
                    Joined 1 year ago
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl text-xs font-medium text-white/60 md:text-sm"
            >
              Manifesting my next existential crisis, & it's going to be great
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileHeader;
