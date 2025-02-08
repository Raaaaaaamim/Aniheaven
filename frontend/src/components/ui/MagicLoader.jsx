import React from "react";

const MagicLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative h-16 w-16">
        {/* Spinning ring */}
        <div className="border-t-primary/30 absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border-2 border-transparent"></div>

        {/* Counter-spinning inner ring */}
        <div className="border-t-primary/50 absolute inset-1 animate-[spin_2s_linear_infinite_reverse] rounded-full border-2 border-transparent"></div>

        {/* Pulsing core */}
        <div className="bg-primary/20 absolute inset-[6px] animate-pulse rounded-full">
          <div className="bg-primary/30 absolute inset-[6px] animate-[spin_1s_linear_infinite] rounded-full"></div>
        </div>

        {/* Glowing effect */}
        <div className="absolute -inset-1">
          <div className="bg-primary/5 absolute inset-0 animate-pulse rounded-full blur-md"></div>
        </div>
      </div>
    </div>
  );
};

export default MagicLoader;
