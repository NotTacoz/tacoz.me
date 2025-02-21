"use client";

import React, { useState, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";
import Image from "next/image";
import styles from "./Callout.module.css";

type CalloutType =
  | "note"
  | "info"
  | "warning"
  | "danger"
  | "success"
  | "tip"
  | "example"
  | "question"
  | "quote";

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
}

const CALLOUT_ICONS: Record<CalloutType, { emoji: string; color: string }> = {
  note: { emoji: "📝", color: "#448aff" },
  info: { emoji: "ℹ️", color: "#00b8d4" },
  warning: { emoji: "⚠️", color: "#ff9100" },
  danger: { emoji: "🚫", color: "#ff5252" },
  success: { emoji: "✅", color: "#00c853" },
  tip: { emoji: "💡", color: "#00bfa5" },
  example: { emoji: "🔍", color: "#7c4dff" },
  question: { emoji: "❓", color: "#64dd17" },
  quote: { emoji: "💭", color: "#9e9e9e" },
};

const Callout: React.FC<CalloutProps> = ({
  type,
  title,
  children,
  isCollapsible = false,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { emoji, color } = CALLOUT_ICONS[type] || CALLOUT_ICONS.note;
  const displayTitle = title || type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div
      className={`${styles.callout} ${styles[`callout-${type}`]}`}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div
        className={styles.calloutHeader}
        onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
        style={{ cursor: isCollapsible ? "pointer" : "default" }}
      >
        <span className={styles.calloutIcon}>{emoji}</span>
        <strong className={styles.calloutTitle}>{displayTitle}</strong>
        {isCollapsible && (
          <span className={styles.calloutToggle}>{isExpanded ? "−" : "+"}</span>
        )}
      </div>
      {(!isCollapsible || isExpanded) && (
        <div className={styles.calloutContent}>{children}</div>
      )}
    </div>
  );
};

const processCalloutContent = (content: string) => {
  // Remove any leading '>' characters and trim whitespace
  const cleanContent = content.replace(/^>\s*/gm, "").trim();

  // Updated regex to properly capture multiline title
  const calloutRegex = /^\[!(\w+)\](\+|-)?\s*([^\n]*)?(?:\n|$)([\s\S]*)/;
  const match = cleanContent.match(calloutRegex);

  if (!match) return null;

  const [, type, collapse, title, remainingContent] = match;
  const isCollapsible = collapse === "+" || collapse === "-";
  const defaultExpanded = collapse !== "-";

  return {
    type: type.toLowerCase() as CalloutType,
    title: title?.trim() || type.charAt(0).toUpperCase() + type.slice(1),
    content: remainingContent.trim(),
    isCollapsible,
    defaultExpanded,
  };
};

const CustomBlockquote: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const content = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child;
      if (React.isValidElement(child) && child.props.children) {
        return React.Children.toArray(child.props.children).join("\n");
      }
      return "";
    })
    .join("\n");

  const calloutData = processCalloutContent(content);

  if (!calloutData) {
    return <blockquote className={styles.blockquote}>{children}</blockquote>;
  }

  return (
    <Callout
      type={calloutData.type}
      title={calloutData.title}
      isCollapsible={calloutData.isCollapsible}
      defaultExpanded={calloutData.defaultExpanded}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 dark:border-gray-700">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {children}
            </td>
          ),
        }}
      >
        {calloutData.content}
      </ReactMarkdown>
    </Callout>
  );
};

interface MarkdownRendererProps {
  content: string | null;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
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
          <CustomBlockquote>{children}</CustomBlockquote>
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
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 dark:border-gray-700">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
