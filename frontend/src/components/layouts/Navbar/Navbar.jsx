import { motion } from "framer-motion";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { TbMessageCircleHeart } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import SearchModal from "../../../components/ui/SearchModal.jsx";
import { userAtom } from "../../../store/index.js";
import Dropdown from "../../ui/Dropdown.jsx";
import MainButton from "../../ui/MainButton.jsx";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const user = useRecoilValue(userAtom);
  console.log("User:", user);

  const buttons = [
    { icon: <FiUser size={16} />, title: "Profile", to: "/profile" },
    { icon: <FiSettings size={16} />, title: "Settings", to: "/settings" },
    { icon: <FiLogOut size={16} />, title: "Log Out", to: "/logout" },
  ];

  return (
    <nav className="font-poppins bg-background ml-0 flex h-20 w-[100%] items-center justify-center lg:ml-[7%] lg:w-[93%] xl:ml-[18%] xl:w-[81.5%]">
      <div className="flex w-full items-center justify-between gap-5">
        <div className="ml-6 flex items-center justify-center gap-11">
          <div className="hidden gap-3 lg:flex">
            <button className="rounded-lg p-2.5 transition-colors hover:bg-white/5 active:bg-white/10">
              <MdOutlineArrowBackIos className="text-gray-text hover:text-text text-lg transition-colors" />
            </button>
            <button className="rounded-lg p-2.5 transition-colors hover:bg-white/5 active:bg-white/10">
              <MdOutlineArrowForwardIos className="text-gray-text hover:text-text text-lg transition-colors" />
            </button>
          </div>
          <div
            onClick={() => setShowSearchModal(true)}
            className={`${
              pathname === "/search" ? "md:hidden" : "flex"
            } bg-background border-border hidden h-11 w-60 cursor-pointer items-center justify-start gap-1 overflow-hidden rounded-xl border transition-all duration-200 hover:border-white/20 md:flex md:w-64 lg:w-72`}
          >
            <div className="font-outfit flex h-full w-full items-center justify-center gap-3 px-4">
              <CiSearch className="text-gray-text/70 text-xl transition-colors" />
              <input
                className="text-gray-text placeholder:text-gray-text/70 h-full w-full border-none bg-transparent text-sm outline-none"
                type="text"
                placeholder="Search everything..."
                readOnly
              />
            </div>
          </div>
          <SearchModal
            isOpen={showSearchModal}
            onClose={() => setShowSearchModal(false)}
          />
        </div>
        <div className="mr-6 flex items-center justify-center gap-5">
          <button className="relative rounded-lg p-2.5 transition-colors hover:bg-white/5 active:bg-white/10">
            <IoNotificationsOutline
              size={21}
              className="text-gray-text hover:text-text transition-colors"
            />
            <span className="bg-primary absolute top-2 right-2 h-2 w-2 rounded-full"></span>
          </button>
          <button className="rounded-lg p-2.5 transition-colors hover:bg-white/5 active:bg-white/10">
            <TbMessageCircleHeart
              size={21}
              className="text-gray-text hover:text-text transition-colors"
            />
          </button>
          {user ? (
            <div className="avatar relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="ring-border hover:ring-primary/30 h-9 w-9 cursor-pointer rounded-full ring-1 transition-all duration-300"
              >
                <img
                  src={
                    user.profilePicture ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  className="h-full w-full rounded-full object-cover"
                  alt="Profile"
                />
              </motion.div>

              <Dropdown
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                buttons={buttons}
              />
            </div>
          ) : (
            <Link to="/auth">
              <MainButton size="md" type="ghost" title={"Sign In"} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
