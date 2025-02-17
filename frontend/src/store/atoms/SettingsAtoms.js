import { atom } from "recoil";

// Get initial settings from localStorage or use defaults
const getInitialSettings = () => {
  const savedSettings = localStorage.getItem("settings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return {
    autoNext: true,
    autoSkipIntro: false,
    autoPlay: true,
    enableDub: false,
    titleLanguage: "English",
    defaultServer: "default",
    preferredQuality: "1080p",
  };
};

export const settingsAtom = atom({
  key: "settingsAtom",
  default: getInitialSettings(),
});
