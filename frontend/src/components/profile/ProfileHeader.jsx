import { motion } from "framer-motion";
import React from "react";
import { FiCamera, FiEdit2 } from "react-icons/fi";
import { rarityConfig } from "../../config.js";

const ProfileHeader = ({
  username,
  bio,
  level,
  experience,
  nextLevel,
  profileImage,
  bannerImage,
  onImageChange,
  onBannerChange,
  fileInputRef,
  bannerInputRef,
  achievements = [],
  rarity,
}) => {
  const config = rarityConfig[rarity || "epic"];

  return (
    <div className="relative min-h-[60vh] font-outfit w-full">
      {/* Banner Section */}
      <div className="relative min-h-[40vh] w-full">
        {/* Banner Image with Overlay */}
        <div className="absolute inset-0 bg-background overflow-hidden">
          {/* Improved gradient overlays for better text legibility */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/90 to-background z-20" />
          <div className="absolute inset-0 bg-linear-to-r from-primary/30 to-accent/30 mix-blend-overlay z-10" />

          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={bannerImage || "https://wallpaperaccess.com/full/1236471.jpg"}
            alt="Profile Banner"
            className="w-full h-full object-cover object-center opacity-50"
          />

          {/* Banner Edit Button - Adjusted for mobile */}
          <button
            onClick={() => bannerInputRef.current?.click()}
            className="absolute top-4 right-4 z-30 p-2 sm:p-3 rounded-xl bg-secondary/40 backdrop-blur-md text-text hover:bg-secondary/60 transition-all duration-300 group border border-white/10"
          >
            <FiCamera className="text-lg sm:text-xl group-hover:scale-110 transition-transform" />
          </button>
          <input
            type="file"
            ref={bannerInputRef}
            onChange={onBannerChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Profile Info Container - Improved mobile layout */}
        <div className="absolute bottom-0 left-0 w-full z-30 transform translate-y-1/3 sm:translate-y-1/2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
              {/* Profile Picture - Adjusted size for mobile */}
              <div className="relative overflow-hidden group">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full rounded-full overflow-hidden ring-4 ring-background"
                  >
                    <img
                      src={
                        profileImage ||
                        "https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <FiEdit2 className="text-2xl sm:text-3xl text-text" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={onImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Profile Info - Improved text alignment and spacing */}
              <div className="flex-1 mb-8 md:mb-10 text-center md:text-left">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-text to-text/80">
                      {username}
                    </h1>
                    <div
                      className={`px-3 py-1.5 rounded-full bg-linear-to-r ${config.gradient} text-white text-xs font-medium flex items-center gap-1.5 shadow-lg ${config.shadow}`}
                    >
                      <config.icon className="text-sm" />
                      <span>{config.label}</span>
                    </div>
                  </div>
                  <p className="text-text/80 font-poppins text-sm max-w-2xl px-4 sm:px-0">
                    {bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
