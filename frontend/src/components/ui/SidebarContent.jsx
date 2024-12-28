import { FaRegHeart } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { genres } from "../../../lib/utils.js";
import logo from "../../assets/aniheaven.svg";
import img1 from "../../assets/textLogo.svg";

import Button from "./Button.jsx";
import Category from "./Category.jsx";

const SidebarContent = () => (
  <div className="gap-0 flex font-outfit flex-col h-full w-[90%]  ml-[20px]  py-8">
    <div className="h-[10%] w-full flex gap-2 items-center justify-start">
      <Link to="/">
        <img
          className=" sm:flex w-48 mt-10 lg:mt-0 xl:flex lg:hidden xl:w-48 2xl:w-56  "
          src={img1}
          alt="logo"
        />
        <img
          className=" sm:hidden hidden  lg:flex xl:hidden w-10  "
          src={logo}
          alt="logo"
        />
      </Link>
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
        {Object.entries(genres).map(([key, value], i) => (
          <Category key={i} src={value} title={key} />
        ))}
      </div>
      <div className="ml-1 divider w-[70%]"></div>
    </div>

    <div className="self-start h-[10%] md:mb-0 mb-[40%]">
      <Button Icon={MdLogout}>Logout</Button>
    </div>
  </div>
);
export default SidebarContent;
