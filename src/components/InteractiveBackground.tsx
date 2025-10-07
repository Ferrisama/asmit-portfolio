import React from "react";
import { useCursorPosition } from "@/hooks/useCursorPosition";

const InteractiveBackground: React.FC<{ theme: "dark" | "light" }> = ({
  theme,
}) => {
  const cursorPosition = useCursorPosition();

  return (
    <>
      {/* Animated gradient that follows cursor */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            theme === "light"
              ? `radial-gradient(600px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(220, 38, 38, 0.08), transparent 40%)`
              : `radial-gradient(600px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(239, 68, 68, 0.15), transparent 40%)`,
        }}
      />

      {/* Checkered grid pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              theme === "light"
                ? `linear-gradient(0deg, transparent 24%, rgba(220, 38, 38, .03) 25%, rgba(220, 38, 38, .03) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, .03) 75%, rgba(220, 38, 38, .03) 76%, transparent 77%, transparent),
               linear-gradient(90deg, transparent 24%, rgba(220, 38, 38, .03) 25%, rgba(220, 38, 38, .03) 26%, transparent 27%, transparent 74%, rgba(220, 38, 38, .03) 75%, rgba(220, 38, 38, .03) 76%, transparent 77%, transparent)`
                : `linear-gradient(0deg, transparent 24%, rgba(239, 68, 68, .05) 25%, rgba(239, 68, 68, .05) 26%, transparent 27%, transparent 74%, rgba(239, 68, 68, .05) 75%, rgba(239, 68, 68, .05) 76%, transparent 77%, transparent),
               linear-gradient(90deg, transparent 24%, rgba(239, 68, 68, .05) 25%, rgba(239, 68, 68, .05) 26%, transparent 27%, transparent 74%, rgba(239, 68, 68, .05) 75%, rgba(239, 68, 68, .05) 76%, transparent 77%, transparent)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>
    </>
  );
};

export default InteractiveBackground;
