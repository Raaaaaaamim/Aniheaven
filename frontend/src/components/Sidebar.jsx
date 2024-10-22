import { FaRegHeart } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import img1 from "../assets/logo.png";
import Button from "./ui/Button.jsx";
import Category from "./ui/Category.jsx";

const Sidebar = () => {
  return (
    <div className=" fixed left-0  top-0 h-[100vh] w-[250px] border-border border-[1px]  ">
      <div className=" gap-0 flex flex-col h-full w-[220px] ml-[20px] ">
        <div className=" flex-2 w-full  flex items-center justify-start  mt-8  ">
          <img className="w-14" src={img1} alt="logo" />
        </div>
        <div className=" mt-10  flex-3 w-full gap-3 flex flex-col ">
          <h1 className=" ml-3 text-sm text-grayText font-bold ">Options</h1>
          <div className=" self-start  center ">
            <Button Icon={FiHome}>Home</Button>
          </div>
          <div className=" self-start center ">
            <Button Icon={FaRegHeart}>Watchlist</Button>
          </div>
          <div className=" self-start center ">
            <Button Icon={IoSettingsOutline}>Settings</Button>
          </div>
        </div>
        <div className=" ml-2 divider w-[70%] "></div>
        <div className=" flex-5 ">
          <h1 className=" ml-3 text-sm text-grayText font-bold ">Categories</h1>
          <div className=" overflow-auto w-full mt-6 ml-2 h-[170px] flex flex-col gap-4 ">
            <Category
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtF6Ss58jVTGqlLOPMZ8cmfw4RuFgJwjRryA&s"
              }
              title={"Romance"}
            />
            <Category
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjimXyPUaa0CQfeAZWDdjewuzfMnQm8FduBw&s"
              }
              title={"Horror"}
            />
            <Category
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_2utOf_WvlXWB3fg3cVAe4Hi192FDfXbGgA&s"
              }
              title={"Comedy"}
            />
            <Category
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOdGWweyTa1ymOFqA9GcOjvj-eg94fu2C0w&s"
              }
              title={"Drama"}
            />
          </div>
          <div className=" ml-1 divider w-[70%] "></div>
        </div>
        <div className=" self-start flex-2 ">
          <Button Icon={MdLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
