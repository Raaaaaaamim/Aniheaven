import { FaRegHeart } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import img1 from "../../assets/aniheaven.png";
import Button from "./Button.jsx";
import Category from "./Category.jsx";

const SidebarContent = () => (
  <div className="gap-0 flex font-outfit flex-col h-full w-[90%]  ml-[20px]  py-8">
    <div className="h-[10%] w-full flex gap-2 items-center justify-start">
      <img className=" w-14 xl:w-40 2xl:w-44 lg:w-16 " src={img1} alt="logo" />
    </div>

    <div className="mt-10 h-[30%] w-full gap-3 flex flex-col">
      <h1 className="ml-3 text-sm text-grayText lg:hidden flex xl:flex font-bold">
        Options
      </h1>
      <div className="self-start center">
        <Link to="/">
          <Button Icon={FiHome}>Home</Button>
        </Link>
      </div>
      <div className="self-start center">
        <Button Icon={FaRegHeart}>Watchlist</Button>
      </div>
      <div className="self-start center">
        <Button Icon={IoSettingsOutline}>Settings</Button>
      </div>
    </div>

    <div className="ml-2 divider w-[70%]"></div>

    <div className="max-h-[600px] h-[50%]">
      <h1 className="ml-3 text-sm lg:hidden flex xl:flex text-grayText font-bold">
        Categories
      </h1>
      <div className="categories-scroll overflow-hidden w-full mt-6 ml-2 h-[170px] 2xl:h-[270px] flex flex-col gap-4">
        <Category
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtF6Ss58jVTGqlLOPMZ8cmfw4RuFgJwjRryA&s"
          title="Romance"
        />
        <Category
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjimXyPUaa0CQfeAZWDdjewuzfMnQm8FduBw&s"
          title="Horror"
        />
        <Category
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_2utOf_WvlXWB3fg3cVAe4Hi192FDfXbGgA&s"
          title="Comedy"
        />
        <Category
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOdGWweyTa1ymOFqA9GcOjvj-eg94fu2C0w&s"
          title="Drama"
        />
        <Category
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOdGWweyTa1ymOFqA9GcOjvj-eg94fu2C0w&s"
          title="Drama"
        />
        <Category
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEOdGWweyTa1ymOFqA9GcOjvj-eg94fu2C0w&s"
          title="Drama"
        />
      </div>
      <div className="ml-1 divider w-[70%]"></div>
    </div>

    <div className="self-start h-[10%] md:mb-0 mb-[40%]">
      <Button Icon={MdLogout}>Logout</Button>
    </div>
  </div>
);
export default SidebarContent;
