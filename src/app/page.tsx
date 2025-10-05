"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  Zap,
} from "lucide-react";

// ==================== TYPES ====================

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  year: string;
}

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  link: string;
}

// ==================== HOOKS ====================

const useTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "dark" | "light") || "light";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return { theme, toggleTheme };
};

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

// Custom hook for cursor tracking
const useCursorPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
};

// Petal interface
interface Petal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
  opacity: number;
}

// ==================== COMPONENTS ====================

// Sakura Petals Component
const SakuraPetals: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const petalIdRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Create petals along drag path
  const createPetal = (x: number, y: number) => {
    const newPetal: Petal = {
      id: petalIdRef.current++,
      x,
      y,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.8,
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: Math.random() * 2 + 1,
      rotationSpeed: (Math.random() - 0.5) * 5,
      opacity: 1,
    };

    setPetals((prev) => [...prev, newPetal]);
  };

  // Mouse event handlers
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setLastPosition({ x: e.clientX, y: e.clientY });
      createPetal(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const distance = Math.hypot(
          e.clientX - lastPosition.x,
          e.clientY - lastPosition.y
        );

        // Create petals along the path based on distance
        if (distance > 10) {
          const steps = Math.floor(distance / 10);
          for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const x = lastPosition.x + (e.clientX - lastPosition.x) * t;
            const y = lastPosition.y + (e.clientY - lastPosition.y) * t;
            createPetal(x, y);
          }
          setLastPosition({ x: e.clientX, y: e.clientY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, lastPosition]);

  // Animate petals
  useEffect(() => {
    const animate = () => {
      setPetals((prev) => {
        return prev
          .map((petal) => ({
            ...petal,
            x: petal.x + petal.velocityX,
            y: petal.y + petal.velocityY,
            rotation: petal.rotation + petal.rotationSpeed,
            velocityX: petal.velocityX + (Math.random() - 0.5) * 0.2,
            velocityY: petal.velocityY + 0.1,
            opacity: petal.opacity - 0.005,
          }))
          .filter(
            (petal) => petal.opacity > 0 && petal.y < window.innerHeight + 100
          );
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute transition-opacity"
          style={{
            left: petal.x,
            top: petal.y,
            transform: `translate(-50%, -50%) rotate(${petal.rotation}deg) scale(${petal.scale})`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sakura petal shape */}
            <path
              d="M15 2C15 2 10 8 10 15C10 18 12 20 15 20C18 20 20 18 20 15C20 8 15 2 15 2Z"
              fill={theme === "dark" ? "#FCA5A5" : "#DC2626"}
              opacity="0.8"
            />
            <path
              d="M15 2C15 2 12 5 12 10C12 12 13 13 15 13C17 13 18 12 18 10C18 5 15 2 15 2Z"
              fill={theme === "dark" ? "#FEE2E2" : "#EF4444"}
              opacity="0.6"
            />
            {/* Petal details */}
            <ellipse
              cx="15"
              cy="12"
              rx="2"
              ry="6"
              fill={theme === "dark" ? "#FFFFFF" : "#FFFFFF"}
              opacity="0.3"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

// Interactive Background Component
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

      {/* Cursor glow effect */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none mix-blend-difference z-50 transition-transform duration-150"
        style={{
          left: `${cursorPosition.x - 16}px`,
          top: `${cursorPosition.y - 16}px`,
          background: "rgba(255, 255, 255, 0.5)",
          filter: "blur(8px)",
        }}
      />
    </>
  );
};

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

interface HeroProps {
  theme: "dark" | "light";
}

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
      <div className="max-w-5xl text-center">
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
          Download Resume
        </button>

        <div className="mt-20 animate-bounce">
          <ChevronDown
            size={40}
            className={theme === "dark" ? "text-red-500" : "text-red-600"}
            strokeWidth={3}
          />
        </div>
      </div>
    </section>
  );
};

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
      <div className="max-w-5xl">
        <h2
          className={`text-5xl md:text-7xl font-black mb-12 tracking-tighter ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          ABOUT{" "}
          <span className={theme === "dark" ? "text-red-500" : "text-red-600"}>
            ME
          </span>
        </h2>
        <div
          className={`text-xl md:text-2xl space-y-8 font-medium leading-relaxed ${
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
            with 90% accuracy. I've built blockchain data extraction systems and
            real-time data streaming architectures.
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
      <div className="max-w-6xl w-full">
        <h2
          className={`text-5xl md:text-7xl font-black mb-16 text-center tracking-tighter ${
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

const Projects: React.FC<HeroProps> = ({ theme }) => {
  const { ref, isVisible } = useScrollAnimation();

  const projects: Project[] = [
    {
      title: "Smart Agriculture IoT System",
      description:
        "IoT agricultural monitoring system with computer vision-based pest detection achieving 85% accuracy. Features multi-sensor network and edge computing pipeline.",
      tech: ["ESP8266", "OpenCV", "TensorFlow", "LoRaWAN", "Python"],
      github: "https://github.com/Ferrisama",
      year: "2023",
    },
    {
      title: "Serverless CRM Integration Platform",
      description:
        "FastAPI and AWS Lambda backend for CRM event handling with Redis/Celery job queue for async processing. Integrated Freshworks API for automation flows.",
      tech: ["FastAPI", "AWS Lambda", "Redis", "Celery", "Python"],
      github: "https://github.com/Ferrisama",
      year: "2025",
    },
    {
      title: "Chatbot API + Telephony Engine",
      description:
        "Modular FastAPI backend connecting conversational states with call queue logic. Features WebSockets for real-time communication and PostgreSQL optimization.",
      tech: ["FastAPI", "WebSockets", "PostgreSQL", "Docker", "CI/CD"],
      github: "https://github.com/Ferrisama",
      year: "2025",
    },
    {
      title: "FAQ Automation Pipeline",
      description:
        "Lambda-based pipeline automating FAQ responses with AWS SNS for real-time updates. DynamoDB storage with TTL for data management.",
      tech: ["AWS Lambda", "SNS", "DynamoDB", "Python", "NLP"],
      github: "https://github.com/Ferrisama",
      year: "2024",
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className={`min-h-screen flex items-center justify-center px-6 py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl w-full">
        <h2
          className={`text-5xl md:text-7xl font-black mb-16 text-center tracking-tighter ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          FEATURED{" "}
          <span className={theme === "dark" ? "text-red-500" : "text-red-600"}>
            PROJECTS
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`p-8 rounded-2xl transition-all duration-500 hover:scale-105 group border-2 ${
                theme === "dark"
                  ? "bg-red-950/20 backdrop-blur-lg border-red-500/30 hover:border-red-500/60 hover:bg-red-950/30"
                  : "bg-white/80 backdrop-blur-lg border-red-600/20 hover:border-red-600/50 hover:bg-red-50/80 hover:shadow-2xl hover:shadow-red-600/10"
              }`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="flex justify-between items-start mb-6">
                <h3
                  className={`text-2xl font-black tracking-tight leading-tight ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {project.title}
                </h3>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full ${
                    theme === "dark"
                      ? "text-red-400 bg-red-500/20"
                      : "text-red-600 bg-red-600/10"
                  }`}
                >
                  {project.year}
                </span>
              </div>

              <p
                className={`mb-6 font-medium leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${
                      theme === "dark"
                        ? "bg-red-500/10 text-red-400 border border-red-500/30"
                        : "bg-red-600/5 text-red-700 border border-red-600/20"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-bold uppercase text-sm tracking-wider transition-all group-hover:gap-4 ${
                  theme === "dark"
                    ? "text-red-400 hover:text-red-300"
                    : "text-red-600 hover:text-red-700"
                }`}
              >
                View on GitHub
                <ExternalLink size={18} strokeWidth={2.5} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
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
      <div className="max-w-5xl w-full">
        <h2
          className={`text-5xl md:text-7xl font-black mb-16 text-center tracking-tighter ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <span className={theme === "dark" ? "text-red-500" : "text-red-600"}>
            WORK
          </span>{" "}
          EXPERIENCE
        </h2>

        <div className="space-y-16">
          {experiences.map((exp, idx) => (
            <div
              key={exp.company}
              className={`relative pl-12 border-l-4 transition-all duration-500 ${
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
                className={`space-y-3 font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${
                        theme === "dark" ? "bg-red-500" : "bg-red-600"
                      }`}
                    ></span>
                    <span className="text-lg">{highlight}</span>
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

const Contact: React.FC<HeroProps> = ({ theme }) => {
  const { ref, isVisible } = useScrollAnimation();

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      label: "Email",
      value: "asmitghosh3@gmail.com",
      link: "mailto:asmitghosh3@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-9672023768",
      link: "tel:+919672023768",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/asmit-ghosh",
      link: "https://linkedin.com/in/asmit-ghosh",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Ferrisama",
      link: "https://github.com/Ferrisama",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className={`min-h-screen flex items-center justify-center px-6 py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl w-full text-center">
        <h2
          className={`text-5xl md:text-7xl font-black mb-12 tracking-tighter ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          GET IN{" "}
          <span className={theme === "dark" ? "text-red-500" : "text-red-600"}>
            TOUCH
          </span>
        </h2>

        <p
          className={`text-2xl mb-16 font-bold ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Let's build something amazing together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contactInfo.map((info, idx) => {
            const IconComponent = info.icon;
            return (
              <a
                key={info.label}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-8 rounded-2xl transition-all hover:scale-105 border-2 ${
                  theme === "dark"
                    ? "bg-red-950/20 backdrop-blur-lg border-red-500/30 hover:border-red-500/60 hover:bg-red-950/30"
                    : "bg-white/80 backdrop-blur-lg border-red-600/20 hover:border-red-600/50 hover:bg-red-50/80 hover:shadow-2xl hover:shadow-red-600/10"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <IconComponent
                  className={`mx-auto mb-6 ${
                    theme === "dark" ? "text-red-400" : "text-red-600"
                  }`}
                  size={40}
                  strokeWidth={2.5}
                />
                <div
                  className={`font-black text-lg mb-2 uppercase tracking-wider ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {info.label}
                </div>
                <div
                  className={`font-bold ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {info.value}
                </div>
              </a>
            );
          })}
        </div>

        <div
          className={`text-sm font-bold uppercase tracking-widest ${
            theme === "dark" ? "text-gray-600" : "text-gray-500"
          }`}
        >
          © 2025 Asmit Ghosh. Built with Next.js & Tailwind CSS.
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN APP ====================

export default function Portfolio() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("about");

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <InteractiveBackground theme={theme} />

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

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");

        * {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        ::selection {
          background-color: ${theme === "dark"
            ? "rgba(239, 68, 68, 0.3)"
            : "rgba(220, 38, 38, 0.2)"};
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          cursor: none;
        }

        a,
        button {
          cursor: none;
        }
      `}</style>
    </div>
  );
}
