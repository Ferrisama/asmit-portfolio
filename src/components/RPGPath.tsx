import React from "react";

const RPGPath: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  return (
    <div
      className="hidden md:block fixed top-0 bottom-0 pointer-events-none z-0"
      style={{ left: "7%", width: "80px" }}
    >
      {/* Main path */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-b from-red-950/30 via-red-900/20 to-red-950/30"
            : "bg-gradient-to-b from-red-100/50 via-red-50/30 to-red-100/50"
        }`}
      >
        {/* Path stripes */}
        <div className="absolute inset-0 flex flex-col justify-around">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`h-8 mx-auto ${
                theme === "dark" ? "bg-red-500/20" : "bg-red-600/20"
              }`}
              style={{ width: "4px" }}
            ></div>
          ))}
        </div>
      </div>

      {/* Path borders */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          theme === "dark" ? "bg-red-500/30" : "bg-red-600/30"
        }`}
      ></div>
      <div
        className={`absolute right-0 top-0 bottom-0 w-1 ${
          theme === "dark" ? "bg-red-500/30" : "bg-red-600/30"
        }`}
      ></div>
    </div>
  );
};

export default RPGPath;
