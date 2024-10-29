export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const spotlightVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.6,
    },
  },
};
export const trimmedContent = (content, maxLength = 20) => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  }
};
export const cardVariants = {
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const infoVariants = {
  initial: {
    y: 300,
    opacity: 0,
  },
  hover: {
    y: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

export const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const textVariants = {
  initial: { opacity: 0, y: 20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.3,
    },
  },
};
