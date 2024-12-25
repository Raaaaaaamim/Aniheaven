import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Track,
  useMediaStore,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { settingsAtom } from "../../../store/atoms/SettingsAtoms.js";
import { selectedEpNumberAtom } from "../../../store/index.js";
import "./styles.css";

export const Player = memo(function Player({
  source,
  tracks,
  target,
  introStart,
  introEnd,
  outroStart,
  outroEnd,
}) {
  const player = useRef(null);
  const { currentTime, duration } = useMediaStore(player);
  const [skipButtonText, setSkipButtonText] = useState("");
  const [showSkipButton, setShowSkipButton] = useState(false);
  const setSelectedEpNumber = useSetRecoilState(selectedEpNumberAtom);
  const settings = useRecoilValue(settingsAtom);

  // Memoize tracks filtering
  const { subtitleTracks, thumbnailTrack } = useMemo(
    () => ({
      subtitleTracks: tracks?.filter((track) => track.kind !== "thumbnails"),
      thumbnailTrack: tracks?.find((track) => track.kind === "thumbnails")
        ? {
            src: tracks.find((track) => track.kind === "thumbnails").file,
            kind: "thumbnails",
            url: tracks.find((track) => track.kind === "thumbnails").file,
          }
        : null,
    }),
    [tracks]
  );

  useEffect(() => {
    if (!currentTime || !duration) return;

    // Handle auto next
    if (settings.autoNext && Math.abs(currentTime - duration) < 1) {
      setSelectedEpNumber((prev) => prev + 1);
    }

    // Handle skip button visibility and text
    const isInIntro =
      introStart &&
      introEnd &&
      currentTime >= introStart &&
      currentTime <= introEnd;
    const isInOutro =
      outroStart &&
      outroEnd &&
      currentTime >= outroStart &&
      currentTime <= outroEnd;

    const newShowSkipButton = isInIntro || isInOutro;
    const newSkipButtonText = isInIntro
      ? "Skip Intro"
      : isInOutro
      ? "Skip Outro"
      : "";

    if (showSkipButton !== newShowSkipButton) {
      setShowSkipButton(newShowSkipButton);
    }
    if (skipButtonText !== newSkipButtonText) {
      setSkipButtonText(newSkipButtonText);
    }

    // Handle auto skip intro
    if (settings.autoSkipIntro && isInIntro && player.current) {
      player.current.currentTime = introEnd;
    }
  }, [
    currentTime,
    duration,
    introStart,
    introEnd,
    outroStart,
    outroEnd,
    settings.autoNext,
    settings.autoSkipIntro,
  ]);

  const handleSkip = useCallback(() => {
    if (!player.current) return;

    if (currentTime >= introStart && currentTime <= introEnd) {
      player.current.currentTime = introEnd;
    } else if (currentTime >= outroStart && currentTime <= outroEnd) {
      player.current.currentTime = outroEnd;
    }
  }, [currentTime, introStart, introEnd, outroStart, outroEnd]);

  const onProviderChange = useCallback((provider) => {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }, []);

  return (
    <MediaPlayer
      autoplay
      className="vds-player"
      src={source}
      onProviderChange={onProviderChange}
      ref={player}
    >
      <MediaProvider>
        {subtitleTracks?.map((track) => (
          <Track
            key={track.file}
            kind="subtitles"
            src={track.file}
            label={track.label || "Unknown"}
            language={(track.label || "en").toLowerCase()}
            default={Boolean(track.default)}
          />
        ))}
      </MediaProvider>
      <DefaultVideoLayout
        thumbnails={thumbnailTrack.url}
        icons={defaultLayoutIcons}
      />
      {showSkipButton && (
        <div
          onClick={handleSkip}
          className="bg-background/30 px-4 py-2 rounded-lg text-white backdrop-blur-md font-poppins hover:bg-background/50 border-white/50 hover:border-white/70  border-[2px] ease-in duration-100 absolute bottom-20 hover:cursor-pointer right-5"
        >
          {skipButtonText}
        </div>
      )}
    </MediaPlayer>
  );
});
