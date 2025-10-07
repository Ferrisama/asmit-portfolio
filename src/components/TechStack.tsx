import React from "react";
import RouteSign from "./RouteSign";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import HeroProps from "../types/HeroProps";

const TechStack: React.FC<HeroProps> = ({ theme }) => {
  const { ref, isVisible } = useScrollAnimation();

  const skills: Record<string, string[]> = {
    Languages: ["Python", "JavaScript", "TypeScript", "SQL", "Solidity"],
    Frontend: ["React.js", "Next.js", "Angular", "Tailwind CSS"],
    Backend: ["FastAPI", "Node.js", "Express.js", "Django", "Flask"],
    "Cloud & DevOps": ["AWS Lambda", "Docker", "GitHub Actions", "CI/CD"],
    Databases: ["PostgreSQL", "MongoDB", "DynamoDB", "Redis"],
    Blockchain: ["Ethereum", "Smart Contracts", "Web3.js", "IPFS"],
  };

  return (
    <section
      id="skills"
      ref={ref}
      className={`min-h-screen flex items-center justify-center px-6 py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl w-full md:ml-48">
        <RouteSign number="02" name="TECH FOREST" theme={theme} />

        <h2
          className={`text-5xl md:text-6xl font-black mb-12 tracking-tighter ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          TECH{" "}
          <span className={theme === "dark" ? "text-red-500" : "text-red-600"}>
            STACK
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], idx) => (
            <div
              key={category}
              className={`p-8 rounded-2xl transition-all duration-500 hover:scale-105 border-2 ${
                theme === "dark"
                  ? "bg-red-950/20 backdrop-blur-lg border-red-500/30 hover:border-red-500/60 hover:bg-red-950/30"
                  : "bg-white/80 backdrop-blur-lg border-red-600/20 hover:border-red-600/50 hover:bg-red-50/80 hover:shadow-xl hover:shadow-red-600/10"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h3
                className={`text-2xl font-black mb-6 tracking-tight ${
                  theme === "dark" ? "text-red-400" : "text-red-600"
                }`}
              >
                {category.toUpperCase()}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all hover:scale-110 ${
                      theme === "dark"
                        ? "bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/40"
                        : "bg-red-600/10 text-red-700 hover:bg-red-600/20 border border-red-600/30"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
