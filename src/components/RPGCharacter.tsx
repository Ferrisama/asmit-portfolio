// Giant Squid RPG Character (90s Anime Pixel Style)
import React, { useState, useEffect } from "react";
import useCharacterPosition from "./useCharacterPosition";

const RPGCharacter: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  const { scrollProgress, isWalking } = useCharacterPosition();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (isWalking) {
      const interval = setInterval(() => {
        setFrame((f) => (f + 1) % 4);
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isWalking]);

  // Responsive left position
  const leftPosition =
    typeof window !== "undefined" && window.innerWidth < 768 ? "5%" : "8%";

  return (
    <div
      className="hidden md:block fixed z-40 transition-all duration-200"
      style={{
        left: leftPosition,
        top: `${10 + scrollProgress * 0.7}%`,
      }}
    >
      <div className={`relative ${isWalking ? "animate-bounce-subtle" : ""}`}>
        <div
          className={`w-12 h-16 relative ${
            theme === "dark"
              ? "drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              : "drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]"
          }`}
        >
          <svg viewBox="0 0 32 48" className="w-full h-full">
            <rect
              x="10"
              y="4"
              width="12"
              height="12"
              fill={theme === "dark" ? "#FCA5A5" : "#FEE2E2"}
            />
            <rect
              x="8"
              y="16"
              width="16"
              height="16"
              fill={theme === "dark" ? "#EF4444" : "#DC2626"}
            />
            <rect
              x="4"
              y="18"
              width="4"
              height="10"
              fill={theme === "dark" ? "#EF4444" : "#DC2626"}
              className={isWalking && frame % 2 === 0 ? "translate-y-1" : ""}
            />
            <rect
              x="24"
              y="18"
              width="4"
              height="10"
              fill={theme === "dark" ? "#EF4444" : "#DC2626"}
              className={isWalking && frame % 2 === 1 ? "translate-y-1" : ""}
            />
            <rect
              x="10"
              y="32"
              width="5"
              height="12"
              fill={theme === "dark" ? "#B91C1C" : "#991B1B"}
              className={isWalking && frame % 2 === 0 ? "translate-y-1" : ""}
            />
            <rect
              x="17"
              y="32"
              width="5"
              height="12"
              fill={theme === "dark" ? "#B91C1C" : "#991B1B"}
              className={isWalking && frame % 2 === 1 ? "translate-y-1" : ""}
            />
            <rect x="13" y="8" width="2" height="2" fill="#1F2937" />
            <rect x="17" y="8" width="2" height="2" fill="#1F2937" />
          </svg>
        </div>

        {isWalking && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <div
              className={`w-1 h-1 rounded-full ${
                theme === "dark" ? "bg-red-500/50" : "bg-red-600/50"
              } animate-ping`}
            ></div>
            <div
              className={`w-1 h-1 rounded-full ${
                theme === "dark" ? "bg-red-500/50" : "bg-red-600/50"
              } animate-ping`}
              style={{ animationDelay: "0.1s" }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RPGCharacter;
