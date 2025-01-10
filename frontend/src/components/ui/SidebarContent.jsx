import { FaRegHeart } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout, MdOutlineCategory } from "react-icons/md";
import { RiCalendarScheduleLine, RiListOrdered2 } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import img1 from "../../assets/textLogo.svg";
import sidebarAtom from "../../store/atoms/sidebarAtom.js";
import Button from "./Button.jsx";

const SidebarContent = () => {
  const setOpen = useSetRecoilState(sidebarAtom);

  return (
    <div className="flex flex-col h-full w-full font-outfit">
      {/* Logo Section */}
      <div className="px-6 pt-8 pb-4">
        <Link to="/home" className="block w-fit" onClick={() => setOpen(false)}>
          <img className="w-40 xl:w-44 2xl:w-48" src={img1} alt="logo" />
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6 space-y-6 overflow-y-auto scrollbar-none">
        {/* Options Section */}
        <div className="space-y-1">
          <h3 className="px-4 mb-2 text-sm font-semibold text-text/50">
            Options
          </h3>
          <Link to="/home" onClick={() => setOpen(false)}>
            <Button Icon={FiHome}>Home</Button>
          </Link>
          <div onClick={() => setOpen(false)}>
            <Button Icon={FaRegHeart}>Watchlist</Button>
          </div>
          <div onClick={() => setOpen(false)}>
            <Button Icon={IoSettingsOutline}>Settings</Button>
          </div>
        </div>

        {/* Extras Section */}
        <div className="space-y-1">
          <h3 className="px-4 mb-2 text-sm font-semibold text-text/50">
            Extras
          </h3>
          <Link to="/category?name=movie" onClick={() => setOpen(false)}>
            <Button Icon={MdOutlineCategory}>Categories</Button>
          </Link>
          <Link to="/schedules" onClick={() => setOpen(false)}>
            <Button Icon={RiCalendarScheduleLine}>Schedules</Button>
          </Link>
          <Link to="/az" onClick={() => setOpen(false)}>
            <Button Icon={RiListOrdered2}>AZ List</Button>
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-3 pb-6">
        <div onClick={() => setOpen(false)}>
          <Button Icon={MdLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
