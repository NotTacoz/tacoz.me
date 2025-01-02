"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Process Obsidian-style image syntax
  const processedContent = content.replace(/!\[\[(.*?)\]\]/g, (match, p1) => {
    const [fileName, alt] = p1.split("|");
    return `![${alt || fileName}](/assets/${fileName})`;
  });

  return (
    <ReactMarkdown
      components={{
        code: ({ inline, className, children }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={tomorrow}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className}>{children}</code>
          );
        },
        p: (props) => <p {...props} />,
        img: ({ src, alt }) => {
          if (src?.startsWith("/assets/")) {
            return <Image src={src} alt={alt || ""} width={600} height={400} />;
          }
          return <img src={src} alt={alt || ""} />;
        },
        a: ({ href, children }) => {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
        blockquote: ({ children }) => {
          const textContent = React.Children.toArray(children)
            .map((child) => (typeof child === "string" ? child : ""))
            .join("");

          const match = textContent.match(/\[!(\w+)\]/);
          if (match) {
            const type = match[1].toLowerCase();
            const cleanedContent = textContent.replace(/\[!\w+\]/, "").trim();

            return (
              <div className={`callout callout-${type}`}>
                <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong>
                <div>{cleanedContent}</div>
              </div>
            );
          }
          return <blockquote>{children}</blockquote>;
        },
        text: ({ children }) => {
          const parts = String(children).split(
            /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
          );
          return (
            <>
              {parts.map((part, index) =>
                index % 2 === 1 ? (
                  <a
                    key={index}
                    href={`/notes/${part.split("|")[0].trim()}`}
                    className="wikilink"
                  >
                    {part.split("|")[1] || part.split("|")[0]}
                  </a>
                ) : (
                  part
                )
              )}
            </>
          );
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
