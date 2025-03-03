/**
 * @fileoverview WatchPage Component - Primary video player interface for anime streaming
 * @description Handles video playback, episode selection, server management, and user settings
 * @requires React, React Query, Recoil, React Router, Axios
 * @module components/pages/WatchPage
 */

import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import Lottie from "lottie-react";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { AiOutlineBackward, AiOutlineForward } from "react-icons/ai";
import { IoPlay, IoPlaySkipForward } from "react-icons/io5";
import { MdAdd, MdNetworkWifi } from "react-icons/md";
import { RiFocusMode } from "react-icons/ri";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

// Import local dependencies
import animationJSON from "../assets/cat-loading.json";
import { Player } from "../components/features/Player/Player.jsx";
import AnimatedDropdown from "../components/ui/AnimatedDropdown";
import AnimeInfoCard from "../components/ui/AnimeInfoCard.jsx";
import EpisodesContainer from "../components/ui/EpisodesContainer.jsx";
import ErrorCard from "../components/ui/ErrorCard.jsx";
import SearchEpisode from "../components/ui/SearchEpisode.jsx";
import ServerSelectionCard from "../components/ui/ServerSelectionCard.jsx";
import VideoButton from "../components/ui/VideoButton.jsx";
import useAnimeInfo from "../hooks/useAnimeInfo.jsx";
import useSettings from "../hooks/useSettings.jsx";
import { selectedEpNumberAtom } from "../store/index.js";

/**
 * WatchPage Component - Main video player and episode selection interface
 * @component
 * @returns {JSX.Element} Rendered WatchPage component
 */
const WatchPage = () => {
  // URL and state management
  const { id } = useParams();
  const [selectedServer, setSelectedServer] = useQueryState(
    "server",
    parseAsString.withDefault("hd-1"),
  );
  const [selectedCategory, setSelectedCategory] = useQueryState(
    "category",
    parseAsString.withDefault("sub"),
  );
  const dropdownRef = useRef(null);
  const [selectedEpNumber, setSelectedEpNumber] =
    useRecoilState(selectedEpNumberAtom);

  // Episode data fetching
  const {
    data: epData,
    isLoading: isEpLoading,
    isError: isEpError,
    refetch: refetchEp,
    error: epError,
  } = useQuery({
    queryKey: ["episode", id],
    queryFn: async () => {
      return await axios.get(`/hianime/anime/${id}/episodes`);
    },
    enabled: !!id,
    cacheTime: 2 * 60 * 1000, // 2 minutes cache
  });

  // Episode selection state management
  const [selectedEpisode, setSelectedEpisode] = useQueryState(
    "ep",
    parseAsString.withDefault(epData?.data?.data?.episodes?.[0]?.episodeId),
  );
  const [currentSection, setCurrentSection] = useQueryState(
    "section",
    parseAsString.withDefault("1"),
  );
  const [settings, setSettings] = useSettings();

  // Server data fetching
  const {
    data: serverData,
    isLoading: isServersLoading,
    isError: isServersError,
    refetch: refetchServers,
    error: serversError,
  } = useQuery({
    queryKey: ["server", selectedEpisode],
    queryFn: async () => {
      if (selectedEpisode) {
        return await axios.get(
          `/hianime/episode/servers?animeEpisodeId=${selectedEpisode}`,
        );
      }
    },
    enabled: !!selectedEpisode,
    staleTime: 5 * 60 * 1000, // 5 minutes stale time
    cacheTime: 30 * 60 * 1000, // 30 minutes cache
  });

  const episodeData = epData?.data?.data;

  // Source data fetching for video playback
  const {
    data: sourceData,
    isLoading: isSourceLoading,
    isError: isSourceError,
    refetch: refetchSource,
    error: sourceError,
  } = useQuery({
    queryKey: ["source", selectedEpisode, selectedServer, selectedCategory],
    queryFn: async () => {
      return await axios.get(
        `/hianime/episode/sources?animeEpisodeId=${selectedEpisode}&server=${selectedServer}&category=${selectedCategory}`,
      );
    },
    enabled: false,
    cacheTime: 0, // Disable caching for source data
    staleTime: 0,
  });
  console.log("source data", sourceData);
  // Effect hooks for data synchronization
  useEffect(() => {
    if (!selectedEpisode || !selectedServer || !selectedCategory) return;
    refetchSource();
  }, [selectedEpisode, selectedServer, selectedCategory, refetchSource]);

  useEffect(() => {
    if (!episodeData?.episodes?.[0] || selectedEpisode) return;
    const newEpisodeId = episodeData.episodes[0].episodeId;
    if (newEpisodeId !== selectedEpisode) {
      setSelectedEpisode(newEpisodeId);
    }
  }, [episodeData, selectedEpisode]);

  useEffect(() => {
    if (
      epData?.data?.data?.episodes?.[selectedEpNumber] &&
      epData?.data?.data?.episodes?.[selectedEpNumber] !== selectedEpisode &&
      selectedEpisode !== 0
    ) {
      setSelectedEpisode(
        epData?.data?.data?.episodes?.[selectedEpNumber - 1]?.episodeId,
      );
    }
  }, [selectedEpNumber, epData?.data?.data?.episodes]);

  useEffect(() => {
    if (!selectedEpisode) return;
    if (episodeData) {
      const index = episodeData?.episodes?.findIndex(
        (episode) => episode.episodeId === selectedEpisode,
      );
      setSelectedEpNumber(index + 1);
    }
  }, [selectedEpisode, episodeData]);

  // UI state and handlers
  const server = serverData?.data?.data;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  // Click outside handler for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Settings handlers
  const handleAutoNext = () => {
    setSettings((prev) => ({
      ...prev,
      autoNext: !prev.autoNext,
    }));
  };

  const handleAutoSkipIntro = () => {
    setSettings((prev) => ({
      ...prev,
      autoSkipIntro: !prev.autoSkipIntro,
    }));
  };

  const handleAutoPlay = () => {
    setSettings((prev) => ({
      ...prev,
      autoPlay: !prev.autoPlay,
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (!selectedEpNumber || !episodeData?.episodes) return;
    const episode = episodeData?.episodes[selectedEpNumber - 1 + 1] || false;
    if (!episode) return;
    setSelectedEpNumber((pre) => pre + 1);
  };

  const handlePrev = () => {
    if (!selectedEpNumber) return;
    const episode = episodeData?.episodes[selectedEpNumber - 1 - 1] || false;
    if (!episode) return;
    setSelectedEpNumber((pre) => pre - 1);
  };

  // see if the selected server is available | select another server if the current one isn't working

  useEffect(() => {
    if (!serverData?.data?.data || !selectedServer || !selectedCategory) return;
    const isCurrentServerAvailable = serverData?.data?.data[
      selectedCategory
    ]?.findIndex((server) => server.serverName === selectedServer);
    if (isCurrentServerAvailable === -1) {
      setSelectedServer(
        serverData?.data?.data[selectedCategory][0]?.serverName,
      );
    }
  }, [serverData, selectedServer, selectedCategory]);

  // Video control button configurations

  const videoButtons = [
    {
      Icon: TbPlayerTrackNextFilled,
      title: "Auto Next",
      onClick: handleAutoNext,
      isClicked: settings?.autoNext,
    },
    {
      Icon: IoPlaySkipForward,
      title: "Skip Intro",
      onClick: handleAutoSkipIntro,
      isClicked: settings?.autoSkipIntro,
    },
    {
      Icon: IoPlay,
      title: "Auto Play",
      onClick: handleAutoPlay,
      isClicked: settings?.autoPlay,
    },
    {
      Icon: RiFocusMode,
      title: "Focus",
      onClick: () => setFocus(!focus),
      iconSize: 16,
      isClicked: focus,
    },
  ];

  const videoButtonsTwo = [
    {
      Icon: AiOutlineBackward,
      title: "Prev",
      onClick: handlePrev,
      underline: false,
      isClicked: false,
    },
    {
      Icon: AiOutlineForward,
      title: "Next",
      underline: false,
      onClick: handleNext,
      isClicked: false,
    },
    {
      Icon: MdNetworkWifi,
      title: "Watch2gether",
      onClick: handleAutoNext,
      underline: false,
      isClicked: false,
    },
    {
      Icon: MdAdd,
      title: "Add to Watchlist",
      onClick: handleAutoNext,
      iconSize: 17,
      underline: false,
      isClicked: false,
    },
  ];
  // SEARCH EPISODES BY NUMBER

  const [searchEpisode, setSearchEpisode] = useState("");

  useEffect(() => {
    if (!searchEpisode || !episodeData?.episodes?.length) {
      return;
    }
    if (
      Number(searchEpisode) &&
      currentSection !== Math.ceil(Number(searchEpisode / 100)) &&
      Number(searchEpisode) < episodeData?.episodes?.length + 1
    ) {
      setCurrentSection(Math.ceil(Number(searchEpisode / 100)));
    }
  }, [searchEpisode]);

  //get anime info

  const {
    data: animeInfo,
    refetch: refetchAnimeInfo,
    isLoading: isAnimeInfoLoading,
    isError: isAnimeInfoError,
    error: animeInfoError,
  } = useAnimeInfo(id);

  useEffect(() => {
    if (selectedEpisode) {
      refetchAnimeInfo();
    }
  }, [selectedEpisode, refetchAnimeInfo]);

  // console log stuffs for checking the data
  console.log(animeInfo);

  // JSX Structure
  return (
    <div className="flex min-h-screen w-full items-start justify-center justify-self-start bg-transparent">
      {/* Focus mode overlay */}
      <div
        onClick={() => setFocus(false)}
        className={`w-full ${
          focus ? "fixed" : "hidden"
        } top-0 left-0 z-80 h-full backdrop-blur-2xl`}
      ></div>

      <div className="mb-4 flex min-h-full w-[98%] flex-col gap-4 overflow-x-hidden">
        {/* Video Player Section */}
        <div
          className={` ${
            focus ? "z-90" : "z-0"
          } group relative aspect-video overflow-hidden rounded-3xl`}
        >
          <div className="absolute inset-0 opacity-100 transition-all duration-500 group-hover:opacity-0"></div>
          {!isServersLoading &&
          !isSourceError &&
          !isSourceLoading &&
          sourceData?.data?.data?.startFrom !== undefined &&
          sourceData?.data?.data?.sources?.length > 0 ? (
            <Player
              key={`${selectedEpisode}-${selectedServer}`}
              HiAnimeId={id}
              poster={animeInfo?.data?.data?.anime?.info?.poster}
              name={animeInfo?.data?.data?.anime?.info?.name}
              type={animeInfo?.data?.data?.anime?.info?.stats?.type}
              episodes={{
                sub:
                  animeInfo?.data?.data?.anime?.info?.stats?.episodes.sub || 0,
                dub:
                  animeInfo?.data?.data?.anime?.info?.stats?.episodes.dub || 0,
              }}
              epNumber={selectedEpNumber}
              jname={animeInfo?.data?.data?.anime?.moreInfo?.japanese}
              epId={selectedEpisode}
              introStart={sourceData.data.data.intro?.start}
              introEnd={sourceData.data.data.intro?.end}
              outroStart={sourceData.data.data.outro?.start}
              outroEnd={sourceData.data.data.outro?.end}
              source={sourceData.data.data.sources[0].url}
              tracks={sourceData.data.data.tracks}
              startFrom={sourceData.data.data.startFrom}
            />
          ) : (
            <>
              {isSourceError && (
                <div className="flex h-full w-full items-center justify-center bg-[#0f0f0f]">
                  <ErrorCard error={sourceError?.message} />
                </div>
              )}
              {isSourceLoading && (
                <div className="flex aspect-video w-full items-center justify-center bg-[#0f0f0f]">
                  <div className="rounded-3xl border border-white/[0.05] bg-white/[0.02] p-8 backdrop-blur-xs">
                    <Lottie animationData={animationJSON} className="w-32" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Video Controls Section */}
        <div className="bg-secondaryBg text-secText flex min-h-[6rem] flex-col items-center justify-between gap-0 rounded-3xl border-[1px] border-white/[0.05] md:flex-row">
          <div className="ml-0 flex h-full w-full items-center justify-evenly gap-6 md:ml-6 md:w-[40%] md:justify-start">
            {videoButtons.map((button, index) => (
              <VideoButton
                key={index}
                Icon={button.Icon}
                title={button.title}
                onClick={button.onClick}
                isClicked={button.isClicked}
                iconSize={button?.iconSize}
              />
            ))}
          </div>
          <div className="mt-2 flex h-[1px] w-full bg-white/[0.02] md:hidden"></div>
          <div className="ml-0 flex h-full w-full items-center justify-evenly gap-6 md:mr-6 md:w-[40%] md:justify-end">
            {videoButtonsTwo.map((button, index) => (
              <VideoButton
                key={index}
                Icon={button.Icon}
                title={button.title}
                onClick={button.onClick}
                iconSize={button?.iconSize}
                isClicked={button.isClicked}
              />
            ))}
          </div>
        </div>

        {/* Server Selection Section */}
        <ServerSelectionCard
          isServersLoading={isServersLoading}
          isServersError={isServersError}
          serversError={serversError}
          server={server}
          selectedServer={selectedServer}
          setSelectedServer={setSelectedServer}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="flex w-full items-center justify-between">
          {!isEpLoading &&
            !isEpError &&
            episodeData?.episodes?.length > 100 && (
              <div className="self-start px-4 lg:px-6">
                <AnimatedDropdown
                  isOpen={isDropdownOpen}
                  setIsOpen={setIsDropdownOpen}
                  trigger={
                    <span>
                      Episodes {(parseInt(currentSection) - 1) * 100 + 1} -{" "}
                      {Math.min(
                        parseInt(currentSection) * 100,
                        episodeData.episodes.length,
                      )}
                    </span>
                  }
                  items={Array(Math.ceil(episodeData.episodes.length / 100))
                    .fill(0)
                    .map((_, i) => ({
                      label: `Episodes ${i * 100 + 1} - ${Math.min(
                        (i + 1) * 100,
                        episodeData.episodes.length,
                      )}`,
                      value: i + 1,
                    }))}
                  onSelect={(item) => setCurrentSection(item.value)}
                />
              </div>
            )}
          <div className="self-end">
            <SearchEpisode
              setSearchEpisode={setSearchEpisode}
              searchEpisode={searchEpisode}
            />
          </div>
        </div>
        {/* Episodes List Section */}
        <EpisodesContainer
          isEpLoading={isEpLoading}
          isEpError={isEpError}
          episodeData={episodeData}
          selectedEpisode={selectedEpisode}
          setSelectedEpisode={setSelectedEpisode}
          selectedEpNumber={selectedEpNumber}
          setSelectedEpNumber={setSelectedEpNumber}
          searchEpisode={searchEpisode}
          epData={epData}
          epError={epError}
          currentSection={currentSection}
        />
        {/* Anime info section  */}
        <AnimeInfoCard animeInfo={animeInfo} isLoading={isAnimeInfoLoading} />
      </div>
    </div>
  );
};

export default WatchPage;
