import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const SearchModal = ({ isOpen, onClose }) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
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
          `/hianime/search/suggestion?q=${query}`,
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
    [],
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
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/60 p-4 backdrop-blur-sm"
        onClick={handleClickOutside}
      >
        <motion.div
          ref={modalRef}
          {...contentAnimation}
          className="font-outfit relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/[0.05] bg-[#0f0f0f] p-6"
          style={{ transform: "translateZ(0)" }}
        >
          <div className="flex w-full flex-shrink-0 flex-col gap-2 pr-8">
            <motion.h1
              initial={false}
              className="from-text/90 bg-gradient-to-r to-transparent bg-clip-text text-lg font-bold text-transparent lg:text-xl xl:text-3xl"
            >
              Search Anime
            </motion.h1>
            <Link
              onClick={onClose}
              to="/search"
              className="hover:text-primary group flex w-fit items-center gap-2 text-sm text-white/50 transition-all duration-300"
            >
              <span>Advanced filters</span>
              <motion.svg
                whileHover={{ x: 4 }}
                className="h-4 w-4"
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

          <div className="relative mt-4 min-h-0 w-full flex-1">
            <div className="from-primary/10 via-accent/5 to-primary/10 absolute inset-0 rounded-3xl bg-gradient-to-r opacity-30 blur-2xl" />
            <motion.div
              initial={false}
              className="relative h-full max-h-[400px] w-full flex-col overflow-x-hidden overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#141414] backdrop-blur-xs"
              style={{ transform: "translateZ(0)" }}
            >
              <div className="flex w-full flex-shrink-0 items-center gap-3 border-b border-white/[0.08] px-6 py-3">
                <CiSearch className="min-w-[20px] text-xl text-white/50" />
                <input
                  ref={inputRef}
                  value={value}
                  onChange={handleChange}
                  className="w-full border-none bg-transparent text-base text-white/90 transition-all duration-300 outline-none placeholder:text-white/30 focus:placeholder:text-white/50"
                  type="text"
                  placeholder="Search for your favorite anime..."
                />
              </div>

              <div className="mb-3 flex min-h-0 w-full flex-1 flex-col overflow-y-auto p-4">
                <span className="mb-3 flex-shrink-0 text-xs font-medium text-white/50">
                  {value
                    ? `Search results for "${value}"`
                    : "Start typing to search"}
                </span>

                <motion.div
                  layout="position"
                  className="custom-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto"
                  style={{ transform: "translateZ(0)" }}
                >
                  {!value && !isLoading && (
                    <motion.div
                      initial={false}
                      className="flex h-32 items-center justify-center"
                    >
                      <h1 className="text-sm text-white/30">
                        Type something to discover amazing anime
                      </h1>
                    </motion.div>
                  )}

                  {isLoading && (
                    <div className="flex w-full flex-col gap-2 py-2">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <motion.div
                            key={i}
                            initial={false}
                            className="h-20 w-full shrink-0 animate-pulse rounded-xl border border-white/[0.08] bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02]"
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
                            className="group hover:shadow-primary/5 flex min-h-20 w-full cursor-pointer items-center gap-3 rounded-xl border border-white/[0.08] bg-[#141414]/50 p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#1a1a1a]/80 hover:shadow-lg"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="relative overflow-hidden rounded-lg"
                              style={{ transform: "translateZ(0)" }}
                            >
                              <img
                                src={anime.poster}
                                className="h-[4.5rem] w-14 object-cover"
                                alt={anime.name + " poster"}
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />
                            </motion.div>

                            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                              <h1 className="line-clamp-1 text-sm font-medium text-white/90 transition-colors duration-300 group-hover:text-white">
                                {anime.name}
                              </h1>
                              <h2 className="line-clamp-1 text-xs font-medium text-white/40">
                                {anime.jname}
                              </h2>
                              {anime?.moreInfo && (
                                <div className="flex flex-wrap items-center gap-2 text-xs text-white/30">
                                  {anime.moreInfo
                                    .slice(0, 3)
                                    .map((info, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2"
                                      >
                                        {index > 0 && (
                                          <span className="bg-primary/20 h-1 w-1 rounded-full" />
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
                            className="hover:text-primary group hover:shadow-primary/5 flex w-full cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] bg-[#141414]/50 py-3 text-white/90 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#1a1a1a]/80 hover:shadow-lg"
                          >
                            <motion.span
                              className="flex items-center gap-2"
                              whileHover={{ x: 4 }}
                            >
                              See all results
                              <svg
                                className="h-5 w-5"
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
            className="group hover:border-primary/20 absolute top-6 right-6 rounded-xl border border-white/[0.08] bg-[#141414]/50 p-2.5 transition-all duration-300 hover:bg-[#1a1a1a]"
          >
            <RxCross1 className="h-4 w-4 text-white/50 transition-colors duration-300 group-hover:text-white/90" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

export default SearchModal;
