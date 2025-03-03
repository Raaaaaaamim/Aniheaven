import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { settingsAtom } from "../store/atoms/SettingsAtoms.js";

const useSettings = () => {
  const [settings, setSettings] = useRecoilState(settingsAtom);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings, setSettings]);

  return [settings, setSettings];
};

export default useSettings;
