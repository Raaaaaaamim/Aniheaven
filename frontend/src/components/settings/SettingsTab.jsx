import React, { useEffect } from "react";
import { BiMoviePlay } from "react-icons/bi";
import { FaClosedCaptioning } from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { IoLanguage, IoSparkles } from "react-icons/io5";
import { MdPlayArrow, MdSkipNext } from "react-icons/md";
import { TbServer } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { settingsAtom } from "../../store/atoms/SettingsAtoms.js";
import SettingSelect from "./SettingsSelect.jsx";
import SettingToggle from "./SettingsToggle.jsx";

const SettingsTab = () => {
  const [settings, setSettings] = useRecoilState(settingsAtom);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const Section = ({ title, icon: Icon, children }) => (
    <div className="space-y-2">
      <div className="mb-4 flex items-center gap-3 px-4 sm:mb-6 sm:px-6">
        <Icon className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
        <h2 className="text-lg font-semibold text-white/90 sm:text-xl">
          {title}
        </h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );

  const style = document.createElement("style");
  style.textContent = `
    @keyframes dropdown {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .animate-dropdown {
      animation: dropdown 0.2s ease-out forwards;
    }
  `;
  document.head.appendChild(style);

  return (
    <div className="min-h-screen w-full space-y-8 py-6 sm:space-y-12 sm:py-8">
      <div className="mx-auto grid w-full max-w-[1920px] gap-8 px-4 sm:gap-12 sm:px-6 md:grid-cols-1 lg:grid-cols-2">
        <Section title="Playback Settings" icon={IoSparkles}>
          <SettingToggle
            icon={MdPlayArrow}
            title="Auto Play"
            value={settings.autoPlay}
            onChange={() => handleToggle("autoPlay")}
            description="Automatically play videos when the page loads"
          />
          <SettingToggle
            icon={MdSkipNext}
            title="Auto Play Next Episode"
            value={settings.autoNext}
            onChange={() => handleToggle("autoNext")}
            description="Continue to the next episode automatically"
          />
          <SettingToggle
            icon={BiMoviePlay}
            title="Auto Skip Intro"
            value={settings.autoSkipIntro}
            onChange={() => handleToggle("autoSkipIntro")}
            beta={true}
            description="Skip anime openings automatically"
          />
        </Section>

        <Section title="Content Settings" icon={HiOutlineVideoCamera}>
          <SettingToggle
            icon={FaClosedCaptioning}
            title="Auto Enable DUB"
            value={settings.enableDub}
            onChange={() => handleToggle("enableDub")}
            description="Prefer dubbed versions when available"
          />

          <SettingSelect
            icon={IoLanguage}
            title="Title Language"
            value={settings.titleLanguage}
            options={["English", "Romaji", "Native"]}
            onChange={(value) =>
              setSettings((prev) => ({ ...prev, titleLanguage: value }))
            }
          />
          <SettingSelect
            icon={TbServer}
            title="Default Server"
            value={settings.defaultServer}
            options={["default", "backup", "fallback"]}
            onChange={(value) =>
              setSettings((prev) => ({ ...prev, defaultServer: value }))
            }
          />
          <SettingSelect
            icon={HiOutlineVideoCamera}
            title="Preferred Quality"
            value={settings.preferredQuality}
            options={["1080p", "720p", "480p", "360p", "Auto"]}
            onChange={(value) =>
              setSettings((prev) => ({ ...prev, preferredQuality: value }))
            }
          />
        </Section>
      </div>
    </div>
  );
};

export default SettingsTab;
