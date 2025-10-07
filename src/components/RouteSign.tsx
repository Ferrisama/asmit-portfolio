import React from "react";

const RouteSign: React.FC<{
  number: string;
  name: string;
  theme: "dark" | "light";
}> = ({ number, name, theme }) => {
  return (
    <div className="flex justify-start mb-12 md:ml-48">
      <div
        className={`relative px-8 py-4 border-4 ${
          theme === "dark"
            ? "bg-red-950/80 border-red-500/60 shadow-lg shadow-red-500/20"
            : "bg-white/90 border-red-600/60 shadow-xl shadow-red-600/20"
        } backdrop-blur-sm`}
      >
        <div
          className={`text-sm font-black uppercase tracking-widest mb-1 ${
            theme === "dark" ? "text-red-400" : "text-red-600"
          }`}
        >
          ROUTE {number}
        </div>
        <div
          className={`text-2xl font-black tracking-tight ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default RouteSign;
