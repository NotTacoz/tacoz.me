import React from "react";
import Link from "next/link";

interface WikilinksRendererProps {
  content: string;
}

const WikilinksRenderer: React.FC<WikilinksRendererProps> = ({ content }) => {
  const regex = /\[\[(.*?)\]\]/g;
  const parts = content.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          return part;
        } else {
          const [linkText, linkHref] = part.split("|");
          const href = linkHref || linkText;
          return (
            <Link
              key={index}
              href={`/${href.replace(/ /g, "-").toLowerCase()}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {linkText}
            </Link>
          );
        }
      })}
    </>
  );
};

export default WikilinksRenderer;
