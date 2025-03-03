import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const Tooltip = ({
  children,
  content,
  position = "top",
  delay = 0.2,
  offset = 8,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const targetRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isVisible && targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let x = 0;
      let y = 0;

      switch (position) {
        case "top":
          x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          y = targetRect.top - tooltipRect.height - offset;
          break;
        case "bottom":
          x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
          y = targetRect.bottom + offset;
          break;
        case "left":
          x = targetRect.left - tooltipRect.width - offset;
          y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
        case "right":
          x = targetRect.right + offset;
          y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
          break;
      }

      setCoords({ x, y });
    }
  }, [isVisible, position, offset]);

  const variants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
    },
  };

  return (
    <div className="relative inline-block">
      <div
        ref={targetRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: coords.x,
              top: coords.y,
              pointerEvents: "none",
              zIndex: 50,
            }}
            className={`rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg dark:bg-white dark:text-gray-900 ${className} `}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  delay: PropTypes.number,
  offset: PropTypes.number,
  className: PropTypes.string,
};

export default Tooltip;
