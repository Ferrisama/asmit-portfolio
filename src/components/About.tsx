import React from "react";
import RouteSign from "./RouteSign";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import HeroProps from "../types/HeroProps";

const About: React.FC<HeroProps> = ({ theme }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref}
      className={`min-h-screen flex items-center justify-center px-6 py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-4xl md:ml-48">
        <RouteSign number="01" name="ABOUT TOWN" theme={theme} />

        <h2
          className={`text-5xl md:text-6xl font-black mb-8 tracking-tighter ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          ABOUT{" "}
          <span className={theme === "dark" ? "text-red-500" : "text-red-600"}>
            ME
          </span>
        </h2>
        <div
          className={`text-lg md:text-xl space-y-6 font-medium leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <p>
            Results-driven Software Engineer with{" "}
            <span
              className={`font-bold ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              }`}
            >
              1+ years
            </span>{" "}
            of experience in full-stack development, web automation, and
            blockchain technologies. I specialize in building scalable
            applications and optimizing system performance.
          </p>
          <p>
            At{" "}
            <span className="font-bold">Aaizel International Technologies</span>
            , I engineered high-performance web crawlers for{" "}
            <span
              className={`font-bold ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              }`}
            >
              70+ websites
            </span>
            , processing over{" "}
            <span
              className={`font-bold ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              }`}
            >
              14,000 articles
            </span>{" "}
            with 90% accuracy. I've also built blockchain data extraction
            systems and real-time data streaming architectures.
          </p>
          <p>
            Currently completing my Bachelor's in{" "}
            <span className="font-bold">Computer Science</span> at VIT
            University, with expertise in Python, JavaScript, React, AWS, and
            distributed systems.
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;
