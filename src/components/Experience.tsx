import React, { useRef, useEffect, useState } from "react";
import { Zap } from "lucide-react";
import RouteSign from "./RouteSign";
import HeroProps from "../types/HeroProps";

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

const Experience: React.FC<HeroProps> = ({ theme }) => {
  const { ref, isVisible } = useScrollAnimation();

  const experiences: Experience[] = [
    {
      role: "Blockchain & Web Automation Development Intern",
      company: "Aaizel International Technologies Pvt Ltd",
      location: "Gurugram, India",
      period: "January 2025 – May 2025",
      highlights: [
        "Engineered web crawlers for 70+ websites, processing 14,000+ articles with 90% accuracy",
        "Built automation framework for 118 e-paper platforms, reducing manual processing by 85%",
        "Developed blockchain data extraction for Bitcoin, Ethereum, and Monero networks",
        "Optimized multi-threaded workflows with Python asyncio and Celery",
      ],
    },
    {
      role: "Full-Stack Web Developer Intern",
      company: "Perfectice",
      location: "Johns Creek, GA, USA (Remote)",
      period: "November 2023 – April 2024",
      highlights: [
        "Led Angular to React.js migration serving 10,000+ monthly active users",
        "Enhanced performance by 35% through optimization techniques",
        "Delivered features 25% faster in agile environment",
        "Reduced bug reports by 40% with TypeScript and coding standards",
      ],
    },
  ];

  return (
    <section
      id="experience"
      ref={ref}
      className={`min-h-screen flex items-center justify-center px-6 py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl w-full md:ml-48">
        <RouteSign number="04" name="BATTLE GROUNDS" theme={theme} />

        <h2
          className={`text-5xl md:text-6xl font-black mb-12 tracking-tighter ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <span className={theme === "dark" ? "text-red-500" : "text-red-600"}>
            WORK
          </span>{" "}
          EXPERIENCE
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <div
              key={exp.company}
              className={`relative pl-8 border-l-4 transition-all duration-500 ${
                theme === "dark" ? "border-red-500/40" : "border-red-600/40"
              }`}
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              <div
                className={`absolute -left-3 top-0 w-6 h-6 rounded-full border-4 ${
                  theme === "dark"
                    ? "bg-red-500 border-black"
                    : "bg-red-600 border-white"
                }`}
              >
                <Zap
                  className="absolute -top-1 -left-1"
                  size={32}
                  strokeWidth={2.5}
                />
              </div>

              <div
                className={`text-sm font-bold mb-3 uppercase tracking-widest ${
                  theme === "dark" ? "text-red-400" : "text-red-600"
                }`}
              >
                {exp.period}
              </div>

              <h3
                className={`text-3xl font-black mb-2 tracking-tight ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {exp.role}
              </h3>

              <div
                className={`text-xl mb-6 font-bold ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {exp.company} • {exp.location}
              </div>

              <ul
                className={`space-y-2 font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0"></span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;
