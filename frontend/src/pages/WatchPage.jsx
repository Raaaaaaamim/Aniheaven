import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";
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
  const episodeId = searchParams.get("ep");

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

  const {
    data: serverData,
    isLoading: isServersLoading,
    isError: isServersError,
    refetch: refetchServers,
  } = useQuery({
    queryKey: ["server", episodeId],
    queryFn: async () => {
      return await axios.get(
        `${api}/hianime/episode/servers?animeEpisodeId=${episodeId}`
      );
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
    queryKey: ["source", episodeId, selectedServer, selectedCategory],
    queryFn: async () => {
      return await axios.get(
        `${api}/hianime/episode/sources?animeEpisodeId=${episodeId}&server=${selectedServer}&category=${selectedCategory}`
      );
    },
    enabled: false,
    cacheTime: 0,
  });

  useEffect(() => {
    if (episodeId && selectedServer && selectedCategory) {
      refetchSource();
    }
  }, [episodeId, selectedServer, selectedCategory, refetchSource]);

  useEffect(() => {
    if (!episodeId && episodeData?.episodes?.length > 0) {
      setSearchParams({ ep: episodeData.episodes[0].episodeId });
    }
  }, [episodeData, episodeId, setSearchParams]);

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
              source={sourceData.data.data.sources[0].url}
              tracks={sourceData.data.data.tracks}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center skeleton"></div>
          )}
        </div>
        <div className="overflow-hidden w-full flex h-[6.5rem] bg-third rounded-xl">
          <div className="w-[30%] h-full border-r-[2px] border-border"></div>
          <div className="w-[70%] h-full gap-0 flex flex-col">
            <div className="w-full h-[50%] border-b-2 border-b-border items-center flex justify-start gap-3">
              <RiClosedCaptioningFill className="ml-3" size={20} />
              {isServersLoading ? (
                <>
                  <div className="skeleton h-9 w-28 rounded-xl py-[6px]"></div>
                  <div className="skeleton h-9 w-28 rounded-xl py-[6px]"></div>
                  <div className="skeleton h-9 w-28 rounded-xl py-[6px]"></div>
                </>
              ) : (
                server?.sub?.map(({ serverName }, i) => (
                  <div
                    className={`cursor-pointer capitalize px-8 rounded-xl py-[6px] ${
                      selectedServer === serverName &&
                      selectedCategory === "sub"
                        ? "bg-primary text-black"
                        : " bg-border text-text "
                    } `}
                    key={i}
                    onClick={() => {
                      setSelectedServer(serverName);
                      setSelectedCategory("sub");
                    }}
                  >
                    {serverName || "N/A"}
                  </div>
                ))
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
                server?.dub?.map(({ serverName }, i) => (
                  <div
                    onClick={() => {
                      setSelectedServer(serverName);
                      setSelectedCategory("dub");
                    }}
                    className={`cursor-pointer capitalize px-8 rounded-xl py-[6px] ${
                      selectedServer === serverName &&
                      selectedCategory === "dub"
                        ? "bg-primary text-black"
                        : " bg-border text-text "
                    } `}
                    key={i}
                  >
                    {serverName || "N/A"}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
