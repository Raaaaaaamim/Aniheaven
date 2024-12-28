import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { AiOutlineBackward } from "react-icons/ai";
import { RiClosedCaptioningFill, RiMic2Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import { AiOutlineForward } from "react-icons/ai";
import { IoPlay, IoPlaySkipForward } from "react-icons/io5";
import { MdAdd, MdNetworkWifi } from "react-icons/md";
import { RiFocusMode } from "react-icons/ri";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import {
  episodeVariants,
  serverItemVariants,
  watchContainerVariants,
} from "../animations";
import animationJSON from "../assets/cat-loading.json";
import catSleep from "../assets/cat-sleep.json";
import { Player } from "../components/features/Player/Player.jsx";
import VideoButton from "../components/VideoControls/VideoButton.jsx";
import useSettings from "../hooks/useSettings.jsx";
import { api } from "../services/api";
import { selectedEpNumberAtom } from "../store/index.js";

const WatchPage = () => {
  const { id } = useParams();
  const [selectedServer, setSelectedServer] = useQueryState(
    "server",
    parseAsString.withDefault("hd-1")
  );
  const [selectedCategory, setSelectedCategory] = useQueryState(
    "category",
    parseAsString.withDefault("sub")
  );
  const dropdownRef = useRef(null);

  const [selectedEpNumber, setSelectedEpNumber] =
    useRecoilState(selectedEpNumberAtom);

  const {
    data: epData,
    isLoading: isEpLoading,
    isError: isEpError,
    refetch: refetchEp,
  } = useQuery({
    queryKey: ["episode", id],
    queryFn: async () => {
      return await axios.get(`${api}/hianime/anime/${id}/episodes`);
    },
    enabled: true,
    cacheTime: 2 * 60 * 1000,
  });
  const [selectedEpisode, setSelectedEpisode] = useQueryState(
    "ep",
    parseAsString.withDefault(epData?.data?.data?.episodes?.[0]?.episodeId)
  );
  const [currentSection, setCurrentSection] = useQueryState(
    "section",
    parseAsString.withDefault("1")
  );
  const [settings, setSettings] = useSettings();

  const {
    data: serverData,
    isLoading: isServersLoading,
    isError: isServersError,
    refetch: refetchServers,
  } = useQuery({
    queryKey: ["server", selectedEpisode],
    queryFn: async () => {
      if (selectedEpisode) {
        return await axios.get(
          `${api}/hianime/episode/servers?animeEpisodeId=${selectedEpisode}`
        );
      }
    },
    enabled: true,
    cacheTime: 60 * 60 * 1000,
  });

  const episodeData = epData?.data?.data;

  const {
    data: sourceData,
    isLoading: isSourceLoading,
    isError: isSourceError,
    refetch: refetchSource,
  } = useQuery({
    queryKey: ["source", selectedEpisode, selectedServer, selectedCategory],
    queryFn: async () => {
      return await axios.get(
        `${api}/hianime/episode/sources?animeEpisodeId=${selectedEpisode}&server=${selectedServer}&category=${selectedCategory}`
      );
    },
    enabled: false,
    cacheTime: 0,
  });

  useEffect(() => {
    if (selectedEpisode && selectedServer && selectedCategory) {
      refetchSource();
    }
  }, [selectedEpisode, selectedServer, selectedCategory, refetchSource]);

  useEffect(() => {
    if (episodeData?.episodes?.[0] && !selectedEpisode) {
      const newEpisodeId = episodeData.episodes[0].episodeId;
      if (newEpisodeId !== selectedEpisode) {
        setSelectedEpisode(newEpisodeId);
      }
    }
  }, [episodeData, selectedEpisode]);

  useEffect(() => {
    if (
      epData?.data?.data?.episodes?.[selectedEpNumber] &&
      epData?.data?.data?.episodes?.[selectedEpNumber] !== selectedEpisode &&
      selectedEpisode !== 0
    ) {
      setSelectedEpisode(
        epData?.data?.data?.episodes?.[selectedEpNumber - 1]?.episodeId
      );
    }
  }, [selectedEpNumber]);

  useEffect(() => {
    if (!selectedEpisode) return;
    if (episodeData) {
      const index = episodeData?.episodes?.findIndex(
        (episode) => episode.episodeId === selectedEpisode
      );
      setSelectedEpNumber(index + 1);
    }
  }, [selectedEpisode, episodeData]);

  const server = serverData?.data?.data;
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  //console.log(sourceData);
  const handleAutoPlay = () => {
    setSettings((prev) => ({
      ...prev,
      autoPlay: !prev.autoPlay,
    }));
  };
  const [focus, setFocus] = useState(false);
  const handleNext = () => {
    if (!selectedEpNumber) return;
    const episode = episodeData?.episodes[selectedEpNumber - 1 + 1] || false;
    if (!episode) {
      return;
    }
    setSelectedEpNumber((pre) => pre + 1);
  };
  const handlePrev = () => {
    if (!selectedEpNumber) return;
    const episode = episodeData?.episodes[selectedEpNumber - 1 - 1] || false;
    if (!episode) {
      return;
    }
    setSelectedEpNumber((pre) => pre - 1);
  };
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
  // console.log(epData);
  //console.log(selectedEpNumber);

  return (
    <div className="overflow-hidden justify-self-start w-full min-h-screen flex justify-center items-start bg-transparent ">
      <div
        onClick={() => setFocus(false)}
        className={`w-full ${
          focus ? "fixed" : "hidden"
        } h-full  top-0 left-0  z-40 backdrop-blur-2xl  `}
      ></div>
      <div className="overflow-hidden mb-4 flex flex-col w-[98%] gap-4 h-full">
        <div className="overflow-hidden z-50 aspect-video rounded-3xl relative group ">
          <div className="absolute inset-0   opacity-100 group-hover:opacity-0 transition-all duration-500"></div>
          {!isServersLoading &&
          !isSourceError &&
          !isSourceLoading &&
          sourceData?.data?.data?.sources?.length > 0 ? (
            <Player
              introStart={sourceData.data.data.intro?.start}
              introEnd={sourceData.data.data.intro?.end}
              outroStart={sourceData.data.data.outro?.start}
              outroEnd={sourceData.data.data.outro?.end}
              source={sourceData.data.data.sources[0].url}
              tracks={sourceData.data.data.tracks}
            />
          ) : (
            <>
              {isSourceError && (
                <div className="text-text font-outfit w-full h-full flex justify-center items-center bg-[#0f0f0f]">
                  <div className="flex flex-col gap-3 items-center backdrop-blur-sm bg-white/[0.02] p-8 rounded-3xl border border-white/[0.05] ">
                    <div className="w-48 h-48">
                      <Lottie animationData={catSleep} loop={true} />
                    </div>
                    <h1 className="text-lg font-semibold bg-gradient-to-r from-primary/90 via-primary to-primary/90 bg-clip-text text-transparent">
                      Something went wrong
                    </h1>
                  </div>
                </div>
              )}
              {isSourceLoading && (
                <div className="w-full aspect-video bg-[#0f0f0f] flex items-center justify-center">
                  <div className="backdrop-blur-sm bg-white/[0.02] p-8 rounded-3xl border border-white/[0.05] ">
                    <Lottie animationData={animationJSON} className="w-32" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className=" min-h-[6rem]  md:flex-row flex-col bg-secondaryBg rounded-3xl border-[1px] border-white/[0.05] text-secText flex justify-between items-center gap-0  ">
          <div className="md:ml-6 gap-6 ml-0  flex  md:w-[40%] w-full md:justify-start justify-evenly items-center h-full  ">
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
          <div
            className={"w-full h-[1px] md:hidden mt-2 flex bg-white/[0.02]"}
          ></div>
          <div className="md:mr-6 gap-6 ml-0  flex  md:w-[40%] w-full md:justify-end justify-evenly items-center h-full">
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
        <div className="overflow-hidden font-outfit w-full flex h-auto lg:h-[8rem] bg-secondaryBg rounded-3xl border border-white/[0.05] ">
          <div className="w-[40%] hidden justify-center items-start lg:flex lg:flex-col h-full border-r border-white/[0.05] gap-2">
            <div className="flex self-start ml-6 justify-center items-center gap-4">
              <div className="flex justify-center items-center gap-2 cursor-pointer hover:bg-white/[0.02] px-4 py-2 rounded-xl transition-all duration-300">
                <input
                  type="checkbox"
                  className="toggle toggle-xs toggle-primary"
                  onChange={handleAutoNext}
                  checked={settings?.autoNext ?? false}
                />
                <span className="text-xs font-medium text-text/90 group-hover:text-text transition-colors">
                  Auto Next
                </span>
              </div>

              <div className="flex justify-center items-center gap-2 cursor-pointer hover:bg-white/[0.02] px-4 py-2 rounded-xl transition-all duration-300">
                <input
                  type="checkbox"
                  className="toggle toggle-xs toggle-primary"
                  onChange={handleAutoSkipIntro}
                  checked={settings?.autoSkipIntro ?? false}
                />
                <span className="text-xs font-medium text-text/90 group-hover:text-text transition-colors">
                  Auto skip Intro
                </span>
              </div>
            </div>
          </div>

          <div className="lg:w-[70%] w-full  h-full gap-0 flex flex-col">
            <motion.div
              className="w-full h-auto lg:h-[50%] border-b border-white/[0.05] items-center flex flex-wrap lg:flex-nowrap justify-start gap-3 p-3 lg:px-6"
              variants={watchContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <RiClosedCaptioningFill
                className="text-primary/90 ml-2 lg:ml-0"
                size={18}
              />
              {isServersLoading ? (
                <>
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white/[0.02] animate-pulse w-20 lg:w-24 h-8 lg:h-9 rounded-xl"
                      ></div>
                    ))}
                </>
              ) : (
                <>
                  {server?.sub.length > 0 &&
                    server?.sub?.map(({ serverName }, i) => (
                      <motion.div
                        variants={serverItemVariants}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer text-xs lg:text-sm capitalize px-3 lg:px-5 rounded-xl py-[6px] transition-all duration-300 ${
                          selectedServer === serverName &&
                          selectedCategory === "sub"
                            ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                            : "bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05]"
                        }`}
                        key={i}
                        onClick={() => {
                          setSelectedServer(serverName);
                          setSelectedCategory("sub");
                        }}
                      >
                        {serverName || "N/A"}
                      </motion.div>
                    ))}
                  {server?.sub.length === 0 && (
                    <div className="text-xs lg:text-sm capitalize px-3 lg:px-5 rounded-xl py-[6px] bg-white/[0.02] text-text/70 border border-white/[0.05]">
                      N/A
                    </div>
                  )}
                </>
              )}
            </motion.div>

            <motion.div
              className="w-full h-auto lg:h-[50%] items-center flex flex-wrap lg:flex-nowrap justify-start gap-2 gap-3 p-3 lg:px-6"
              variants={watchContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <RiMic2Fill className="text-primary/90 ml-2 lg:ml-0" size={18} />
              {isServersLoading ? (
                <>
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white/[0.02] animate-pulse w-20 lg:w-24 h-8 lg:h-9 rounded-xl"
                      ></div>
                    ))}
                </>
              ) : (
                <>
                  {server?.dub.length > 0 &&
                    server?.dub?.map(({ serverName }, i) => (
                      <motion.div
                        variants={serverItemVariants}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer text-xs lg:text-sm capitalize px-3 lg:px-5 rounded-xl py-[6px] transition-all duration-300 ${
                          selectedServer === serverName &&
                          selectedCategory === "dub"
                            ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                            : "bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05]"
                        }`}
                        key={i}
                        onClick={() => {
                          setSelectedServer(serverName);
                          setSelectedCategory("dub");
                        }}
                      >
                        {serverName || "N/A"}
                      </motion.div>
                    ))}
                  {(!server?.dub || server.dub.length === 0) && (
                    <>
                      <div className="text-xs lg:text-sm bg-white/[0.02] text-text/70 capitalize px-3 lg:px-5 rounded-xl py-[6px] border border-white/[0.05]">
                        N/A
                      </div>
                      <div className="text-xs lg:text-sm bg-white/[0.02] text-text/70 capitalize px-3 lg:px-5 rounded-xl py-[6px] border border-white/[0.05]">
                        N/A
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>

        <div className="w-full font-poppins overflow-x-hidden py-4 lg:py-6  flex overflow-y-auto min-h-20 max-h-[30rem] bg-[#0f0f0f] rounded-3xl border border-white/[0.05] ">
          {isEpLoading ? (
            <div className="w-full gap-2 h-full flex justify-center flex-col items-center">
              <div className="flex flex-col w-full gap-4">
                {/* Section Dropdown Skeleton */}
                <div className="px-4 lg:px-6">
                  <div className="w-[160px] lg:w-[180px] h-7 lg:h-8 rounded-xl bg-white/[0.02] animate-pulse border border-white/[0.05]"></div>
                </div>

                {/* Episodes Grid */}
                <div className="flex-wrap self-center w-[97%] rounded-xl bg-white/[0.02] animate-pulse px-2 gap-2 h-[200px] flex justify-center items-center border border-white/[0.05]"></div>
              </div>
            </div>
          ) : (
            <>
              {episodeData?.totalEpisodes < 40 ? (
                <motion.div
                  className="w-full gap-2 h-full flex justify-center flex-col items-center px-2"
                  variants={watchContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {episodeData?.episodes?.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={episodeVariants}
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedEpisode(item?.episodeId);
                        setSelectedEpNumber(item?.number);
                      }}
                      className={`${
                        selectedEpisode === item?.episodeId
                          ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                          : "bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05]"
                      } w-[97%] py-2 lg:py-3 line-clamp-1 text-xs lg:text-sm rounded-xl lg:h-[3.3rem] h-[2.8rem] transition-all duration-300 cursor-pointer gap-2 flex items-center`}
                    >
                      <span className="ml-3 lg:ml-5 font-semibold">
                        {item.number}.{" "}
                      </span>
                      <h2 className="text-xs lg:text-sm">{item.title}</h2>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div className="flex flex-col gap-3 lg:gap-4 w-full">
                  {episodeData?.episodes?.length > 100 && (
                    <div ref={dropdownRef} className="dropdown px-4 lg:px-6">
                      <div
                        tabIndex={0}
                        role="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="btn btn-sm bg-white/[0.02] hover:bg-white/[0.04] text-text/90 w-[160px] lg:w-[180px] flex justify-between transition-all duration-300 border border-white/[0.05] text-xs lg:text-sm h-7 lg:h-8 min-h-0"
                      >
                        <span>
                          Episodes {(parseInt(currentSection) - 1) * 100 + 1} -{" "}
                          {Math.min(
                            parseInt(currentSection) * 100,
                            episodeData.episodes.length
                          )}
                        </span>
                      </div>
                      <ul
                        tabIndex={0}
                        className={`dropdown-content z-[1] menu p-2 shadow-lg bg-[#0f0f0f] rounded-xl w-52 border border-white/[0.05] ${
                          isDropdownOpen ? "" : "hidden"
                        }`}
                      >
                        {Array(Math.ceil(episodeData.episodes.length / 100))
                          .fill(0)
                          .map((_, i) => (
                            <li
                              key={i}
                              onClick={() => {
                                setCurrentSection(i + 1);
                                setIsDropdownOpen(false);
                              }}
                              className="text-xs lg:text-sm"
                            >
                              <a>
                                Episodes {i * 100 + 1} -{" "}
                                {Math.min(
                                  (i + 1) * 100,
                                  episodeData.episodes.length
                                )}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-wrap justify-center gap-2 px-2">
                    {episodeData?.episodes
                      ?.slice(
                        (parseInt(currentSection) - 1) * 100,
                        parseInt(currentSection) * 100
                      )
                      .map((item, i) => (
                        <motion.div
                          key={i}
                          variants={episodeVariants}
                          whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedEpisode(item?.episodeId);
                          }}
                          className={`flex justify-center items-center cursor-pointer font-medium w-[3.5rem] lg:w-[4.5rem] h-8 lg:h-10 gap-1 rounded-xl text-xs lg:text-sm ${
                            selectedEpisode === item?.episodeId
                              ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                              : item.isFiller
                              ? "bg-primary/40 hover:bg-primary/60 text-black"
                              : "bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05]"
                          } transition-all duration-300`}
                        >
                          {item?.number}
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
