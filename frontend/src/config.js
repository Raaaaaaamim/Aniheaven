import { FaChild } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { RiMedalFill, RiNetflixFill, RiVipCrownFill } from "react-icons/ri";

export const api = "http://localhost:4000/api/v2";
export const rarityConfig = {
  Jod: {
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    shadow: "shadow-orange-500/20",
    border: "border-orange-500/20",
    icon: RiVipCrownFill,
    label: "Jod",
    bgGlow: "from-orange-500/20 to-rose-500/20",
  },
  epic: {
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    shadow: "shadow-purple-500/20",
    border: "border-purple-500/20",
    icon: FaBoltLightning,
    label: "Bolt",
    bgGlow: "from-violet-500/20 to-fuchsia-500/20",
  },
  rare: {
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    shadow: "shadow-blue-500/20",
    border: "border-blue-500/20",
    icon: RiMedalFill,
    label: "Rare",
    bgGlow: "from-blue-500/20 to-teal-500/20",
  },
  new: {
    gradient: "from-pink-500 via-pink-400 to-pink-400",
    shadow: "shadow-pink-500/20",
    border: "border-pink-400/20",
    icon: FaChild,
    label: "New",
    bgGlow: "from-pink-400/20 via-pink-300/20 to-pink-400/20",
  },
};
export const achievements = [
  {
    title: "The N Badge",
    description: "Watch 1000 episodes",
    icon: RiNetflixFill,
    progress: 100,
    rarity: "Jod",
    reward: "Special Profile Badge",
    unlockedDate: "2024-01-10",
    color: "bg-linear-to-r from-rose-600 to-pink-600",
  },
  {
    title: "The Wizard",
    description: "Connect your MyAnimeList account",
    icon: FaBoltLightning,
    progress: 100,
    rarity: "epic",
    reward: "The Bolt Badge",
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
