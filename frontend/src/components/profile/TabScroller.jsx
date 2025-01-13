import { useRef, useState } from "react";

const TabScroller = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsScrolling(true);
    console.log("H", e.pageX, scrollRef.current.offsetLeft);

    setStartX(e.pageX);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  const handleMouseMove = (e) => {
    if (!isScrolling) return;
    e.preventDefault();

    const x = e.pageX;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = walk;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="flex overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {children}
    </div>
  );
};
export default TabScroller;
