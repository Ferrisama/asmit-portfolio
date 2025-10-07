import React, { useRef, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import RouteSign from "./RouteSign";

import HeroProps from "../types/HeroProps";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  year: string;
}

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
      <div className="max-w-6xl w-full md:ml-48">
        <RouteSign number="03" name="PROJECT VALLEY" theme={theme} />

        <h2
          className={`text-5xl md:text-6xl font-black mb-12 tracking-tighter ${
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

export default Projects;
