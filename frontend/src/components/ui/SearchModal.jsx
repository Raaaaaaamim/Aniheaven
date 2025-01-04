import axios from "axios";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

const SearchModal = ({ id }) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    }, 500),
    []
  );

  const handleChange = (e) => {
    const query = e.target.value;
    setValue(query);
    debouncedFetchAnime(query);
  };

  useEffect(() => {
    return () => {
      debouncedFetchAnime.cancel();
    };
  }, [debouncedFetchAnime]);

  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-[#0f0f0f] rounded-3xl overflow-hidden gap-4 flex max-w-3xl font-outfit justify-center items-start flex-col border border-white/[0.05] p-6">
        <div className="flex flex-col gap-2 w-full pr-8">
          <h1 className="xl:text-3xl lg:text-2xl text-xl  font-bold bg-gradient-to-r from-text/90  to-transparent bg-clip-text text-transparent">
            Search Anime
          </h1>
          <Link
            onClick={() => document.getElementById(id).close()}
            to="/search"
            className="text-sm text-white/50 hover:text-primary transition-all duration-300 flex items-center gap-2 group w-fit"
          >
            <span>Advanced filters</span>
            <svg
              className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
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
          </Link>
        </div>

        <div className="relative  w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 blur-2xl opacity-30 rounded-3xl" />
          <div className="bg-[#141414] border-white/[0.08] border rounded-2xl self-start w-full h-full justify-center items-start gap-2 flex flex-col shadow-xl xl:max-h-[400px] 2xl:max-h-[600px] max-h-[350px] lg:max-h-[350px]  relative overflow-hidden backdrop-blur-sm">
            <div className="py-4 border-b border-white/[0.08] flex justify-start items-center gap-3 w-full h-full px-6 group">
              <CiSearch className="text-primary text-xl min-w-[20px] transition-colors duration-300" />
              <input
                autoFocus
                value={value}
                onChange={handleChange}
                className="w-full bg-transparent text-base text-white/90 outline-none placeholder:text-white/30 h-full focus:placeholder:text-primary/50 transition-all duration-300"
                type="text"
                placeholder="Search for your favorite anime..."
              />
            </div>

            <div className="w-full min-h-14 flex flex-col p-6">
              <span className="text-xs font-medium mb-4 bg-gradient-to-r from-text/90 to-transparent bg-clip-text text-transparent">
                {value
                  ? `Search results for "${value}"`
                  : "Start typing to search"}
              </span>

              {!value && !isLoading && (
                <div className="flex items-center justify-center h-32">
                  <h1 className="text-sm text-white/30">
                    Type something to discover amazing anime
                  </h1>
                </div>
              )}

              {isLoading && (
                <div className="flex min-h-48 overflow-auto flex-col gap-3 w-full py-4 h-full justify-center  items-center">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-full flex-shrink-0 rounded-xl h-24 animate-pulse bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] border border-white/[0.08]"
                      />
                    ))}
                </div>
              )}

              {!isLoading && results?.suggestions && (
                <div className="flex w-full gap-2 py-2 items-center max-h-[400px] overflow-y-auto overflow-x-hidden flex-col custom-scrollbar">
                  {results?.suggestions.map((anime, i) => (
                    <Link
                      onClick={() => document.getElementById(id).close()}
                      to={`/info/${anime.id}`}
                      key={`${anime.id}-${i}`}
                      className="w-full group hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#1a1a1a]/80 border-white/[0.08] border rounded-xl transition-all duration-300 cursor-pointer min-h-24 gap-4 p-4 flex items-center bg-[#141414]/50 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="relative overflow-hidden rounded-lg group-hover:shadow-lg transition-all duration-300">
                        <img
                          src={anime.poster}
                          className="w-16 h-20 object-cover transition-all duration-500 group-hover:scale-110"
                          alt={anime.name + " poster"}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>

                      <div className="flex flex-col gap-2 flex-1 min-w-0">
                        <h1 className="text-sm font-medium text-white/90 line-clamp-1 group-hover:text-white transition-colors duration-300">
                          {anime.name}
                        </h1>
                        <h2 className="text-xs text-white/40 line-clamp-1 font-medium">
                          {anime.jname}
                        </h2>
                        {anime?.moreInfo && (
                          <div className="flex items-center gap-2 text-white/30 text-xs flex-wrap">
                            {anime.moreInfo.slice(0, 3).map((info, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                {index > 0 && (
                                  <span className="w-1 h-1 rounded-full bg-primary/20" />
                                )}
                                <span className="line-clamp-1">{info}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                  {results?.suggestions?.length > 0 && (
                    <Link
                      to={`/search?q=${value}`}
                      onClick={() => document.getElementById(id).close()}
                      className="w-full mt-2 py-4 cursor-pointer justify-center duration-300 hover:text-primary rounded-xl items-center flex border border-white/[0.08] bg-[#141414]/50 hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#1a1a1a]/80 transition-all group hover:shadow-lg hover:shadow-primary/5"
                    >
                      <span className="flex items-center gap-2">
                        See all results
                        <svg
                          className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
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
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="absolute top-6 right-6 p-2.5 rounded-xl border border-white/[0.08] bg-[#141414]/50 hover:bg-[#1a1a1a] transition-all duration-300 group hover:border-primary/20">
              <RxCross1 className="w-4 h-4 text-white/50 group-hover:text-white/90 transition-colors duration-300" />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SearchModal;
