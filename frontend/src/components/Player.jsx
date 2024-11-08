import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Track,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useRef } from "react";
import { api } from "../pages/Home.jsx";
import "./player.css";

export function Player({ source, tracks }) {
  const player = useRef(null);
  // Separate subtitle tracks and thumbnail track
  const subtitleTracks = tracks?.filter((track) => track.kind !== "thumbnails");
  const thumbnailTrack = tracks?.find((track) => track.kind === "thumbnails");
  console.log(thumbnailTrack);
  function onProviderChange(provider) {
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  return (
    <MediaPlayer
      className="player"
      src={source}
      playsinline
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
        icons={defaultLayoutIcons}
        thumbnails={`${api}/hianime/thumbnails?url=${encodeURIComponent(
          thumbnailTrack?.file
        )}`}
      />
    </MediaPlayer>
  );
}
