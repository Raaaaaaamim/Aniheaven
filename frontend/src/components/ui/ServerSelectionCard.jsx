import { motion } from "framer-motion";
import PropTypes from "prop-types";
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
    <div className="font-outfit bg-secondaryBg flex h-auto w-full overflow-hidden rounded-3xl border border-white/[0.05] lg:h-[8rem]">
      {/* About Panel */}
      <div className="hidden h-full w-[40%] items-start justify-center gap-2 border-r border-white/[0.05] lg:flex lg:flex-col">
        <div className="ml-6 flex items-center justify-center gap-4 self-start rounded-md">
          <div className="text-text flex items-center justify-center gap-2">
            <MdOutlineJoinLeft className="text-primary text-lg" />
            <span className="text-xs font-semibold lg:text-sm">
              Filler Episode
            </span>
          </div>
        </div>
      </div>

      {/* Server Options */}
      <div className="flex h-full w-full flex-col gap-0 lg:w-[70%]">
        {/* Subtitle Servers Section */}
        <motion.div
          className="flex h-auto w-full flex-wrap items-center justify-start gap-3 border-b border-white/[0.05] p-3 lg:h-[50%] lg:flex-nowrap lg:px-6"
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
                    className="h-8 w-20 animate-pulse rounded-xl bg-white/[0.02] lg:h-9 lg:w-24"
                  ></div>
                ))}
            </>
          ) : (
            <>
              {/* Server Error State */}
              {isServersError ? (
                <div className="flex h-full w-full items-center justify-start">
                  <span className="text-primary font-outfit text-xs lg:text-sm">
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
                        onClick={() => {
                          console.log("Selected Server:", serverName);
                          setSelectedServer(serverName);
                          setSelectedCategory("sub");
                        }}
                      >
                        <div
                          className={`cursor-pointer rounded-xl px-3 py-[6px] text-xs capitalize transition-all duration-300 lg:px-5 lg:text-sm ${
                            selectedServer === serverName &&
                            selectedCategory === "sub"
                              ? "from-primary via-primary to-primary/90 bg-linear-to-r text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                              : "text-text/90 border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]"
                          }`}
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
                        className={`cursor-pointer rounded-xl px-3 py-[6px] text-xs capitalize transition-all duration-300 lg:px-5 lg:text-sm ${
                          selectedServer === serverName &&
                          selectedCategory === "raw"
                            ? "from-primary via-primary to-primary/90 bg-linear-to-r text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                            : "text-text/90 border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]"
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
                    <div className="text-text/70 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-[6px] text-xs capitalize lg:px-5 lg:text-sm">
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
          className="flex h-auto w-full flex-wrap items-center justify-start gap-2 gap-3 p-3 lg:h-[50%] lg:flex-nowrap lg:px-6"
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
                    className="h-8 w-20 animate-pulse rounded-xl bg-white/[0.02] lg:h-9 lg:w-24"
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
                    onClick={() => {
                      console.log("Selected Dub Server:", serverName);
                      setSelectedServer(serverName);
                      setSelectedCategory("dub");
                    }}
                  >
                    <div
                      className={`cursor-pointer rounded-xl px-3 py-[6px] text-xs capitalize transition-all duration-300 lg:px-5 lg:text-sm ${
                        selectedServer === serverName &&
                        selectedCategory === "dub"
                          ? "from-primary via-primary to-primary/90 bg-linear-to-r text-black shadow-[0_4px_16px_rgba(120,119,198,0.4)]"
                          : "text-text/90 border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04]"
                      }`}
                    >
                      {serverName || "N/A"}
                    </div>
                  </motion.div>
                ))}
              {/* Fallback for No Dub Servers */}
              {(!server?.dub || server.dub.length === 0) && (
                <>
                  <div className="text-text/70 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-[6px] text-xs capitalize lg:px-5 lg:text-sm">
                    N/A
                  </div>
                  <div className="text-text/70 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-[6px] text-xs capitalize lg:px-5 lg:text-sm">
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

ServerSelectionCard.propTypes = {
  isServersLoading: PropTypes.bool.isRequired,
  isServersError: PropTypes.bool.isRequired,
  serversError: PropTypes.object,
  server: PropTypes.object.isRequired,
  selectedServer: PropTypes.string.isRequired,
  setSelectedServer: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default ServerSelectionCard;
