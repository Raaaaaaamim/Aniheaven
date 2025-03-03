import { motion } from "framer-motion";

const Loader = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-32 h-12",
    md: "w-48 h-16",
    lg: "w-64 h-20",
  };

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0,
      },
    },
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 800 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* A - Sharp like eagle's beak */}
        <motion.path
          d="M50 90L90 10L130 90M60 55H120"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* n - Strong vertical stance */}
        <motion.path
          d="M160 90V30L200 30V90"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* i - Bold and commanding */}
        <motion.path
          d="M230 90V30M230 15V10"
          stroke="var(--color-primary)"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* h - Strong horizontals */}
        <motion.path
          d="M260 90V10M260 30L300 30V90"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* e - Sharp edges */}
        <motion.path
          d="M330 60H370M330 30H370M330 90H370M330 30V90"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* a - Strong structure */}
        <motion.path
          d="M400 90V30H440V90M400 60H440"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* v - Sharp like wings */}
        <motion.path
          d="M470 30L500 90L530 30"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* e - Sharp edges */}
        <motion.path
          d="M560 60H600M560 30H600M560 90H600M560 30V90"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* n - Strong vertical stance */}
        <motion.path
          d="M630 90V30L670 30V90"
          stroke="white"
          strokeWidth="12"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>
    </div>
  );
};

export default Loader;
