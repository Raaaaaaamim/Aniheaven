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
          className="absolute right-0 top-12 w-52 bg-[#0f0f0f] backdrop-blur-md border border-white/[0.05] rounded-xl overflow-hidden z-50  "
        >
          <div className="p-2 flex flex-col gap-1">
            {/* Regular menu items */}
            {buttons.slice(0, -1).map((button, index) => (
              <Link to={button.to} key={index}>
                <div className="flex items-center gap-3 p-2 text-sm text-text/80 hover:text-primary rounded-lg hover:bg-white/[0.05] transition-colors">
                  {button.icon}
                  {button.title}
                </div>
              </Link>
            ))}

            {/* Divider */}
            <div className="h-[1px] bg-white/[0.05] my-1"></div>

            {/* Last item (usually logout) */}
            {buttons.length > 0 && logOutExists && (
              <Link to={buttons[buttons.length - 1].to}>
                <div className="flex items-center gap-3 p-2 text-sm text-red-500/80 hover:text-red-500 rounded-lg hover:bg-white/[0.05]   transition-colors">
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
