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
        <div className="flex flex-col gap-1 w-full pr-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
            Search
          </h1>
          <p className="text-sm text-white/50">Discover anime by title</p>
        </div>

        <div className="bg-[#0f0f0f] border-white/[0.05] border rounded-2xl self-start w-full h-full justify-center items-start gap-2 flex flex-col shadow-lg">
          <div className="py-4 border-b border-white/[0.05] flex justify-start items-center gap-3 w-full h-full px-4">
            <CiSearch className="text-white/50 text-xl min-w-[20px]" />
            <input
              value={value}
              onChange={handleChange}
              className="w-full bg-transparent text-sm text-white/90 outline-none placeholder:text-white/30 h-full"
              type="text"
              placeholder="Search everything"
            />
          </div>

          <div className="w-full min-h-14 flex flex-col p-4">
            <span className="text-xs text-white/40 mb-2">
              Search results for {value && `"${value}"`}
            </span>

            {!value && !isLoading && (
              <div className="flex items-center justify-center h-32">
                <h1 className="text-sm text-white/30">Type something to search</h1>
              </div>
            )}

            {isLoading && (
              <div className="flex min-h-48 overflow-auto flex-col gap-3 w-full py-4 h-full justify-center items-center">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-full rounded-xl h-24 animate-pulse bg-white/[0.02] border border-white/[0.05]"
                    />
                  ))}
              </div>
            )}

            {!isLoading && results?.suggestions && (
              <div className="flex w-full gap-2 py-2 items-center max-h-[60vh] overflow-y-auto overflow-x-hidden flex-col custom-scrollbar">
                {results?.suggestions.map((anime, i) => (
                  <Link
                    onClick={() => document.getElementById(id).close()}
                    to={`/info/${anime.id}`}
                    key={`${anime.id}-${i}`}
                    className="w-full group bg-[#0f0f0f] hover:bg-[#1a1a1a] border-white/[0.05] border rounded-xl transition-all duration-300 cursor-pointer min-h-24 gap-3 p-3 flex items-center"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={anime.poster}
                        className="w-16 h-20 rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
                        alt={anime.name + " poster"}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <h1 className="text-sm font-medium text-white/90 line-clamp-1 group-hover:text-white transition-colors duration-300">
                        {anime.name}
                      </h1>
                      <h2 className="text-xs text-white/40 line-clamp-1 font-medium">
                        {anime.jname}
                      </h2>
                      {anime?.moreInfo && (
                        <div className="flex items-center gap-2 text-white/30 text-xs flex-wrap">
                          <span className="line-clamp-1">{anime?.moreInfo[0]}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                          <span className="line-clamp-1">{anime?.moreInfo[1]}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                          <span className="line-clamp-1">{anime?.moreInfo[2]}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="absolute top-4 right-4 p-2 rounded-xl border border-white/[0.05] bg-[#0f0f0f] hover:bg-[#1a1a1a] transition-colors duration-300 group">
              <RxCross1 className="w-4 h-4 text-white/50 group-hover:text-white/90 transition-colors duration-300" />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SearchModal;
