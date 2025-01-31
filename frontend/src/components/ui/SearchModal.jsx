import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

const SearchModal = ({ isOpen, onClose }) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const debouncedFetchAnime = useCallback(
    debounce(async (query) => {
      if (!query) {
        setResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${api}/hianime/search/suggestion?q=${query}`
        );
        const searchResults = response?.data?.data || [];
        setResults(searchResults);
      } catch (error) {
        console.error("Error fetching anime:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 200), // Reduced debounce time for better responsiveness
    []
  );

  const handleChange = (e) => {
    const query = e.target.value;
    setValue(query);
    debouncedFetchAnime(query);
  };

  useEffect(() => {
    if (isOpen) {
      setValue("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    return () => {
      debouncedFetchAnime.cancel();
    };
  }, [debouncedFetchAnime, isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown ", handleEscape);
  }, [isOpen, onClose]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      };

  const contentAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.95, opacity: 0 },
        transition: { duration: 0.2 },
      };

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        {...modalAnimation}
        className="fixed inset-0  bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
        onClick={handleClickOutside}
      >
        <motion.div
          ref={modalRef}
          {...contentAnimation}
          className="bg-[#0f0f0f] rounded-3xl overflow-hidden w-full font-outfit border border-white/[0.05] p-6 relative max-w-3xl max-h-[85vh] flex  flex-col"
          style={{ transform: "translateZ(0)" }}
        >
          <div className="flex flex-col gap-2 w-full pr-8 flex-shrink-0">
            <motion.h1
              initial={false}
              className="xl:text-3xl lg:text-xl text-lg font-bold bg-gradient-to-r from-text/90 to-transparent bg-clip-text text-transparent"
            >
              Search Anime
            </motion.h1>
            <Link
              onClick={onClose}
              to="/search"
              className="text-sm text-white/50 hover:text-primary transition-all duration-300   flex items-center gap-2 group w-fit"
            >
              <span>Advanced filters</span>
              <motion.svg
                whileHover={{ x: 4 }}
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12H20M20 12L14 6M20 12L14 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </Link>
          </div>

          <div className="relative w-full mt-4 flex-1 min-h-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 blur-2xl opacity-30 rounded-3xl" />
            <motion.div
              initial={false}
              className="bg-[#141414] border-white/[0.08] border rounded-2xl w-full h-full  relative overflow-x-hidden backdrop-blur-xs  max-h-[400px] flex-col overflow-y-auto "
              style={{ transform: "translateZ(0)" }}
            >
              <div className="py-3 border-b border-white/[0.08] flex items-center gap-3 w-full px-6 flex-shrink-0">
                <CiSearch className="text-xl min-w-[20px] text-white/50" />
                <input
                  ref={inputRef}
                  value={value}
                  onChange={handleChange}
                  className="w-full text-base text-white/90 placeholder:text-white/30 focus:placeholder:text-white/50 outline-none transition-all duration-300 border-none bg-transparent"
                  type="text"
                  placeholder="Search for your favorite anime..."
                />
              </div>

              <div className="w-full flex mb-3 overflow-y-auto  flex-col p-4 flex-1 min-h-0">
                <span className="text-xs font-medium mb-3 text-white/50 flex-shrink-0">
                  {value
                    ? `Search results for "${value}"`
                    : "Start typing to search"}
                </span>

                <motion.div
                  layout="position"
                  className="flex flex-col  gap-2 overflow-y-auto flex-1 min-h-0   custom-scrollbar"
                  style={{ transform: "translateZ(0)" }}
                >
                  {!value && !isLoading && (
                    <motion.div
                      initial={false}
                      className="flex items-center justify-center h-32"
                    >
                      <h1 className="text-sm text-white/30">
                        Type something to discover amazing anime
                      </h1>
                    </motion.div>
                  )}

                  {isLoading && (
                    <div className="flex flex-col gap-2 w-full py-2">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <motion.div
                            key={i}
                            initial={false}
                            className="w-full shrink-0 rounded-xl h-20 animate-pulse bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] border border-white/[0.08]"
                          />
                        ))}
                    </div>
                  )}

                  {!isLoading && results?.suggestions && (
                    <AnimatePresence mode="wait">
                      {results.suggestions.map((anime, i) => (
                        <motion.div
                          key={`${anime.id}-${i}`}
                          initial={
                            prefersReducedMotion ? false : { opacity: 0, y: 20 }
                          }
                          animate={
                            prefersReducedMotion ? {} : { opacity: 1, y: 0 }
                          }
                          exit={
                            prefersReducedMotion ? {} : { opacity: 0, y: -20 }
                          }
                          transition={{ delay: Math.min(i * 0.03, 0.3) }}
                          style={{ transform: "translateZ(0)" }}
                        >
                          <Link
                            onClick={onClose}
                            to={`/info/${anime.id}`}
                            className="w-full group hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#1a1a1a]/80 border-white/[0.08] border rounded-xl transition-all duration-300 cursor-pointer min-h-20 gap-3 p-3 flex items-center bg-[#141414]/50 hover:shadow-lg hover:shadow-primary/5"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="relative overflow-hidden rounded-lg"
                              style={{ transform: "translateZ(0)" }}
                            >
                              <img
                                src={anime.poster}
                                className="w-14 h-[4.5rem] object-cover"
                                alt={anime.name + " poster"}
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </motion.div>

                            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                              <h1 className="text-sm font-medium text-white/90 line-clamp-1 group-hover:text-white transition-colors duration-300">
                                {anime.name}
                              </h1>
                              <h2 className="text-xs text-white/40 line-clamp-1 font-medium">
                                {anime.jname}
                              </h2>
                              {anime?.moreInfo && (
                                <div className="flex items-center gap-2 text-white/30 text-xs flex-wrap">
                                  {anime.moreInfo
                                    .slice(0, 3)
                                    .map((info, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2"
                                      >
                                        {index > 0 && (
                                          <span className="w-1 h-1 rounded-full bg-primary/20" />
                                        )}
                                        <span className="line-clamp-1">
                                          {info}
                                        </span>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      ))}

                      {results?.suggestions?.length > 0 && (
                        <motion.div
                          initial={false}
                          style={{ transform: "translateZ(0)" }}
                          className="mt-2"
                        >
                          <Link
                            to={`/search?q=${value}`}
                            onClick={onClose}
                            className="w-full text-white/90 py-3 cursor-pointer justify-center duration-300 hover:text-primary rounded-xl items-center flex border border-white/[0.08] bg-[#141414]/50 hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#1a1a1a]/80 transition-all group hover:shadow-lg hover:shadow-primary/5"
                          >
                            <motion.span
                              className="flex items-center gap-2"
                              whileHover={{ x: 4 }}
                            >
                              See all results
                              <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4 12H20M20 12L14 6M20 12L14 18"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </motion.span>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-xl border border-white/[0.08] bg-[#141414]/50 hover:bg-[#1a1a1a] transition-all duration-300 group hover:border-primary/20"
          >
            <RxCross1 className="w-4 h-4 text-white/50 group-hover:text-white/90 transition-colors duration-300" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default SearchModal;
