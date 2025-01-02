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
    // Remove 'assets/' if it's already in the path
    const cleanFileName = fileName.trim().replace(/^assets\//, "");
    return `![${alt || cleanFileName}](/assets/${cleanFileName})`;
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
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      if (src?.startsWith("/assets/")) {
        // Wrap in span instead of div to avoid hydration issues
        return (
          <span className={styles.imageWrapper}>
            <Image
              src={src}
              alt={alt || ""}
              width={800}
              height={600}
              className={styles.image}
              priority
            />
          </span>
        );
      }
      return <img src={src} alt={alt || ""} />;
    },
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
      // Handle wikilinks
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    blockquote: ({ children }: { children: React.ReactNode }) => {
      const textContent = React.Children.toArray(children)
        .map((child) => (typeof child === "string" ? child : ""))
        .join("");

      const match = textContent.match(/^\[!(\w+)\]([-+])?(?:\s+(.+))?/);
      if (match && !isNested) {
        const [, type, foldState, title] = match;
        // Remove only the first line that contains the callout syntax
        const lines = textContent.split("\n");
        const cleanedContent = lines.slice(1).join("\n").trim();
        const calloutType = type.toLowerCase();
        const isFoldable = foldState === "+" || foldState === "-";
        const defaultExpanded = foldState !== "-";

        // Calculate initial expanded state
        const initialExpanded = defaultExpanded;
        const [isExpanded, setIsExpanded] = useState(initialExpanded);

        React.useEffect(() => {
          setIsExpanded(initialExpanded);
        }, [initialExpanded]);

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

      // Process wikilinks
      const parts = children.split(/\[\[([^\]]+)\]\]/g);
      return (
        <>
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              const [link, alias] = part.split("|").map((s) => s.trim());
              const displayText = alias || link;

              return (
                <a key={index} href={`/${link}`} className={styles.wikilink}>
                  {displayText}
                </a>
              );
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
