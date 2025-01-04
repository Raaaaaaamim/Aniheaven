import React, { useState } from "react";

const AZPage = () => {
  const characters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const [selected, setSelected] = useState();

  return (
    <div className="w-full min-h-screen bg-background/95">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 flex items-center space-x-4">
          <h1 className="text-2xl md:text-3xl font-outfit font-bold bg-gradient-to-r from-text/90 to-text/60 bg-clip-text text-transparent">
            Browse Anime
          </h1>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent"></div>
        </div>

        {/* Character Navigation */}
        <div className="relative ">
          <div className="flex flex-wrap gap-x-2 gap-y-3 justify-center items-center p-4 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/5">
            {characters.map((char, i) => (
              <button
                key={char}
                onClick={() => setSelected(i)}
                className={`
                  relative group
                  w-7 h-7 md:w-8 md:h-8
                  flex items-center justify-center
                  rounded-lg
                  transition-all duration-200
                  ${
                    selected === i
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-white/[0.03]"
                  }
                `}
              >
                {/* Character */}
                <span
                  className={`
                  font-outfit text-sm md:text-base uppercase
                  transition-all duration-200
                  ${
                    selected === i
                      ? "font-semibold"
                      : "text-text/60 group-hover:text-text/90"
                  }
                `}
                >
                  {char}
                </span>

                {/* Highlight Effect */}
                <div
                  className={`
                  absolute inset-0 -z-10
                  transition-all duration-300
                  ${
                    selected === i
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                  }
                `}
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
                  <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-br from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AZPage;
