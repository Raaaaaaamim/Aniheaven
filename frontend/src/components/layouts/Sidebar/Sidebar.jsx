import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiMenu4Fill } from "react-icons/ri";
import SidebarContent from "../../ui/SidebarContent.jsx";
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
        className="fixed top-4 mt-1 left-4 z-[60] block lg:hidden p-2 rounded-lg"
      >
        {isOpen ? <IoClose size={24} /> : <RiMenu4Fill size={24} />}
      </motion.button>

      {/* Mobile Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed z-50 left-0 top-0 h-full w-[280px] block lg:hidden bg-background border-r rounded-r-3xl border-[#262626]"
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
      <div className="fixed left-0 rounded-r-3xl top-0 h-full w-[18%] hidden lg:flex lg:w-[7%] max-w-[24rem] justify-center items-center xl:w-[18%] border-r border-border">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
