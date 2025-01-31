import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { RiMenu4Fill } from "react-icons/ri";
import { useRecoilState } from "recoil";
import sidebarAtom from "../../../store/atoms/sidebarAtom.js";
import SidebarContent from "../../ui/SidebarContent.jsx";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useRecoilState(sidebarAtom);

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 mt-1 left-4 z-60 block xl:hidden p-2 rounded-lg bg-secondary/5"
      >
        {isOpen ? <IoClose size={24} /> : <RiMenu4Fill size={24} />}
      </motion.button>

      {/* Mobile Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed z-50 left-0 top-0 h-full w-[280px] block xl:hidden bg-background/95 backdrop-blur-md border-r border-white/5"
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
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 block lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 h-full w-[18%] hidden xl:block max-w-[24rem] border-r border-white/5 bg-background/95 backdrop-blur-md">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;
