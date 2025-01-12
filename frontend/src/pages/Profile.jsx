import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FiAward,
  FiBookmark,
  FiClock,
  FiEye,
  FiGlobe,
  FiHeart,
  FiLock,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { RiNetflixFill } from "react-icons/ri";
import { SiMyanimelist } from "react-icons/si";

// Import custom components
import AchievementCard from "../components/profile/AchievementCard";
import ActivityItem from "../components/profile/ActivityItem";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const fileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    username: "KuroNeko",
    email: "kuroneko@example.com",
    bio: "Anime enthusiast and manga collector | Level 42 Weeb",
    level: 42,
    experience: 7800,
    nextLevel: 10000,
    joinDate: "January 2024",
  });

  // Profile images
  const [profileImage, setProfileImage] = useState(
    "https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg"
  );
  const [bannerImage, setBannerImage] = useState(
    "https://wallpaperaccess.com/full/1236471.jpg"
  );

  // Achievements data
  const achievements = [
    {
      title: "Binge Master",
      description: "Watch 10 episodes in a single day",
      icon: RiNetflixFill,
      progress: 100,
      rarity: "legendary",
      reward: "Special Profile Badge",
      unlockedDate: "2024-01-10",
    },
    {
      title: "MAL Sync",
      description: "Connect your MyAnimeList account",
      icon: SiMyanimelist,
      progress: 100,
      rarity: "epic",
      reward: "Profile Integration",
      unlockedDate: "2024-01-05",
    },
    {
      title: "First Steps",
      description: "Complete your profile setup",
      icon: FiUser,
      progress: 80,
      rarity: "rare",
      reward: "Profile Customization",
    },
  ];

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
            icon: "",
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

  // Stats configuration
  const stats = [
    {
      icon: FiClock,
      label: "Watch Time",
      value: "234h",
      subValue: "+12h this week",
      color: "bg-gradient-to-r from-violet-600 to-purple-600",
      change: +5.2,
    },
    {
      icon: FiHeart,
      label: "Favorites",
      value: "47",
      subValue: "Top genre: Action",
      color: "bg-gradient-to-r from-rose-600 to-pink-600",
      change: +2.1,
    },
    {
      icon: FiBookmark,
      label: "Watchlist",
      value: "89",
      subValue: "15 ongoing series",
      color: "bg-gradient-to-r from-blue-600 to-cyan-600",
      change: -1.4,
    },
    {
      icon: FiTrendingUp,
      label: "Activity",
      value: "High",
      subValue: "Last 30 days",
      color: "bg-gradient-to-r from-emerald-600 to-teal-600",
      change: +8.7,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Profile Header Section */}
      <ProfileHeader
        {...form}
        profileImage={profileImage}
        bannerImage={bannerImage}
        onImageChange={(e) => handleImageChange(e, "profile")}
        onBannerChange={(e) => handleImageChange(e, "banner")}
        fileInputRef={fileInputRef}
        bannerInputRef={bannerInputRef}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Stats Section */}
        <div className="mt-32 mb-12">
          <ProfileStats stats={stats} />
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-8 mb-8 border-b border-white/10 overflow-x-auto no-scrollbar">
          {[
            "profile",
            "achievements",
            "activity",
            "preferences",
            "security",
            "connections",
            "notifications",
          ].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-3 text-sm font-medium capitalize whitespace-nowrap transition-all relative ${
                activeSection === section
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {section}
              {activeSection === section && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === "achievements" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <AchievementCard key={index} {...achievement} />
                ))}
              </div>
            )}
            {activeSection === "activity" && (
              <div className="space-y-6">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Video Preferences */}
                <div className="space-y-6">
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-6">
                      Video Preferences
                    </h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">
                          Autoplay Next Episode
                        </span>
                        <div className="w-12 h-6 bg-secondary/40 rounded-full relative cursor-pointer">
                          <div className="absolute w-5 h-5 bg-primary rounded-full top-0.5 left-0.5" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Auto-skip Intro</span>
                        <div className="w-12 h-6 bg-secondary/40 rounded-full relative cursor-pointer">
                          <div className="absolute w-5 h-5 bg-primary rounded-full top-0.5 left-0.5" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-gray-300">Default Audio</span>
                        <select className="w-full bg-secondary/40 border border-white/10 rounded-xl p-3 text-gray-300">
                          <option value="jp">Japanese with Subtitles</option>
                          <option value="en">English Dub</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <span className="text-gray-300">Video Quality</span>
                        <select className="w-full bg-secondary/40 border border-white/10 rounded-xl p-3 text-gray-300">
                          <option value="auto">Auto (Recommended)</option>
                          <option value="1080p">1080p</option>
                          <option value="720p">720p</option>
                          <option value="480p">480p</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interface Preferences */}
                <div className="space-y-6">
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-6">
                      Interface Preferences
                    </h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Dark Mode</span>
                        <div className="w-12 h-6 bg-secondary/40 rounded-full relative cursor-pointer">
                          <div className="absolute w-5 h-5 bg-primary rounded-full top-0.5 right-0.5" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-gray-300">Language</span>
                        <select className="w-full bg-secondary/40 border border-white/10 rounded-xl p-3 text-gray-300">
                          <option value="en">English</option>
                          <option value="jp">日本語</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <span className="text-gray-300">Time Format</span>
                        <select className="w-full bg-secondary/40 border border-white/10 rounded-xl p-3 text-gray-300">
                          <option value="12">12-hour</option>
                          <option value="24">24-hour</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSection === "security" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 2FA Settings */}
                <div className="space-y-6">
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-6">
                      Two-Factor Authentication
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                          <FiLock className="text-2xl text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">
                            Enable 2FA
                          </h4>
                          <p className="text-sm text-gray-400 mb-4">
                            Add an extra layer of security to your account
                          </p>
                          <button className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors">
                            Set up 2FA
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Login History */}
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-6">
                      Login History
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-secondary/40 rounded-xl">
                        <div>
                          <p className="text-white">Windows - Chrome</p>
                          <p className="text-sm text-gray-400">
                            Current Session
                          </p>
                        </div>
                        <span className="text-green-400 text-sm">
                          Active Now
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-secondary/40 rounded-xl">
                        <div>
                          <p className="text-white">iPhone - Safari</p>
                          <p className="text-sm text-gray-400">
                            Last active: 2 hours ago
                          </p>
                        </div>
                        <button className="text-red-400 text-sm hover:text-red-300">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password & Recovery */}
                <div className="space-y-6">
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-6">
                      Password & Recovery
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-gray-300">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-secondary/40 border border-white/10 rounded-xl p-3 text-gray-300"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-300">New Password</label>
                        <input
                          type="password"
                          className="w-full bg-secondary/40 border border-white/10 rounded-xl p-3 text-gray-300"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-300">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-secondary/40 border border-white/10 rounded-xl p-3 text-gray-300"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <button className="w-full px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Recovery Email */}
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-6">
                      Recovery Email
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">k***@example.com</span>
                        <button className="text-primary hover:text-primary/80">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSection === "connections" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-6">
                      Connected Accounts
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-secondary/40 rounded-xl">
                        <div className="flex items-center gap-4">
                          <SiMyanimelist className="text-2xl text-primary" />
                          <div>
                            <p className="text-white">MyAnimeList</p>
                            <p className="text-sm text-gray-400">Connected</p>
                          </div>
                        </div>
                        <button className="text-red-400 hover:text-red-300">
                          Disconnect
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-secondary/40 rounded-xl">
                        <div className="flex items-center gap-4">
                          <FiGlobe className="text-2xl text-primary" />
                          <div>
                            <p className="text-white">AniList</p>
                            <p className="text-sm text-gray-400">
                              Not Connected
                            </p>
                          </div>
                        </div>
                        <button className="text-primary hover:text-primary/80">
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSection === "notifications" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-6">
                      Notification Settings
                    </h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-300">New Episodes</p>
                          <p className="text-sm text-gray-400">
                            Get notified when new episodes are available
                          </p>
                        </div>
                        <div className="w-12 h-6 bg-secondary/40 rounded-full relative cursor-pointer">
                          <div className="absolute w-5 h-5 bg-primary rounded-full top-0.5 right-0.5" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-300">Achievements</p>
                          <p className="text-sm text-gray-400">
                            Get notified when you earn new achievements
                          </p>
                        </div>
                        <div className="w-12 h-6 bg-secondary/40 rounded-full relative cursor-pointer">
                          <div className="absolute w-5 h-5 bg-primary rounded-full top-0.5 right-0.5" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-300">Newsletter</p>
                          <p className="text-sm text-gray-400">
                            Receive weekly updates and recommendations
                          </p>
                        </div>
                        <div className="w-12 h-6 bg-secondary/40 rounded-full relative cursor-pointer">
                          <div className="absolute w-5 h-5 bg-primary rounded-full top-0.5 left-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSection === "profile" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* About Section */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-4">About</h3>
                    <p className="text-gray-400">{form.bio}</p>
                  </div>
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-4">
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
                {/* Side Section */}
                <div className="space-y-6">
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-4">Connections</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <SiMyanimelist className="text-2xl text-primary" />
                        <span className="text-gray-400">MyAnimeList</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiGlobe className="text-2xl text-primary" />
                        <span className="text-gray-400">Website</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary/20 rounded-2xl p-6 backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-semibold mb-4">
                      Latest Achievements
                    </h3>
                    <div className="space-y-4">
                      {achievements.slice(0, 2).map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-xl bg-secondary/20 border border-white/5"
                        >
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-r ${
                              achievement.rarity === "legendary"
                                ? "from-amber-500 to-rose-500"
                                : achievement.rarity === "epic"
                                ? "from-violet-500 to-fuchsia-500"
                                : "from-blue-500 to-teal-500"
                            }`}
                          >
                            <achievement.icon className="text-lg text-white" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Profile;
