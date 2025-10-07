import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

interface NavigationProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-black/90 backdrop-blur-xl border-b border-red-500/20 shadow-lg shadow-red-500/5"
            : "bg-white/90 backdrop-blur-xl border-b border-red-600/20 shadow-lg shadow-red-600/5"
          : theme === "dark"
          ? "bg-transparent"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className={`text-2xl font-black tracking-tighter ${
              theme === "dark" ? "text-white" : "text-red-600"
            }`}
          >
            ASMIT
            <span className={theme === "dark" ? "text-red-500" : "text-black"}>
              .
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative font-bold text-sm uppercase tracking-wider transition-colors group ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-red-500"
                    : "text-gray-700 hover:text-red-600"
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                    theme === "dark" ? "bg-red-500" : "bg-red-600"
                  }`}
                ></span>
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all hover:scale-110 ${
                theme === "dark"
                  ? "bg-red-500/20 hover:bg-red-500/30 text-red-500"
                  : "bg-red-600/10 hover:bg-red-600/20 text-red-600"
              }`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 ${
              theme === "dark" ? "text-white" : "text-red-600"
            }`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`block w-full text-left py-2 font-bold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
