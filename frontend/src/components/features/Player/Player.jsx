import { useMutation } from "@tanstack/react-query";
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
import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { settingsAtom } from "../../../store/atoms/SettingsAtoms.js";
import { selectedEpNumberAtom } from "../../../store/index.js";
import "./styles.css";

export const Player = function Player({
  source,
  tracks,
  introStart,
  introEnd,
  outroStart,
  outroEnd,
  epId,
  jname,
  episodes,
  type,
  name,
  poster,
  HiAnimeId,
  epNumber,
  startFrom,
}) {
  const player = useRef(null);
  const { currentTime, duration } = useMediaStore(player);
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["continue-watching"],
    mutationFn: async (mutationData) => {
      return await axios.post("/anime/continue-watching", mutationData);
    },
    onSuccess: (data) => {},
    onError: (err) => {},
  });

  let timeout = useRef(null);

  const handleContinueWatching = () => {
    if (
      !HiAnimeId ||
      !name ||
      !poster ||
      !type ||
      !duration ||
      !currentTime ||
      !jname ||
      !episodes?.sub ||
      !episodes?.dub ||
      !epNumber ||
      !epId
    ) {
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      mutate({
        HiAnimeId,
        name,
        poster,
        type,
        duration,
        startFrom: currentTime,
        jname,
        episodes: {
          sub: Number(episodes.sub),
          dub: Number(episodes.dub),
        },
        epNumber,
        epId,
      });
    }, 1000);
  };

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
    [tracks],
  );

  useEffect(() => {
    const media = player.current;
    if (!media || startFrom == null) return;

    const handleCanPlay = () => {
      media.currentTime = startFrom;
    };

    media.addEventListener("can-play", handleCanPlay);
    return () => media.removeEventListener("can-play", handleCanPlay);
  }, [startFrom]);

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
      currentTime={startFrom}
      autoPlay={settings.autoPlay}
      className="vds-player"
      src={source}
      onProviderChange={onProviderChange}
      ref={player}
      onPause={handleContinueWatching}
      onSeeked={handleContinueWatching}
      onPlay={handleContinueWatching}
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
        thumbnails={thumbnailTrack && thumbnailTrack.url}
        icons={defaultLayoutIcons}
      />
      {showSkipButton && (
        <div
          onClick={handleSkip}
          className="bg-background/30 font-poppins hover:bg-background/50 absolute right-5 bottom-20 rounded-lg border-[2px] border-white/50 px-4 py-2 text-white backdrop-blur-md duration-100 ease-in hover:cursor-pointer hover:border-white/70"
        >
          {skipButtonText}
        </div>
      )}
    </MediaPlayer>
  );
};
