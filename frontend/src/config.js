import axios from "axios";
import { FaChild } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { RiMedalFill, RiVipCrownFill } from "react-icons/ri";

export const api = "http://localhost:4000/api/v2";

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = api;

export const rarityConfig = {
  beyondHuman: {
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    shadow: "shadow-orange-500/20",
    border: "border-orange-500/20",
    icon: RiVipCrownFill,
    label: "Jod",
    bgGlow: "from-orange-500/20 to-rose-500/20",
  },
  chosenOne: {
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    shadow: "shadow-purple-500/20",
    border: "border-purple-500/20",
    icon: FaBoltLightning,
    label: "Bolt",
    bgGlow: "from-violet-500/20 to-fuchsia-500/20",
  },
  angrish: {
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

export const achievements = {
  beyondHuman: {
    title: "The N Badge",
    description: "Watch 1000 episodes",
    xp: 60000,
    rarity: "beyondHuman",
    reward: "N badge",
  },
  chosenOne: {
    title: "The Wizard",
    description: "Connect your MyAnimeList account",
    xp: 30000,
    rarity: "chosenOne",
    reward: "Bolt Badge",
  },
  angrish: {
    title: "Angrish",
    description: "Watch 10+ hours of anime",
    xp: 6000,
    rarity: "angrish",
    reward: "Angrish badge",
  },
  new: {
    title: "First Steps",
    description: "Complete your profile setup",
    xp: 0,
    rarity: "new",
    reward: "Newbie Badge",
  },
};
