"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import styles from "./Callout.module.css";

interface MarkdownRendererProps {
  content: string;
  isNested?: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isNested = false,
}) => {
  // Process Obsidian-style image syntax
  const processedContent = content.replace(/!\[\[(.*?)\]\]/g, (match, p1) => {
    const [fileName, alt] = p1.split("|");
    return `![${alt || fileName}](/assets/${fileName})`;
  });

  const components = {
    code: ({
      inline,
      className,
      children,
    }: {
      inline?: boolean;
      className?: string;
      children: React.ReactNode;
    }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div">
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    },
    p: (props: any) => <p {...props} />,
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      if (src?.startsWith("/assets/")) {
        return (
          <div className={styles.imageWrapper}>
            <Image
              src={src}
              alt={alt || ""}
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
        );
      }
      return <img src={src} alt={alt || ""} />;
    },
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
      if (href?.startsWith("/notes/")) {
        return (
          <a href={href} className={styles.wikilink}>
            {children}
          </a>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    blockquote: ({ children }: { children: React.ReactNode }) => {
      const [isExpanded, setIsExpanded] = useState(true);
      const textContent = React.Children.toArray(children)
        .map((child) => (typeof child === "string" ? child : ""))
        .join("");

      const match = textContent.match(/^\[!(\w+)\]([-+])?(?:\s+(.+))?/);
      if (match && !isNested) {
        const [, type, foldState, title] = match;
        const cleanedContent = textContent
          .replace(/^\[!\w+\][-+]?\s*.*\n?/, "")
          .trim();
        const calloutType = type.toLowerCase();
        const isFoldable = foldState === "+" || foldState === "-";
        const defaultExpanded = foldState !== "-";

        React.useEffect(() => {
          setIsExpanded(defaultExpanded);
        }, [defaultExpanded]);

        const displayTitle =
          title || type.charAt(0).toUpperCase() + type.slice(1);

        return (
          <div
            className={`${styles.callout} ${styles[`callout-${calloutType}`]} ${
              isFoldable ? styles.foldable : ""
            } ${isExpanded ? styles.expanded : ""}`}
          >
            <div
              className={styles["callout-title"]}
              onClick={() => isFoldable && setIsExpanded(!isExpanded)}
            >
              <strong>{displayTitle}</strong>
              {isFoldable && (
                <span className={styles["fold-indicator"]}>
                  {isExpanded ? "−" : "+"}
                </span>
              )}
            </div>
            <div className={styles["callout-content"]}>
              <MarkdownRenderer content={cleanedContent} isNested={true} />
            </div>
          </div>
        );
      }
      return <blockquote>{children}</blockquote>;
    },
    text: ({ children }: { children: React.ReactNode }) => {
      if (typeof children !== "string") return <>{children}</>;
      const parts = children.split(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g);
      return (
        <>
          {parts.map((part, index) => {
            if (index % 3 === 1) {
              const displayText = parts[index + 1] || part;
              return (
                <a
                  key={index}
                  href={`/notes/${part.trim()}`}
                  className={styles.wikilink}
                >
                  {displayText}
                </a>
              );
            } else if (index % 3 === 2) {
              return null;
            }
            return part;
          })}
        </>
      );
    },
  };

  return (
    <ReactMarkdown components={components}>{processedContent}</ReactMarkdown>
  );
};

export default MarkdownRenderer;
