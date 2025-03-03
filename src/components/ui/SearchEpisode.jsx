import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchEpisode = ({ searchEpisode, setSearchEpisode }) => {
  return (
    <div className=" text-xs lg:text-sm  lg:w-fit  gap-2 flex justify-center items-center  ">
      <div className=" cursor-pointer  flex justify-center items-center bg-white/[0.02] hover:bg-white/[0.04] text-text/90 border border-white/[0.05] rounded-md p-2 ">
        <CiSearch className=" text-[0.90rem] lg:text-[1.2rem] " />
      </div>
      <input
        onChange={(e) => setSearchEpisode(Number(e.target.value) || "")}
        value={searchEpisode}
        placeholder="Search Episode"
        type="search"
        className=" self-center w-36   bg-transparent outline-hidden rounded-md border lg:text-sm text-xs placeholder:text-xs lg:placeholder:text-sm px-2 lg:w-48 mr-4 py-2 placeholder:text-grayText border-white/[0.05] text-text/90  "
      />
    </div>
  );
};

export default SearchEpisode;
