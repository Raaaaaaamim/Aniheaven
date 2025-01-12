import { motion } from "framer-motion";
import React from "react";
import { FiAward, FiCamera, FiEdit2 } from "react-icons/fi";

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
}) => {
  return (
    <div className="relative w-full">
      {/* Banner Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        {/* Banner Image with Overlay */}
        <div className="absolute inset-0 bg-background overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 mix-blend-overlay z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={bannerImage || "https://wallpaperaccess.com/full/1236471.jpg"}
            alt="Profile Banner"
            className="w-full h-full object-cover object-center opacity-60"
          />

          {/* Banner Edit Button */}
          <button
            onClick={() => bannerInputRef.current?.click()}
            className="absolute top-4 right-4 z-30 p-3 rounded-xl bg-secondary/40 backdrop-blur-md text-text hover:bg-secondary/60 transition-all duration-300 group border border-white/10"
          >
            <FiCamera className="text-xl group-hover:scale-110 transition-transform" />
          </button>
          <input
            type="file"
            ref={bannerInputRef}
            onChange={onBannerChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Profile Info Container */}
        <div className="absolute bottom-0 left-0 w-full z-30 transform translate-y-1/2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end md:items-center gap-8">
              {/* Profile Picture */}
              <motion.div className="relative group">
                <div className="relative w-40 h-40">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-background shadow-2xl shadow-primary/20"
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
                      className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <FiEdit2 className="text-3xl text-text" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={onImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </motion.div>

                  {/* Level Badge */}
                  <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-text font-medium shadow-lg shadow-primary/20 border border-white/10">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">LVL</span>
                      <span className="text-base font-bold">{level}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text to-text/80">
                      {username}
                    </h1>
                    {achievements.length > 0 && (
                      <div className="flex -space-x-2">
                        {achievements.slice(0, 3).map((achievement, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-0.5"
                          >
                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                              <FiAward className="text-yellow-400" />
                            </div>
                          </div>
                        ))}
                        {achievements.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 p-0.5 flex items-center justify-center text-xs text-text">
                            +{achievements.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-text/80 text-lg max-w-2xl">{bio}</p>

                  {/* Experience Bar */}
                  <div className="mt-2 max-w-md">
                    <div className="flex justify-between text-sm text-text/60 mb-1">
                      <span>Experience</span>
                      <span>
                        {experience}/{nextLevel}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(experience / nextLevel) * 100}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-violet-600 to-purple-600"
                      />
                    </div>
                  </div>
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
