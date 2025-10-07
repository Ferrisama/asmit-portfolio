import React, { useState, useRef, useEffect } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import RouteSign from "./RouteSign";
interface HeroProps {
  theme: "dark" | "light";
}
interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  link: string;
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
      <div className="max-w-4xl w-full md:ml-48">
        <RouteSign number="05" name="FINAL DESTINATION" theme={theme} />

        <h2
          className={`text-5xl md:text-6xl font-black mb-8 tracking-tighter ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          GET IN{" "}
          <span className={theme === "dark" ? "text-red-500" : "text-red-600"}>
            TOUCH
          </span>
        </h2>

        <p
          className={`text-xl mb-12 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          I'm always open to discussing new projects, opportunities, or just
          having a chat about technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactInfo.map((info, idx) => {
            const IconComponent = info.icon;
            return (
              <a
                key={info.label}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 rounded-2xl transition-all hover:scale-105 ${
                  theme === "dark"
                    ? "bg-red-950/20 backdrop-blur-lg border-2 border-red-500/30 hover:bg-red-950/30 hover:border-red-500/60"
                    : "bg-white/80 backdrop-blur-lg border-2 border-red-600/20 hover:bg-red-50/80 hover:border-red-600/50 hover:shadow-xl hover:shadow-red-600/10"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <IconComponent className="mx-auto mb-4" size={32} />
                <div
                  className={`font-semibold mb-1 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {info.label}
                </div>
                <div
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  {info.value}
                </div>
              </a>
            );
          })}
        </div>

        <div
          className={`text-sm ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}
        >
          © 2025 Asmit Ghosh. Built with Next.js & Tailwind CSS.
        </div>
      </div>
    </section>
  );
};

export default Contact;
