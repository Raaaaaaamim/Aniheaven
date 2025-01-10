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
import { useLocation } from "react-router-dom";
import Modal from "../../../components/ui/SearchModal.jsx";
import Dropdown from "../../ui/Dropdown.jsx";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    { icon: <FiUser size={16} />, title: "Profile", to: "/profile" },
    { icon: <FiSettings size={16} />, title: "Settings", to: "/settings" },
    { icon: <FiLogOut size={16} />, title: "Log Out", to: "/logout" },
  ];
  return (
    <nav className="flex h-20 ml-0 w-[100%] font-poppins justify-center items-center xl:w-[81.5%] lg:w-[93%] lg:ml-[7%] xl:ml-[18%] bg-background">
      <div className="w-full flex gap-5 items-center justify-between">
        <div className="ml-6 flex justify-center gap-11 items-center">
          <div className="hidden lg:flex gap-3">
            <button className="p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors">
              <MdOutlineArrowBackIos className="text-lg text-grayText hover:text-text transition-colors" />
            </button>
            <button className="p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors">
              <MdOutlineArrowForwardIos className="text-lg text-grayText hover:text-text transition-colors" />
            </button>
          </div>
          <div
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className={`${
              pathname === "/search" ? "md:hidden" : "flex"
            } overflow-hidden md:flex gap-1 bg-background justify-start hidden items-center h-11 lg:w-72 md:w-64 w-60 rounded-xl border-border border hover:border-white/20 transition-all duration-200 cursor-pointer`}
          >
            <div className="font-outfit flex justify-center items-center gap-3 w-full h-full px-4">
              <CiSearch className="text-grayText text-xl transition-colors" />
              <input
                className="w-full bg-transparent text-sm text-grayText outline-none placeholder:text-grayText/70 h-full"
                type="text"
                placeholder="Search everything..."
                readOnly
              />
            </div>
          </div>
          <Modal id="my_modal_1" />
        </div>
        <div className="mr-6 flex justify-center items-center gap-5">
          <button className="relative p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors">
            <IoNotificationsOutline
              size={21}
              className="text-grayText hover:text-text transition-colors"
            />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <button className="p-2.5 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors">
            <TbMessageCircleHeart
              size={21}
              className="text-grayText hover:text-text transition-colors"
            />
          </button>
          <div className="avatar relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 rounded-full ring-1 ring-border hover:ring-primary/30 transition-all duration-300 cursor-pointer"
            >
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="object-cover rounded-full"
                alt="Profile"
              />
            </motion.div>

            <Dropdown isOpen={isOpen} setIsOpen={setIsOpen} buttons={buttons} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
