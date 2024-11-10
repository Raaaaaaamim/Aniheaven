import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { RiClosedCaptioningFill, RiMic2Fill } from "react-icons/ri";
import { useParams, useSearchParams } from "react-router-dom";
import { Player } from "../components/Player";
import { api } from "./Home.jsx";
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
  console.log(selectedEpisode);

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
    if (!selectedEpisode && episodeData?.episodes?.[0]) {
      setSelectedEpisode(episodeData.episodes[0].episodeId);
      setSearchParams({ ep: episodeData.episodes[0].episodeId });
    }
  }, [episodeData]);

  const server = serverData?.data?.data;
  console.log(episodeData);

  return (
    <div className="overflow-hidden justify-self-start w-full min-h-screen flex justify-center items-start">
      <div className="overflow-hidden mb-4 flex flex-col w-[98%] gap-3 h-full rounded-xl">
        <div className="overflow-hidden aspect-video rounded-xl">
          {!isServersLoading &&
          !isSourceError &&
          !isSourceLoading &&
          sourceData?.data?.data?.sources?.length > 0 ? (
            <Player
              source={sourceData.data.data.sources[0].url}
              tracks={sourceData.data.data.tracks}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center skeleton"></div>
          )}
        </div>
        <div className="overflow-hidden w-full flex h-[6.5rem] bg-third rounded-xl">
          <div className="w-[30%] hidden lg:flex h-full border-r-[2px] border-border"></div>
          <div className=" lg:w-[70%] w-full h-full gap-0 flex flex-col">
            <div className="w-full h-[50%] border-b-2 border-b-border items-center flex justify-start gap-3">
              <RiClosedCaptioningFill className="ml-3" size={20} />
              {isServersLoading ? (
                <>
                  <div className="skeleton h-9 w-28 rounded-xl py-[6px]"></div>
                  <div className="skeleton h-9 w-28 rounded-xl py-[6px]"></div>
                  <div className="skeleton h-9 w-28 rounded-xl py-[6px]"></div>
                </>
              ) : (
                <>
                  {server?.sub.length > 0 &&
                    server?.sub?.map(({ serverName }, i) => (
                      <div
                        className={`cursor-pointer text-sm md:text-[16px] capitalize px-8 rounded-xl py-[6px]  md:py-[8px] ${
                          selectedServer === serverName &&
                          selectedCategory === "sub"
                            ? "bg-primary hover:bg-primary/80 ease-in duration-100 text-black"
                            : " bg-border hover:bg-border/80 ease-in duration-100 text-text "
                        } `}
                        key={i}
                        onClick={() => {
                          setSelectedServer(serverName);
                          setSelectedCategory("sub");
                        }}
                      >
                        {serverName || "N/A"}
                      </div>
                    ))}
                </>
              )}
            </div>
            <div className="w-full items-center flex justify-start gap-3 h-[50%]">
              <RiMic2Fill className="ml-3" size={20} />
              {isServersLoading ? (
                <>
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="skeleton h-9 w-28 rounded-xl py-[6px]"
                      ></div>
                    ))}
                </>
              ) : (
                <>
                  {server?.dub.length > 0 &&
                    server?.dub?.map(({ serverName }, i) => (
                      <div
                        className={`cursor-pointer text-sm md:text-[16px] capitalize px-8 rounded-xl md:py-[8px] py-[6px] ${
                          selectedServer === serverName &&
                          selectedCategory === "dub"
                            ? "bg-primary hover:bg-primary/80 ease-in duration-100 text-black"
                            : " bg-border hover:bg-border/80 ease-in duration-100 text-text "
                        } `}
                        key={i}
                        onClick={() => {
                          setSelectedServer(serverName);
                          setSelectedCategory("dub");
                        }}
                      >
                        {serverName || "N/A"}
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className=" w-full overflow-x-hidden py-4 font-poppins  flex   overflow-y-auto min-h-20 max-h-96 bg-third rounded-xl ">
          {episodeData?.totalEpisodes < 28 ? (
            <div className="w-full gap-2 h-full flex justify-center flex-col items-center">
              {episodeData?.episodes?.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedEpisode(item?.episodeId);
                  }}
                  className={` ${
                    selectedEpisode === item?.episodeId
                      ? " bg-primary hover:bg-primary/80 text-black "
                      : " bg-[#2D2D2D] hover:bg-border text-text "
                  } w-[97%]  py-4 rounded-xl md:text-lg ease-in duration-100  cursor-pointer  gap-2  flex  items-center`}
                >
                  <span className="  ml-5 font-[800] "> {item.number}. </span>
                  <h2 className="  ">{item.title}</h2>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
