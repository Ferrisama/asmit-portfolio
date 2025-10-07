import React, { useState, useEffect } from "react";

const useCharacterPosition = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWalking, setIsWalking] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;

      setScrollProgress(progress);
      setIsWalking(true);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsWalking(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return { scrollProgress, isWalking };
};

export default useCharacterPosition;
