"use client";

import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { cn } from "../../lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  imageUrl,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
        rotate: rotate - 5,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.5 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-[60px]",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border border-white/5",
            "after:absolute after:inset-0 after:rounded-[60px]",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]",
            "overflow-hidden backdrop-blur-sm",
            "before:absolute before:inset-0 before:rounded-[60px]",
            "before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)]",
            "before:animate-spotlight",
          )}
        >
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: delay + 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={imageUrl}
                alt=""
                className="h-full w-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Moving reflection overlay */}
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.15) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              />

              {/* Glass reflection effect */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"
                style={{
                  mixBlendMode: "overlay",
                }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

ElegantShape.propTypes = {
  className: PropTypes.string,
  delay: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  rotate: PropTypes.number,
  gradient: PropTypes.string,
  imageUrl: PropTypes.string,
};

function VerticalLine({ left, delay = 0, className }) {
  return (
    <div
      className={cn("absolute top-0 h-full w-px", className)}
      style={{ left }}
    >
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{
          duration: 1.5,
          delay,
          ease: [0.23, 0.86, 0.39, 0.96],
        }}
        className="via-primary/20 h-full w-full origin-top bg-gradient-to-b from-transparent to-transparent"
      />
    </div>
  );
}

VerticalLine.propTypes = {
  left: PropTypes.string.isRequired,
  delay: PropTypes.number,
  className: PropTypes.string,
};

function HeroGeometric() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />

      {/* Primary Gradient Layer */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--color-primary-rgb),0.03),transparent_70%)]" />
      </div>

      {/* Vertical Lines */}
      <div className="absolute inset-0 hidden sm:block">
        <VerticalLine left="10%" delay={0.2} />
        <VerticalLine left="20%" delay={0.3} />
        <VerticalLine left="30%" delay={0.4} />
        <VerticalLine left="40%" delay={0.5} />
        <VerticalLine left="50%" delay={0.6} />
        <VerticalLine left="60%" delay={0.7} />
        <VerticalLine left="70%" delay={0.8} />
        <VerticalLine left="80%" delay={0.9} />
        <VerticalLine left="90%" delay={1.0} />
      </div>

      {/* Dense Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Subtle Diagonal Lines */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgb(255 255 255 / 0.05),
            rgb(255 255 255 / 0.05) 1px,
            transparent 1px,
            transparent 30px
          )`,
        }}
      />

      {/* Elegant Shapes */}
      <ElegantShape
        delay={0.3}
        width={400}
        height={120}
        imageUrl={
          "https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/02/naruto-lionsgate.jpg"
        }
        rotate={8}
        gradient="from-primary/[0.02]"
        className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
      />

      <ElegantShape
        delay={0.5}
        imageUrl={
          "https://www.premiumbeat.com/blog/wp-content/uploads/2021/02/Your-Name-Cover1.jpg?w=875&h=490&crop=1"
        }
        width={300}
        height={100}
        rotate={-12}
        gradient="from-primary/[0.02]"
        className="top-[60%] right-[-10%] md:top-[65%] md:right-[-5%]"
      />

      <ElegantShape
        delay={0.4}
        width={250}
        height={80}
        imageUrl={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSadaA5Iz7TeMSAvhbXloJ0PdHROqXb4hQKCA&s"
        }
        rotate={-5}
        gradient="from-primary/[0.02]"
        className="bottom-[10%] left-[5%] md:bottom-[15%] md:left-[10%]"
      />

      <ElegantShape
        delay={0.6}
        width={240}
        height={70}
        rotate={15}
        imageUrl={
          "https://i0.wp.com/www.craiglotter.co.za/wp-content/uploads/2012/02/naruto-the-movie-ninja-clash-in-the-land-of-snow-screenshot-1.jpg?ssl=1"
        }
        gradient="from-primary/[0.02]"
        className="top-[30%] right-[10%] md:top-[35%] md:right-[15%]"
      />

      <ElegantShape
        delay={0.7}
        width={150}
        height={40}
        rotate={-20}
        imageUrl={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1TtInae7CantUt5rqPp7rjaFTsb8p9YY_pQ&s"
        }
        gradient="from-primary/[0.02]"
        className="top-[80%] left-[20%] md:top-[85%] md:left-[25%]"
      />
      <ElegantShape
        delay={0.7}
        width={300}
        height={70}
        rotate={-20}
        imageUrl={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1TtInae7CantUt5rqPp7rjaFTsb8p9YY_pQ&s"
        }
        gradient="from-primary/[0.02]"
        className="top-[50%] left-[5%] md:top-[55%] md:left-[10%]"
      />

      {/* Overlay Gradient */}
      <div className="from-background to-background/90 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent" />
    </div>
  );
}

const styles = `
@keyframes spotlight {
  0% {
    transform: translateX(-150%) skewX(-45deg);
  }
  50% {
    transform: translateX(150%) skewX(-45deg);
  }
  100% {
    transform: translateX(-150%) skewX(-45deg);
  }
}

.animate-spotlight {
  animation: spotlight 8s linear infinite;
}
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export { HeroGeometric };
