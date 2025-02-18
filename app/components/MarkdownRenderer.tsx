"use client";

import React, { useState, useEffect, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";
import Image from "next/image";
import styles from "./Callout.module.css";

interface CalloutProps {
  type: string;
  foldState?: string;
  title?: string;
  content: ReactNode;
  isFoldable?: boolean;
}

const getCalloutIcon = (type: string) => {
  const icons: Record<string, string> = {
    info: "ℹ️",
    warning: "⚠️",
    danger: "❗",
    success: "✅",
    note: "📝",
    tip: "💡",
    example: "🔍",
    question: "❓",
    quote: "💭",
  };
  return icons[type.toLowerCase()] || "ℹ️";
};

const Callout: React.FC<CalloutProps> = ({
  type,
  foldState,
  title,
  content,
  isFoldable = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(foldState !== "-");
  const calloutType = type.toLowerCase();
  const displayTitle = title || type.charAt(0).toUpperCase() + type.slice(1);

  useEffect(() => {
    if (foldState) {
      setIsExpanded(foldState !== "-");
    }
  }, [foldState]);

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
        <strong>
          <span className={styles["callout-icon"]}>
            {getCalloutIcon(calloutType)}
          </span>
          {displayTitle}
        </strong>
        {isFoldable && (
          <span className={styles["fold-indicator"]}>
            {isExpanded ? "−" : "+"}
          </span>
        )}
      </div>
      <div className={styles["callout-content"]}>
        <MarkdownRenderer content={content} isNested={true} />
      </div>
    </div>
  );
};

const Blockquote: React.FC<{
  children: React.ReactNode;
  isNested: boolean;
}> = ({ children, isNested }) => {
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];

  // Helper function to extract text content from a child
  const extractTextContent = (child: React.ReactNode): string | null => {
    if (typeof child === "string") return child;
    if (!child || typeof child !== "object" || !("props" in child)) return null;

    const childContent = child.props.children;
    if (typeof childContent === "string") return childContent;
    if (Array.isArray(childContent)) {
      return childContent
        .map((c) => extractTextContent(c))
        .filter(Boolean)
        .join("");
    }
    return null;
  };

  // Extract text from the first child
  const firstChildText = extractTextContent(firstChild);
  if (!firstChildText) {
    return <div className={styles.blockquote}>{children}</div>;
  }

  // Check if this is a callout
  const calloutMatch = firstChildText
    .trim()
    .match(/^\[!(\w+)\]([-+])?(?:\s+(.+))?/);
  if (!calloutMatch || isNested) {
    return <div className={styles.blockquote}>{children}</div>;
  }

  const [fullMatch, type, foldState, title] = calloutMatch;
  const isFoldable = foldState === "+" || foldState === "-";

  // Extract the content after the callout syntax
  const remainingContent = childrenArray
    .map((child, index) => {
      if (index === 0) {
        const text = extractTextContent(child);
        if (text) {
          return text.replace(fullMatch, "").trim();
        }
        return "";
      }
      return child;
    })
    .filter(Boolean)
    .join("\n");

  return (
    <Callout
      type={type}
      foldState={foldState}
      title={title}
      content={remainingContent}
      isFoldable={isFoldable}
    />
  );
};

interface MarkdownRendererProps {
  content: ReactNode;
  isNested?: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isNested = false,
}) => {
  return (
    <ReactMarkdown
      components={{
        img: ({ alt, src }) => {
          if (!src) return null;

          const size = alt ? parseInt(alt) : undefined;
          const parsedHeight = size && !isNaN(size) ? size : 400;

          let imageSrc = src;
          try {
            // Handle relative paths
            if (src.includes("../assets/")) {
              imageSrc = `/assets/${src.split("assets/")[1]}`;
            } else if (!src.startsWith("/") && !src.startsWith("http")) {
              imageSrc = `/assets/${src}`;
            }

            // Ensure the path is properly encoded
            const urlParts = imageSrc.split("/");
            const encodedParts = urlParts.map((part) => {
              try {
                // Decode first to prevent double-encoding
                const decoded = decodeURIComponent(part);
                return encodeURIComponent(decoded);
              } catch {
                return encodeURIComponent(part);
              }
            });
            imageSrc = encodedParts.join("/");

            if (process.env.NODE_ENV === "production") {
              imageSrc = `/tacoz.me${imageSrc}`;
            }

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
          } catch (error) {
            console.error("Error processing image path:", error);
            return null;
          }
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
              // @ts-expect-error  Type mismatch between tomorrow theme and component props
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
      {String(content)}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
