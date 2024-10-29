import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";
import img1 from "../assets/logo.png";
import Button from "./ui/Button.jsx";
import Category from "./ui/Category.jsx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 mt-1 left-4 z-50 block lg:hidden p-2 rounded-lg"
      >
        {isOpen ? <IoClose size={24} /> : <RiMenu4Fill size={24} />}
      </motion.button>

      {/* Mobile Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed z-50 left-0 top-0 h-full w-[280px] block lg:hidden bg-gray-950 border-r rounded-r-3xl border-[#262626]"
      >
        <SidebarContent />
      </motion.div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 block lg:hidden"
          />
        )}
      </AnimatePresence>
      {/* Desktop Sidebar */}
      <div className="fixed left-0 rounded-r-3xl  top-0 h-full w-[18%] hidden lg:block border-r border-border">
        <SidebarContent />
      </div>
    </>
  );
};

// Separate component for sidebar content to avoid duplication
const SidebarContent = () => (
  <div className="gap-0 2xl:gap-[5%] flex flex-col h-full w-[90%] ml-[20px] py-8">
    <div className="flex-2 w-full flex items-center justify-start">
      <img className="w-14" src={img1} alt="logo" />
    </div>

    <div className="mt-10 flex-3 w-full gap-3 flex flex-col">
      <h1 className="ml-3 text-sm text-grayText font-bold">Options</h1>
      <div className="self-start center">
        <Button Icon={FiHome}>Home</Button>
      </div>
      <div className="self-start center">
        <Button Icon={FaRegHeart}>Watchlist</Button>
      </div>
      <div className="self-start center">
        <Button Icon={IoSettingsOutline}>Settings</Button>
      </div>
    </div>

    <div className="ml-2 divider w-[70%]"></div>

    <div className="flex-5">
      <h1 className="ml-3 text-sm text-grayText font-bold">Categories</h1>
      <div className="overflow-auto w-full mt-6 ml-2 h-[170px] flex flex-col gap-4">
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
      </div>
      <div className="ml-1 divider w-[70%]"></div>
    </div>

    <div className="self-start flex-2">
      <Button Icon={MdLogout}>Logout</Button>
    </div>
  </div>
);

export default Sidebar;
