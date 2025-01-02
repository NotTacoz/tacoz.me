"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const headers = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );
    const tocItems: TOCItem[] = headers.map((header, index) => {
      const headerId = header.id || `header-${index}`;
      if (!header.id) {
        header.id = headerId; // Assign the generated id to the header if it doesn't have one
      }
      return {
        id: headerId,
        text: header.textContent?.trim() || "",
        level: parseInt(header.tagName.substring(1), 10),
      };
    });
    setToc(tocItems);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-4 top-20 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-xs w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-bold mb-2"
      >
        Table of Contents
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <ul className="space-y-2">
          {toc.map((item, index) => (
            <li
              key={`${item.id}-${index}`}
              style={{ marginLeft: `${(item.level - 1) * 0.5}rem` }}
            >
              <button
                onClick={() => handleClick(item.id)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TableOfContents;
