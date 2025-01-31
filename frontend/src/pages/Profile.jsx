import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAward, FiBookmark, FiEye, FiGlobe } from "react-icons/fi";
import { SiMyanimelist } from "react-icons/si";
import AchievementCard from "../components/profile/AchievementCard";
import ActivityItem from "../components/profile/ActivityItem";
import ProfileHeader from "../components/profile/ProfileHeader";
import TabScroller from "../components/profile/TabScroller.jsx";
import { achievements } from "../config.js";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const fileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [form, setForm] = useState({
    username: "Tahmid Ramim",
    email: "tahmidramim@example.com",
    bio: "Anime enthusiast and manga collector | Level 42 Weeb",
    level: 42,
    experience: 7800,
    nextLevel: 10000,
    joinDate: "January 2024",
  });

  const [profileImage, setProfileImage] = useState(
    "https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg"
  );
  const [bannerImage, setBannerImage] = useState(
    "https://wallpaperaccess.com/full/1236471.jpg"
  );

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setProfileImage(reader.result);
        } else {
          setBannerImage(reader.result);
        }
        toast.success(
          `${type === "profile" ? "Profile" : "Banner"} image updated!`,
          {
            icon: "☑️",
            style: {
              background: "#1A1A1A",
              color: "#E2E8F0",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
          }
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const sections = [
    "profile",
    "achievements",
    "activity",
    "preferences",
    "security",
    "connections",
    "notifications",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-transparent"
    >
      <ProfileHeader
        {...form}
        profileImage={profileImage}
        bannerImage={bannerImage}
        onImageChange={(e) => handleImageChange(e, "profile")}
        onBannerChange={(e) => handleImageChange(e, "banner")}
        fileInputRef={fileInputRef}
        bannerInputRef={bannerInputRef}
      />

      <div className="max-w-7xl   mx-auto py-8 w-full px-4 sm:px-6 lg:px-8 pb-16">
        {/* Responsive Navigation */}
        <div className="relative mb-8 border-b border-white/10">
          <TabScroller>
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition-all relative shrink-0 ${
                  activeSection === section
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {section}
                {activeSection === section && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </TabScroller>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activeSection === "achievements" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {achievements.map((achievement, index) => (
                  <AchievementCard key={index} {...achievement} />
                ))}
              </div>
            )}

            {activeSection === "activity" && (
              <div className="space-y-4 sm:space-y-6">
                <ActivityItem
                  title="Started watching Demon Slayer"
                  timestamp="2 hours ago"
                  icon={FiEye}
                />
                <ActivityItem
                  title="Added 5 new shows to watchlist"
                  timestamp="1 day ago"
                  icon={FiBookmark}
                />
                <ActivityItem
                  title="Earned 'Binge Master' achievement"
                  timestamp="3 days ago"
                  icon={FiAward}
                />
              </div>
            )}

            {activeSection === "preferences" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                {/* Video Preferences Card */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-secondary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                      Video Preferences
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {/* Toggle buttons and selects */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base text-gray-300">
                          Autoplay Next Episode
                        </span>
                        <div className="w-10 sm:w-12 h-5 sm:h-6 bg-secondary/40 rounded-full relative cursor-pointer">
                          <div className="absolute w-4 sm:w-5 h-4 sm:h-5 bg-primary rounded-full top-0.5 left-0.5" />
                        </div>
                      </div>
                      {/* More preferences... */}
                    </div>
                  </div>
                </div>

                {/* Interface Preferences Card */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-secondary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                      Interface Preferences
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {/* Interface settings */}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "profile" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                <div className="lg:col-span-2 space-y-4 sm:space-y-8">
                  <div className="bg-secondary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-lg text-gray-300 sm:text-xl font-semibold mb-4">
                      About
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400">
                      {form.bio}
                    </p>
                  </div>

                  <div className="bg-secondary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-lg text-gray-300 sm:text-xl font-semibold mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      <ActivityItem
                        title="Started watching Demon Slayer"
                        timestamp="2 hours ago"
                        icon={FiEye}
                      />
                      <ActivityItem
                        title="Added 5 new shows to watchlist"
                        timestamp="1 day ago"
                        icon={FiBookmark}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Connections Card */}
                  <div className="bg-secondary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-lg text-gray-300 sm:text-xl font-semibold mb-4">
                      Connections
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-3">
                        <SiMyanimelist className="text-xl sm:text-2xl text-primary" />
                        <span className="text-sm sm:text-base text-gray-400">
                          MyAnimeList
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiGlobe className="text-xl sm:text-2xl text-primary" />
                        <span className="text-sm sm:text-base text-gray-400">
                          Website
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Achievements Card */}
                  <div className="bg-secondary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-lg text-gray-300 sm:text-xl font-semibold mb-4">
                      Latest Achievements
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {achievements.slice(0, 2).map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-secondary/20 border border-white/5"
                        >
                          <div
                            className={`p-1.5 sm:p-2 rounded-lg bg-linear-to-r ${
                              achievement.rarity === "Jod"
                                ? "from-amber-500 to-rose-500"
                                : achievement.rarity === "epic"
                                ? "from-violet-500 to-fuchsia-500"
                                : "from-blue-500 to-teal-500"
                            }`}
                          >
                            <achievement.icon className="text-base sm:text-lg text-white" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-medium text-white">
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add responsive styling for other sections... */}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Profile;
