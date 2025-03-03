import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Dropdown = ({ isOpen, setIsOpen, buttons, logOutExists = true }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-12 right-0 z-50 w-52 overflow-hidden rounded-xl border border-white/[0.05] bg-[#0f0f0f] backdrop-blur-md"
        >
          <div className="flex flex-col gap-1 p-2">
            {/* Regular menu items */}
            {buttons.slice(0, -1).map((button, index) => (
              <Link to={button.to} key={index} onClick={() => setIsOpen(false)}>
                <div className="text-text/80 hover:text-primary flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-white/[0.05]">
                  {button.icon}
                  {button.title}
                </div>
              </Link>
            ))}

            {/* Divider */}
            <div className="my-1 h-[1px] bg-white/[0.05]"></div>

            {/* Last item (usually logout) */}
            {buttons.length > 0 && logOutExists && (
              <Link to={buttons[buttons.length - 1].to}>
                <div className="flex items-center gap-3 rounded-lg p-2 text-sm text-red-500/80 transition-colors hover:bg-white/[0.05] hover:text-red-500">
                  {buttons[buttons.length - 1].icon}
                  {buttons[buttons.length - 1].title}
                </div>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
