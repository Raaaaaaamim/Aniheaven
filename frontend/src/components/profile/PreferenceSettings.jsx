import { motion } from "framer-motion";
import React from "react";
import {
  FiSettings,
  FiMonitor,
  FiGlobe,
  FiDownload,
  FiEye,
  FiBell,
  FiZap,
  FiClock,
  FiFilter,
  FiHeart,
  FiList,
  FiShare2,
  FiTag,
} from "react-icons/fi";
import { RiTranslate2 } from "react-icons/ri";
import CustomSelect from "./CustomSelect";
import CustomSwitch from "./CustomSwitch";

const PreferenceSettings = ({ preferences, onUpdate }) => {
  const qualityOptions = [
    { value: "auto", label: "Auto", description: "Adjusts based on connection" },
    { value: "4k", label: "4K", description: "Ultra HD quality" },
    { value: "1080p", label: "1080p", description: "Full HD quality" },
    { value: "720p", label: "720p", description: "HD quality" },
    { value: "480p", label: "480p", description: "SD quality" },
  ];

  const languageOptions = [
    { value: "en", label: "English", description: "English (US)" },
    { value: "ja", label: "Japanese", description: "日本語" },
    { value: "ko", label: "Korean", description: "한국어" },
    { value: "zh", label: "Chinese", description: "中文" },
  ];

  const autoNextOptions = [
    { value: "instant", label: "Instant", description: "Play next episode immediately" },
    { value: "5s", label: "5 seconds", description: "Wait 5 seconds before next episode" },
    { value: "10s", label: "10 seconds", description: "Wait 10 seconds before next episode" },
    { value: "manual", label: "Manual", description: "Don't auto-play next episode" },
  ];

  const sections = [
    {
      title: "Playback Settings",
      icon: FiMonitor,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      settings: [
        {
          name: "defaultQuality",
          label: "Default Quality",
          description: "Set your preferred video quality",
          type: "select",
          options: qualityOptions,
        },
        {
          name: "autoNextDelay",
          label: "Auto Next Episode",
          description: "Control how next episodes are played",
          type: "select",
          options: autoNextOptions,
        },
        {
          name: "autoplay",
          label: "Autoplay Videos",
          description: "Play videos automatically when page loads",
          type: "switch",
        },
        {
          name: "skipIntro",
          label: "Skip Intro",
          description: "Automatically skip anime openings",
          type: "switch",
        },
        {
          name: "skipEnding",
          label: "Skip Ending",
          description: "Automatically skip anime endings",
          type: "switch",
        },
        {
          name: "reduceAnimations",
          label: "Reduce Animations",
          description: "Minimize motion effects",
          type: "switch",
        },
      ],
    },
    {
      title: "Language & Region",
      icon: FiGlobe,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      settings: [
        {
          name: "subtitlesLanguage",
          label: "Subtitles Language",
          description: "Choose your preferred subtitle language",
          type: "select",
          options: languageOptions,
        },
        {
          name: "interfaceLanguage",
          label: "Interface Language",
          description: "Set your interface language",
          type: "select",
          options: languageOptions,
        },
        {
          name: "preferDub",
          label: "Prefer Dubbed",
          description: "Prioritize dubbed versions when available",
          type: "switch",
        },
      ],
    },
    {
      title: "Content Preferences",
      icon: FiFilter,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      settings: [
        {
          name: "showAdult",
          label: "Adult Content",
          description: "Show mature content in search results",
          type: "switch",
        },
        {
          name: "blurNsfw",
          label: "Blur NSFW",
          description: "Blur potentially sensitive images",
          type: "switch",
        },
        {
          name: "showSpoilers",
          label: "Show Spoilers",
          description: "Display content marked as spoilers",
          type: "switch",
        },
        {
          name: "hideWatched",
          label: "Hide Watched",
          description: "Hide episodes you've already seen",
          type: "switch",
        },
      ],
    },
    {
      title: "List Preferences",
      icon: FiList,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      settings: [
        {
          name: "autoAddToList",
          label: "Auto-add to List",
          description: "Add shows to your list when you start watching",
          type: "switch",
        },
        {
          name: "trackProgress",
          label: "Track Progress",
          description: "Automatically update episode progress",
          type: "switch",
        },
        {
          name: "showRatings",
          label: "Show Ratings",
          description: "Display your ratings on your profile",
          type: "switch",
        },
      ],
    },
    {
      title: "Social Features",
      icon: FiShare2,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      settings: [
        {
          name: "showActivity",
          label: "Activity Status",
          description: "Show your online status to others",
          type: "switch",
        },
        {
          name: "shareHistory",
          label: "Share History",
          description: "Let others see your watch history",
          type: "switch",
        },
        {
          name: "allowComments",
          label: "Allow Comments",
          description: "Let others comment on your activity",
          type: "switch",
        },
      ],
    },
    {
      title: "Notifications",
      icon: FiBell,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      settings: [
        {
          name: "newEpisodes",
          label: "New Episodes",
          description: "Get notified about new episodes",
          type: "switch",
        },
        {
          name: "friendActivity",
          label: "Friend Activity",
          description: "Notifications about friend activity",
          type: "switch",
        },
        {
          name: "recommendations",
          label: "Recommendations",
          description: "Receive personalized recommendations",
          type: "switch",
        },
        {
          name: "appUpdates",
          label: "App Updates",
          description: "Get notified about app updates",
          type: "switch",
        },
      ],
    },
    {
      title: "Performance",
      icon: FiZap,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      settings: [
        {
          name: "preloadVideos",
          label: "Preload Videos",
          description: "Buffer videos in advance",
          type: "switch",
        },
        {
          name: "hardwareAcceleration",
          label: "Hardware Acceleration",
          description: "Use GPU for better performance",
          type: "switch",
        },
        {
          name: "backgroundPlayback",
          label: "Background Playback",
          description: "Continue playing when tab is inactive",
          type: "switch",
        },
      ],
    },
  ];

  const handleSettingChange = (section, setting, value) => {
    onUpdate({
      ...preferences,
      [setting.name]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="space-y-6"
    >
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-background rounded-2xl p-6 border border-white/[0.05] shadow-xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-xl ${section.iconBg}`}>
              <section.icon className={`text-2xl ${section.iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text">
                {section.title}
              </h3>
              <p className="text-text/60 text-sm">
                Customize your {section.title.toLowerCase()} preferences
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {section.settings.map((setting) => (
              <div
                key={setting.name}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-text font-medium">{setting.label}</p>
                  <p className="text-text/60 text-sm">{setting.description}</p>
                </div>
                {setting.type === "select" ? (
                  <div className="w-48">
                    <CustomSelect
                      value={preferences[setting.name]}
                      onChange={(value) =>
                        handleSettingChange(section, setting, value)
                      }
                      options={setting.options}
                    />
                  </div>
                ) : (
                  <CustomSwitch
                    checked={preferences[setting.name]}
                    onChange={() =>
                      handleSettingChange(
                        section,
                        setting,
                        !preferences[setting.name]
                      )
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PreferenceSettings;
