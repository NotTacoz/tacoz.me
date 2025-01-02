"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import Link from "next/link";
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
      if (!src) return null;
      const normalizedSrc = src.startsWith("assets/") ? `/${src}` : src;
      return (
        <span className={styles.imageWrapper}>
          <Image
            src={normalizedSrc}
            alt={alt || ""}
            width={800}
            height={600}
            className={styles.image}
            priority
          />
        </span>
      );
    },
    text: ({ children }: { children: React.ReactNode }) => {
      if (typeof children !== "string") return <>{children}</>;

      const parts = children.split(/\[\[([^\]]+)\]\]/g);

      return (
        <>
          {parts.map((part, index) => {
            if (index % 2 === 1) {
              const [link, alias] = part.split("|").map((s) => s.trim());
              const displayText = alias || link;
              const href = link
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/\.md$/, "");

              return (
                <Link key={index} href={`/${href}`} className={styles.wikilink}>
                  {displayText}
                </Link>
              );
            }
            return part;
          })}
        </>
      );
    },
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
      if (!href) return <>{children}</>;

      const isExternal = href.startsWith("http") || href.startsWith("//");
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }

      const cleanHref = href.replace(/\.md$/, "").replace(/^\//, "");

      return (
        <Link href={`/${cleanHref}`} className={styles.wikilink}>
          {children}
        </Link>
      );
    },
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <Blockquote isNested={isNested}>{children}</Blockquote>
    ),
  };

  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
};

export default MarkdownRenderer;
