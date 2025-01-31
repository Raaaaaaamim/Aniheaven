import { motion } from "framer-motion";
import React from "react";
import { watchContainerVariants } from "../../animations.jsx";
import ErrorCard from "./ErrorCard.jsx";
const EpisodesContainer = ({
  isEpLoading,
  isEpError,
  episodeData,
  selectedEpisode,
  setSelectedEpisode,
  setSelectedEpNumber,
  searchEpisode,
  epData,
  epError,
  currentSection,
}) => {
  return (
    <div>
      <div className="w-full font-poppins overflow-x-hidden overflow-y-auto  py-4 lg:py-6 flex  min-h-20 max-h-[30rem] bg-[#0f0f0f] rounded-3xl border border-white/[0.05]">
        {/* Episodes Loading State */}
        {isEpLoading && !isEpError ? (
          <div className="w-full gap-2 h-full flex justify-center flex-col items-center">
            <div className="flex flex-col w-full gap-4">
              {/* Section Dropdown Loading Skeleton */}
              <div className="px-4 lg:px-6">
                <div className="w-[160px] lg:w-[180px] h-7 lg:h-8 rounded-xl bg-white/[0.02] animate-pulse border border-white/[0.05]"></div>
              </div>
              {/* Episodes Grid Loading Skeleton */}
              <div className="flex-wrap self-center w-[97%] rounded-xl bg-white/[0.02] animate-pulse px-2 gap-2 h-[200px] flex justify-center items-center border border-white/[0.05]"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Render Episodes Based on Total Count */}
            {episodeData?.totalEpisodes < 40 ? (
              <motion.div
                className="w-full gap-2 h-full flex justify-center flex-col items-center px-2"
                variants={watchContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Render Episode List for Small Series */}
                {episodeData?.episodes?.map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.05,
                      ease: "backOut",
                    }}
                    key={i}
                    className="w-full justify-center items-center flex"
                  >
                    <div
                      onClick={() => {
                        setSelectedEpisode(item?.episodeId);
                        setSelectedEpNumber(item?.number);
                      }}
                      className={`${
                        selectedEpisode === item?.episodeId
                          ? "bg-linear-to-r from-primary via-primary to-primary/90 text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                          : item.isFiller
                          ? "bg-primary/40 hover:bg-primary/60 text-black"
                          : "bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05]"
                      } 
              ${
                searchEpisode && searchEpisode === Number(item?.number)
                  ? " animate-pulse! bg-text!  text-black! "
                  : " animate-none!  "
              }
              
              w-[97%] py-2 lg:py-3 line-clamp-1 text-xs lg:text-sm rounded-xl lg:h-[3.3rem] h-[2.8rem] transition-all duration-300 cursor-pointer gap-2 flex items-center`}
                    >
                      <span className="ml-3 lg:ml-5 font-semibold">
                        {item.number}.{" "}
                      </span>
                      <h2 className="text-xs lg:text-sm">{item.title}</h2>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Render Paginated Episodes for Large Series
              <motion.div className="flex flex-col gap-3 lg:gap-4 w-full">
                {/* Error Display */}
                {isEpError && !epData && epError && (
                  <div className="w-full flex justify-center flex-col items-center">
                    <ErrorCard error={epError?.message} />
                  </div>
                )}
                {/* Section Dropdown for Large Series */}

                {/* Episode Grid Display */}
                <div className="flex flex-wrap justify-center gap-2 px-2">
                  {episodeData?.episodes
                    ?.slice(
                      (parseInt(currentSection) - 1) * 100,
                      parseInt(currentSection) * 100
                    )
                    .map((item, i) => (
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.01,
                          ease: "backOut",
                        }}
                      >
                        <div
                          key={i}
                          onClick={() => {
                            setSelectedEpisode(item?.episodeId);
                          }}
                          className={`flex justify-center items-center cursor-pointer font-medium w-[3.5rem] lg:w-[4.5rem] h-8 lg:h-10 gap-1 rounded-xl text-xs lg:text-sm ${
                            selectedEpisode === item?.episodeId
                              ? "bg-linear-to-r from-primary via-primary to-primary/90 text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                              : item.isFiller
                              ? "bg-primary/40 hover:bg-primary/60 text-black"
                              : "bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05]"
                          } 
                   ${
                     searchEpisode && searchEpisode === Number(item?.number)
                       ? " animate-pulse! bg-text!  text-black! "
                       : " animate-none!  "
                   }
                  
                  transition-all duration-300`}
                        >
                          {item?.number}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EpisodesContainer;
