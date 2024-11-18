import axios from "axios";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
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
      <div className="modal-box rounded-xl overflow-hidden bg-background gap-4 flex max-w-2xl font-poppins justify-center items-start flex-col">
        <div className=" flex flex-col gap-1  ">
          <h1 className="text-2xl font-bold">Search</h1>
          <p className="text-sm">Discover anime by title</p>
        </div>
        <div className="bg-black border-border border-[1px] rounded-lg self-start w-full h-full justify-center items-start gap-2 flex flex-col">
          <div className="py-3 border-b-border border-b-[1px] flex justify-start items-center gap-1 w-full h-full">
            <CiSearch className="ml-2 text-grayText lg:text-[20px] text-[18px]" />
            <input
              value={value}
              onChange={handleChange}
              className="w-[80%] bg-transparent text-xs md:text-sm text-text outline-none placeholder:text-grayText h-full"
              type="text"
              placeholder="Search everything"
            />
          </div>
          <div className="w-full min-h-14 flex flex-col">
            <span className="text-xs ml-2 text-grayText">
              Search results for {value && `"${value}"`}
            </span>
            {!value && !isLoading && (
              <h1 className="text-sm ml-2 mt-1">Type something to search</h1>
            )}
            {isLoading && (
              <div className="flex min-h-48 overflow-auto flex-col gap-3 w-full mb-4 mt-4 h-full justify-center items-center">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="w-[95%] rounded-lg h-[6.1rem] animate-pulse skeleton"
                    ></span>
                  ))}
              </div>
            )}
            {!isLoading && results?.suggestions && (
              <div className="flex w-full gap-3  mb-3  mt-2 items-center h-80 overflow-auto flex-col">
                {results?.suggestions.map((anime, i) => (
                  <div
                    key={`${anime.id}-${i}`}
                    className={`w-[95%] ${
                      i === 0 && "mt-2"
                    } text-text hover:bg-[#0c0c0c] border-border border-[1px]   hover:ease-in-out hover:duration-200 cursor-pointer rounded-lg min-h-24 gap-3 py-2 flex  items-center`}
                  >
                    <img
                      src={anime.poster}
                      className="w-16 h-20 ml-2  rounded-lg"
                      alt={anime.name + " poster"}
                    />
                    <div className="flex w-[80%]  flex-col gap-1">
                      <h1 className="text-sm  line-clamp-1 font-semibold">
                        {anime.name}
                      </h1>
                      <h1 className="text-xs  line-clamp-1 text-grayText font-semibold">
                        {anime.jname}
                      </h1>
                      {anime?.moreInfo && (
                        <div className=" gap-1 text-gray-500  flex justify-start items-center ">
                          <span className="text-xs text-grayText ">
                            {anime?.moreInfo[0]}
                          </span>
                          •
                          <span className="text-xs text-grayText ">
                            {anime?.moreInfo[1]}
                          </span>
                          •
                          <span className="text-xs text-grayText ">
                            {anime?.moreInfo[2]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="p-[6px] rounded-full border-border border-[1px] flex justify-center items-center absolute top-5 right-5">
              <RxCross1 size={12} />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SearchModal;
