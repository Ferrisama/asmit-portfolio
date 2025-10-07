"use client";

import React, { useState } from "react";

import RPGCharacter from "../components/RPGCharacter";
import RPGPath from "../components/RPGPath";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import InteractiveBackground from "@/components/InteractiveBackground";
import About from "@/components/About";
import TechStack from "@/components/TechStack";

import { useTheme } from "@/hooks/useTheme";

// ==================== COMPONENTS ====================

export default function Portfolio() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <InteractiveBackground theme={theme} />

      {/* RPG Path on left */}
      <RPGPath theme={theme} />

      {/* Walking Character on left */}
      <RPGCharacter theme={theme} />

      <Navigation
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
      />
      <Hero theme={theme} />
      <About theme={theme} />
      <TechStack theme={theme} />
      <Projects theme={theme} />
      <Experience theme={theme} />
      <Contact theme={theme} />

      {/* <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");

        * {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 0.3s ease-in-out;
        }

        ::selection {
          background-color: ${theme === "dark"
            ? "rgba(239, 68, 68, 0.3)"
            : "rgba(220, 38, 38, 0.2)"};
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style> */}
    </div>
  );
}
