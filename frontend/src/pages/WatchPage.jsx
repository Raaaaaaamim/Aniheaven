import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { RiClosedCaptioningFill, RiMic2Fill } from "react-icons/ri";
import { useParams, useSearchParams } from "react-router-dom";
import animationJSON from "../assets/cat-loading.json";
import catSleep from "../assets/cat-sleep.json";

import { FaHourglassStart } from "react-icons/fa";
import { Player } from "../components/Player";
import { api } from "./Home.jsx";
// Add these animation variants before the component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const serverItemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.01,
    },
  },
};
const episodeVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

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

  const [searchParams, setSearchParams] = useSearchParams();

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
  const [selectedEpisode, setSelectedEpisode] = useState(
    searchParams.get("ep")
  );

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
  console.log(serverData);

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
    if (!selectedEpisode && episodeData?.episodes?.[0]) {
      setSelectedEpisode(episodeData.episodes[0].episodeId);
      setSearchParams({ ep: episodeData.episodes[0].episodeId });
    }
  }, [episodeData]);

  const server = serverData?.data?.data;
  console.log(sourceData);

  return (
    <div className="overflow-hidden justify-self-start w-full min-h-screen flex justify-center items-start">
      <div className="overflow-hidden mb-4 flex flex-col w-[98%] gap-3 h-full rounded-xl">
        <div className="overflow-hidden aspect-video rounded-xl">
          {!isServersLoading &&
          !isSourceError &&
          !isSourceLoading &&
          sourceData?.data?.data?.sources?.length > 0 ? (
            <Player
              introStartTime={sourceData.data.data.intro?.start}
              introEndTime={sourceData.data.data.intro?.end}
              outroStartTime={sourceData.data.data.intro?.start}
              outroEndTime={sourceData.data.data.intro?.end}
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
                <div className="w-full rounded-xl skeleton h-full flex justify-center items-center">
                  <div className="w-48 h-48">
                    <Lottie animationData={animationJSON} loop={true} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="overflow-hidden font-poppins w-full flex h-[6.5rem] bg-[#151515] rounded-xl">
          <div className="w-[40%] hidden justify-center items-start lg:flex lg:flex-col h-full border-r-[2px] gap-2 border-border">
            <div className="flex self-start ml-4 justify-center items-center gap-2  ">
              <div className="  flex font-semibold mt-2 text-text gap-1 justify-center items-center ">
                <FaStar className=" text-primary" />

                <span className=" text-sm ">Filler!</span>
              </div>
              <div className=" flex   font-semibold mt-2 text-text gap-1 justify-center items-center ">
                <FaHourglassStart size={15} className=" text-primary" />

                <span className=" text-sm ">12</span>
              </div>
            </div>

            <h3 className=" ml-4 w-[70%] text-xs   ">
              If the current server is not working then please try other servers{" "}
            </h3>
          </div>
          <div className=" lg:w-[70%] w-full h-full gap-0 flex flex-col">
            <motion.div
              className="w-full h-[50%] border-b-2 border-b-border items-center flex justify-start gap-3"
              variants={containerVariants}
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
                        className="skeleton  w-24 h-9 lg:w-28 rounded-xl py-[6px]"
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
              variants={containerVariants}
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
                        className="skeleton  w-24 h-9 lg:w-28 rounded-xl py-[6px]"
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
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-[97%] skeleton  h-[4rem] rounded-xl         "
                  ></div>
                ))}
            </div>
          ) : (
            <>
              {episodeData?.totalEpisodes < 40 ? (
                <motion.div
                  className="w-full  gap-2 h-full flex justify-center flex-col items-center"
                  variants={containerVariants}
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
                      } w-[97%] md:py-4 py-3 line-clamp-1 text-sm rounded-xl md:text-lg ease-in duration-100 cursor-pointer gap-2 flex items-center`}
                    >
                      <span className="ml-5 font-[800]">{item.number}. </span>
                      <h2>{item.title}</h2>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div className="flex-wrap px-2 gap-2 h-full flex justify-center items-center">
                  {episodeData?.episodes?.map((item, i) => (
                    <motion.div
                      key={i}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedEpisode(item?.episodeId);
                        setSearchParams({ ep: item?.episodeId });
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
