"use client";

import React, { useState, useEffect } from "react";

const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const scrollHandler = () => {
    const totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const windowScroll = window.scrollY;
    const scrolled = (windowScroll / totalHeight) * 100;
    setProgress(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-blue-500 transition-all duration-200 ease-out"
      ></div>
    </div>
  );
};

export default ReadingProgress;
