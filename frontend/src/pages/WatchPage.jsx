import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useRef } from "react";
import { RiClosedCaptioningFill, RiMic2Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  episodeVariants,
  serverItemVariants,
  watchContainerVariants,
} from "../animations";
import animationJSON from "../assets/cat-loading.json";
import catSleep from "../assets/cat-sleep.json";
import { Player } from "../components/features/Player/Player.jsx";
import { api } from "../services/api";
import { settingsAtom } from "../store/atoms/SettingsAtoms.js";
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

  const selectedEpNumber = useRecoilValue(selectedEpNumberAtom);

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
  const [settings, setSettings] = useRecoilState(settingsAtom);
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
        epData?.data?.data?.episodes?.[selectedEpNumber]?.episodeId
      );
    }
  }, [selectedEpNumber]);

  const server = serverData?.data?.data;
  const handleAutoNext = () => {
    setSettings((prev) => ({
      ...prev,
      autoNext: !prev.autoNext,
    }));
    localStorage.setItem(
      "settings",
      JSON.stringify({
        ...settings,
        autoNext: !settings.autoNext,
      })
    );
  };
  const handleAutoSkipIntro = () => {
    setSettings((prev) => ({
      ...prev,
      autoSkipIntro: !prev.autoSkipIntro,
    }));
    localStorage.setItem(
      "settings",
      JSON.stringify({
        ...settings,
        autoSkipIntro: !settings.autoSkipIntro,
      })
    );
  };
  return (
    <div className="overflow-hidden justify-self-start w-full min-h-screen flex justify-center items-start">
      <div className="overflow-hidden mb-4 flex flex-col w-[98%] gap-3 h-full rounded-xl">
        <div className="overflow-hidden aspect-video rounded-2xl">
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
                <div className=" text-text font-poppins w-full h-full flex justify-center items-center ">
                  <div className=" flex flex-col gap-1 ">
                    <div className="w-48 h-48">
                      <Lottie animationData={catSleep} loop={true} />
                    </div>
                    <h1 className=" text-lg font-bold ">
                      Something went wrong
                    </h1>
                  </div>
                </div>
              )}
              {isSourceLoading && (
                <div className="w-full aspect-video bg-[#1f1f1f] animate-pulse flex items-center justify-center">
                  <Lottie animationData={animationJSON} className="w-32" />
                </div>
              )}
            </>
          )}
        </div>
        <div className="overflow-hidden font-poppins w-full flex h-[6.5rem] bg-[#151515] rounded-xl">
          <div className="w-[40%] hidden justify-center items-start lg:flex lg:flex-col h-full border-r-[2px] gap-2 border-border">
            <div className="flex self-start ml-4 justify-center items-center gap-2  ">
              <div className=" flex justify-center items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle toggle-xs toggle-primary"
                  onChange={handleAutoNext}
                  checked={settings?.autoNext ?? false}
                />
                <span className=" text-xs font-semibold ">Auto Next</span>
              </div>

              <div className=" flex justify-center items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle toggle-xs toggle-primary"
                  onChange={handleAutoSkipIntro}
                  checked={settings?.autoSkipIntro ?? false}
                />
                <span className=" text-xs font-semibold ">Auto skip Intro</span>
              </div>
            </div>

            <div className=" flex justify-center items-center   "></div>
          </div>
          <div className=" lg:w-[70%] w-full h-full gap-0 flex flex-col">
            <motion.div
              className="w-full h-[50%] border-b-2 border-b-border items-center flex justify-start gap-3"
              variants={watchContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <RiClosedCaptioningFill className="ml-3" size={20} />
              {isServersLoading ? (
                <>
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-border animate-pulse  w-24 h-9 lg:w-28 rounded-xl py-[6px]"
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
                        className={`cursor-pointer  text-sm md:text-[16px] capitalize px-4 lg:px-8 rounded-xl py-[6px] md:py-[8px] ${
                          selectedServer === serverName &&
                          selectedCategory === "sub"
                            ? "bg-primary hover:bg-primary/80 ease-in duration-100 text-black"
                            : " bg-border hover:bg-border/80 ease-in duration-100 text-text"
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
                    <div className=" font-poppins text-sm md:text-[16px] capitalize px-4 lg:px-8 rounded-xl py-[6px] md:py-[8px] bg-border hover:bg-border/80 ease-in duration-100 text-text">
                      N/A
                    </div>
                  )}
                </>
              )}
            </motion.div>
            <motion.div
              className="w-full items-center flex justify-start gap-3 h-[50%]"
              variants={watchContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <RiMic2Fill className="ml-3" size={20} />
              {isServersLoading ? (
                <>
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className=" bg-border animate-pulse  w-24 h-9 lg:w-28 rounded-xl py-[6px]"
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
                        className={`cursor-pointer  text-sm md:text-[16px] capitalize px-4 lg:px-8 rounded-xl md:py-[8px] py-[6px] ${
                          selectedServer === serverName &&
                          selectedCategory === "dub"
                            ? "bg-primary hover:bg-primary/80 hover:ease-in hover:duration-100 text-black"
                            : " bg-border hover:bg-border/80 hover:ease-in hover:duration-100 text-text "
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
                      <div className="cursor-pointer text-sm md:text-[16px] bg-border hover:bg-border/80 ease-in duration-100 text-text capitalize px-4 lg:px-8 rounded-xl md:py-[8px] py-[6px]">
                        N/A
                      </div>
                      <div className="cursor-pointer text-sm md:text-[16px] bg-border hover:bg-border/80 ease-in duration-100 text-text capitalize px-4 lg:px-8 rounded-xl md:py-[8px] py-[6px]">
                        N/A
                      </div>
                    </>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
        <div className=" w-full overflow-x-hidden py-4 font-poppins  flex   overflow-y-auto min-h-20  max-h-96 bg-[#151515] rounded-xl ">
          {isEpLoading ? (
            <div className="w-full gap-2 h-full flex justify-center flex-col items-center">
              <div className="flex flex-col  w-full gap-4">
                {/* Section Dropdown Skeleton */}
                <div className="px-2">
                  <div className="w-[180px] h-8 rounded-xl bg-border animate-pulse"></div>
                </div>

                {/* Episodes Grid */}
                <div className="flex-wrap self-center w-[97%] rounded-xl bg-border animate-pulse px-2 gap-2 h-[200px] flex justify-center items-center"></div>
              </div>
            </div>
          ) : (
            <>
              {episodeData?.totalEpisodes < 40 ? (
                <motion.div
                  className="w-full gap-2 h-full flex justify-center flex-col items-center"
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
                        transition: {
                          duration: 0.01,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedEpisode(item?.episodeId)}
                      className={`${
                        selectedEpisode === item?.episodeId
                          ? "bg-primary hover:bg-primary/80 text-text"
                          : "bg-[#1f1f1f] hover:bg-border text-text"
                      } w-[97%]  py-3 line-clamp-1 text-sm rounded-xl md:text-[1rem] lg:h-[3.3rem] ease-in duration-100 cursor-pointer gap-2 flex items-center`}
                    >
                      <span className="ml-5 font-[800]">{item.number}. </span>
                      <h2 className="">{item.title}</h2>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div className="flex flex-col gap-4">
                  {episodeData?.episodes?.length > 100 && (
                    <div ref={dropdownRef} className="dropdown px-2">
                      <div
                        tabIndex={0}
                        role="button"
                        onClick={() => {
                          if (dropdownRef.current) {
                            dropdownRef.current
                              .querySelector("ul")
                              .classList.toggle("hidden");
                          }
                        }}
                        className="btn btn-sm bg-border hover:bg-border/80 text-text w-[180px] flex justify-between"
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
                        className="dropdown-content menu bg-base-200 rounded-box z-[1] w-[180px] p-2 shadow-xl"
                      >
                        {Array.from(
                          {
                            length: Math.ceil(
                              episodeData.episodes.length / 100
                            ),
                          },
                          (_, i) => {
                            const start = i * 100 + 1;
                            const end = Math.min(
                              (i + 1) * 100,
                              episodeData.episodes.length
                            );
                            return (
                              <li key={i + 1}>
                                <a
                                  className={`${
                                    parseInt(currentSection) === i + 1
                                      ? "bg-primary/20"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    setCurrentSection((i + 1).toString());
                                    if (dropdownRef.current) {
                                      dropdownRef.current
                                        .querySelector("ul")
                                        .classList.add("hidden");
                                    }
                                  }}
                                >
                                  Episodes {start}-{end}
                                </a>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  )}
                  <motion.div className="flex-wrap px-2 gap-2 h-full flex justify-center items-center">
                    {episodeData?.episodes
                      ?.slice(
                        (parseInt(currentSection) - 1) * 100,
                        parseInt(currentSection) * 100
                      )
                      ?.map((item, i) => (
                        <motion.div
                          key={i}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedEpisode(item?.episodeId);
                          }}
                          className={`flex justify-center items-center cursor-pointer font-bold font-poppins w-[4.5rem] h-10 gap-1 rounded-xl ${
                            selectedEpisode === item?.episodeId
                              ? "bg-primary hover:bg-primary/80 text-black"
                              : item.isFiller
                              ? " bg-primary/40 hover:bg-primary/60 text-black "
                              : "bg-border hover:bg-border/80 text-text"
                          } ease-in duration-100`}
                        >
                          {item?.number}
                        </motion.div>
                      ))}
                  </motion.div>
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
