"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";
import Image from "next/image";
import styles from "./Callout.module.css";

interface MarkdownRendererProps {
  content: string;
  isNested?: boolean;
}

const Blockquote: React.FC<{
  children: React.ReactNode;
  isNested: boolean;
}> = ({ children, isNested }) => {
  const childrenArray = React.Children.toArray(children);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  let defaultExpanded = true; // Default value
  let isFoldable = false; // Default value

  if (
    childrenArray[0] &&
    typeof childrenArray[0] === "object" &&
    "props" in childrenArray[0]
  ) {
    const textContent = childrenArray[0].props.children?.[0] || "";
    const match = String(textContent).match(/^\[!(\w+)\]([-+])?(?:\s+(.+))?/);

    if (match && !isNested) {
      const [, , foldState] = match;
      isFoldable = foldState === "+" || foldState === "-";
      defaultExpanded = foldState !== "-";
    }
  }

  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded]);

  if (
    childrenArray[0] &&
    typeof childrenArray[0] === "object" &&
    "props" in childrenArray[0]
  ) {
    const textContent = childrenArray[0].props.children?.[0] || "";
    const match = String(textContent).match(/^\[!(\w+)\]([-+])?(?:\s+(.+))?/);

    if (match && !isNested) {
      const [, type, , title] = match;
      const cleanedContent = String(textContent)
        .split("\n")
        .slice(1)
        .join("\n");
      const calloutType = type.toLowerCase();
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
  }

  return <blockquote>{children}</blockquote>;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isNested = false,
}) => {
  return (
    <ReactMarkdown
      components={{
        img: ({ alt, src }) => {
          if (!src) return null;

          // Parse size from alt text (e.g., "100" in ![100](image.png))
          const size = alt ? parseInt(alt) : undefined;
          const parsedHeight = size && !isNaN(size) ? size : 400;

          // Handle relative paths
          const imageSrc = src.startsWith("../")
            ? src.replace(/^\.\.\/\.\.\//, "/")
            : src;

          return (
            <span className="flex justify-center items-center w-full">
              <Image
                src={imageSrc}
                alt={alt || ""}
                height={parsedHeight}
                width={parsedHeight}
                priority={false}
                quality={75}
                style={{ height: `${parsedHeight}px`, width: "auto" }}
                className="rounded-lg"
              />
            </span>
          );
        },
        blockquote: ({ children }) => (
          <Blockquote isNested={isNested}>{children}</Blockquote>
        ),
        a: ({ href, children }) => {
          if (!href) return <>{children}</>;
          return href.startsWith("/") || href.startsWith("#") ? (
            <Link href={href}>{children}</Link>
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              // @ts-expect-error -- Type mismatch between tomorrow theme and component props
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
