import { FaRegHeart } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout, MdOutlineVideoLabel } from "react-icons/md";
import { RiCalendarScheduleLine, RiListOrdered2 } from "react-icons/ri";
import { Link } from "react-router-dom";
import img1 from "../../assets/textLogo.svg";

import { useSetRecoilState } from "recoil";
import sidebarAtom from "../../store/atoms/sidebarAtom.js";
import Button from "./Button.jsx";

const SidebarContent = () => {
  const setOpen = useSetRecoilState(sidebarAtom);
  return (
    <div className="gap-0 flex font-outfit flex-col h-full w-full    py-8">
      <div className=" flex flex-col  justify-center ">
        <div className="flex-[2]  w-full ml-4 flex gap-2 items-center justify-start">
          <Link to="/home">
            <img
              className="  w-48 mt-10 xl:mt-0  xl:w-48 2xl:w-56  "
              src={img1}
              alt="logo"
            />
          </Link>
        </div>

        <div className="mt-10 flex-[6] ml-4 w-full gap-3 flex flex-col">
          <h1 className="ml-3 text-sm text-grayText lg:hidden flex xl:flex font-bold">
            Options
          </h1>
          <div onClick={() => setOpen(false)} className="self-start center">
            <Link onClick={() => setOpen(false)} to="/home">
              <Button Icon={FiHome}>Home</Button>
            </Link>
          </div>
          <div onClick={() => setOpen(false)} className="self-start center">
            <Button Icon={FaRegHeart}>Watchlist</Button>
          </div>
          <div onClick={() => setOpen(false)} className="self-start center">
            <Button Icon={IoSettingsOutline}>Settings</Button>
          </div>
        </div>

        <div className=" ml-6 divider w-[70%]"></div>

        <div className=" flex-[6] ml-4 gap-3 flex flex-col">
          <h1 className="ml-3 text-sm text-grayText lg:hidden flex xl:flex font-bold">
            Extras
          </h1>
          <div onClick={() => setOpen(false)} className="self-start center">
            <Link to="/category?name=movie">
              <Button Icon={MdOutlineVideoLabel}>Movies</Button>
            </Link>
          </div>
          <div onClick={() => setOpen(false)} className="self-start center">
            <Link to="/schedules">
              <Button Icon={RiCalendarScheduleLine}>Schedules</Button>
            </Link>
          </div>
          <div onClick={() => setOpen(false)} className="self-start center">
            <Link to="/az">
              <Button Icon={RiListOrdered2}>AZ List</Button>
            </Link>
          </div>
        </div>

        <div
          onClick={() => setOpen(false)}
          className="self-start absolute bottom-5 left-5 flex-[2] md:mb-0 mb-[40%]"
        >
          <Button Icon={MdLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};
export default SidebarContent;
