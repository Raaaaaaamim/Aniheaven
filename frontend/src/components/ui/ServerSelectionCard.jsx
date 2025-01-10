import { motion } from "framer-motion";
import React from "react";
import { MdOutlineJoinLeft } from "react-icons/md";
import { RiClosedCaptioningFill, RiMic2Fill } from "react-icons/ri";
import {
  serverItemVariants,
  watchContainerVariants,
} from "../../animations.jsx";
const ServerSelectionCard = ({
  isServersLoading,
  isServersError,
  serversError,
  server,
  selectedServer,
  setSelectedServer,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="overflow-hidden font-outfit w-full flex h-auto lg:h-[8rem] bg-secondaryBg rounded-3xl border border-white/[0.05]">
      {/* About Panel */}
      <div className="w-[40%] hidden justify-center items-start lg:flex lg:flex-col h-full border-r border-white/[0.05] gap-2">
        <div className="flex  rounded-md self-start ml-6 justify-center items-center gap-4">
          <div className=" flex justify-center items-center gap-2 ">
            <MdOutlineJoinLeft className=" text-lg text-primary " />
            <span className="text-xs lg:text-sm font-semibold">
              Filler Episode
            </span>
          </div>
        </div>
      </div>

      {/* Server Options */}
      <div className="lg:w-[70%] w-full h-full gap-0 flex flex-col">
        {/* Subtitle Servers Section */}
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
          {/* Server Loading State */}
          {isServersLoading && !isServersError ? (
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
              {/* Server Error State */}
              {isServersError ? (
                <div className="w-full h-full flex items-center justify-start">
                  <span className="text-xs lg:text-sm text-primary font-outfit">
                    {serversError?.message}
                  </span>
                </div>
              ) : (
                <>
                  {/* Subtitle Server Options */}
                  {server?.sub.length > 0 &&
                    server?.sub?.map(({ serverName }, i) => (
                      <motion.div
                        key={i}
                        variants={serverItemVariants}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.05,
                          ease: "backOut",
                        }}
                      >
                        <div
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
                        </div>
                      </motion.div>
                    ))}
                  {/* Raw Server Options */}
                  {server?.raw.length > 0 &&
                    server?.raw?.map(({ serverName }, i) => (
                      <motion.div
                        variants={serverItemVariants}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer text-xs lg:text-sm capitalize px-3 lg:px-5 rounded-xl py-[6px] transition-all duration-300 ${
                          selectedServer === serverName &&
                          selectedCategory === "raw"
                            ? "bg-gradient-to-r from-primary via-primary to-primary/90 text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                            : "bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05]"
                        }`}
                        key={i}
                        onClick={() => {
                          setSelectedServer(serverName);
                          setSelectedCategory("raw");
                        }}
                      >
                        {serverName || "N/A"}
                      </motion.div>
                    ))}
                  {/* Fallback for No Servers */}
                  {server?.sub.length === 0 && (
                    <div className="text-xs lg:text-sm capitalize px-3 lg:px-5 rounded-xl py-[6px] bg-white/[0.02] text-text/70 border border-white/[0.05]">
                      N/A
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </motion.div>

        {/* Dub Servers Section */}
        <motion.div
          className="w-full h-auto lg:h-[50%] items-center flex flex-wrap lg:flex-nowrap justify-start gap-2 gap-3 p-3 lg:px-6"
          variants={watchContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <RiMic2Fill className="text-primary/90 ml-2 lg:ml-0" size={18} />
          {/* Dub Server Loading State */}
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
              {/* Dub Server Options */}
              {server?.dub.length > 0 &&
                server?.dub?.map(({ serverName }, i) => (
                  <motion.div
                    key={i}
                    variants={serverItemVariants}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.05,
                      ease: "backOut",
                    }}
                  >
                    <div
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
                    </div>
                  </motion.div>
                ))}
              {/* Fallback for No Dub Servers */}
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
  );
};

export default ServerSelectionCard;
