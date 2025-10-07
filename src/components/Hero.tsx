import React, { useRef, useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ChevronDown,
} from "lucide-react";

import HeroProps from "@/types/HeroProps";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const { ref, isVisible } = useScrollAnimation();

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Asmit_Ghosh_Resume.pdf";
    link.download = "Asmit_Ghosh_Resume.pdf";
    link.click();
  };

  return (
    <section
      ref={ref}
      className={`min-h-screen flex items-center justify-center pt-20 px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl text-center md:ml-48">
        <div className="mb-8">
          <div
            className={`text-7xl md:text-9xl font-black mb-6 tracking-tighter animate-fade-in ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            ASMIT
            <br />
            <span
              className={theme === "dark" ? "text-red-500" : "text-red-600"}
            >
              GHOSH
            </span>
          </div>
          <div
            className={`text-2xl md:text-3xl font-bold mb-4 tracking-wide ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            }`}
          >
            FULL-STACK ENGINEER
          </div>
          <div
            className={`text-lg md:text-xl font-semibold uppercase tracking-widest ${
              theme === "dark" ? "text-gray-500" : "text-gray-600"
            }`}
          >
            Web Automation • Blockchain • Cloud
          </div>
        </div>

        <p
          className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-medium leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Building{" "}
          <span className={theme === "dark" ? "text-red-500" : "text-red-600"}>
            scalable systems
          </span>{" "}
          that process <span className="font-bold">14,000+</span> data points
          through automated pipelines.
        </p>

        <div className="flex justify-center gap-6 mb-10">
          {[
            { icon: Github, href: "https://github.com/Ferrisama" },
            { icon: Linkedin, href: "https://linkedin.com/in/asmit-ghosh" },
            { icon: Mail, href: "mailto:asmitghosh3@gmail.com" },
            { icon: Phone, href: "tel:+919672023768" },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-5 rounded-xl transition-all hover:scale-110 hover:-translate-y-1 ${
                theme === "dark"
                  ? "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                  : "bg-red-600/10 hover:bg-red-600/20 text-red-600 border border-red-600/30"
              }`}
            >
              <social.icon size={28} strokeWidth={2.5} />
            </a>
          ))}
        </div>

        <button
          onClick={downloadResume}
          className={`px-10 py-5 rounded-full font-bold text-lg uppercase tracking-wider transition-all hover:scale-105 hover:shadow-2xl flex items-center gap-3 mx-auto ${
            theme === "dark"
              ? "bg-red-600 text-white hover:bg-red-500 shadow-red-500/50"
              : "bg-red-600 text-white hover:bg-red-700 shadow-red-600/50"
          }`}
        >
          <Download size={24} strokeWidth={2.5} />
          DOWNLOAD RESUME
        </button>

        <div className="mt-20 flex flex-col items-center gap-2">
          <div
            className={`text-sm font-black uppercase tracking-widest ${
              theme === "dark" ? "text-red-500" : "text-red-600"
            }`}
          >
            ▼ START JOURNEY ▼
          </div>
          <ChevronDown
            size={40}
            className={`${
              theme === "dark" ? "text-red-500" : "text-red-600"
            } animate-bounce`}
            strokeWidth={3}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
