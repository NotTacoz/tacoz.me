import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import TableOfContents from "../components/TableOfContents";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { notFound } from "next/navigation";
import { Folder, FileText } from "lucide-react";

interface PostData {
  slug: string;
  title: string;
  date: string;
  isFolder: boolean;
}

const ignoredFolders = [".obsidian", ".git", "node_modules", "assets"];

function getPostsData(dir: string, baseSlug: string = ""): PostData[] {
  const postsDirectory = path.join(process.cwd(), dir);
  let posts: PostData[] = [];

  if (fs.existsSync(postsDirectory)) {
    const items = fs.readdirSync(postsDirectory);

    for (const item of items) {
      const fullPath = path.join(postsDirectory, item);
      const isDirectory = fs.lstatSync(fullPath).isDirectory();
      const slug = path
        .join(baseSlug, isDirectory ? `${item}/` : item.replace(/\.md$/, ""))
        .replace(/\\/g, "/");

      if (isDirectory) {
        if (!ignoredFolders.includes(item)) {
          posts.push({
            slug: encodeURI(slug),
            title: item,
            date: new Date().toISOString(),
            isFolder: true,
          });
          posts = posts.concat(getPostsData(fullPath, slug));
        }
      } else if (item.endsWith(".md") && item !== "index.md") {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        posts.push({
          slug: encodeURI(slug),
          title: data.title || item.replace(/\.md$/, ""),
          date: data.date || new Date().toISOString(),
          isFolder: false,
        });
      }
    }
  }

  return posts;
}

export async function generateStaticParams() {
  const posts = getPostsData("posts");

  // Get all possible paths by splitting each slug
  const allPaths = posts.reduce((paths: { slug: string[] }[], post) => {
    // First decode the URI to handle spaces correctly
    const decodedSlug = decodeURI(post.slug);

    // Split by forward slash and filter out empty segments
    const segments = decodedSlug
      .split("/")
      .filter(Boolean)
      .map((segment) => {
        // Ensure each segment is properly encoded for URL paths
        return encodeURIComponent(segment);
      });

    // Add the full path
    paths.push({ slug: segments });

    // Add all parent paths
    let currentPath: string[] = [];
    segments.forEach((segment) => {
      currentPath = [...currentPath, segment];
      if (!paths.some((p) => p.slug.join("/") === currentPath.join("/"))) {
        paths.push({ slug: [...currentPath] });
      }
    });

    return paths;
  }, []);

  // Get all files and directories recursively
  function getAllPaths(
    dir: string,
    basePath: string[] = []
  ): { slug: string[] }[] {
    const items = fs.readdirSync(dir);
    let paths: { slug: string[] }[] = [];

    for (const item of items) {
      if (ignoredFolders.includes(item)) continue;

      const fullPath = path.join(dir, item);
      const isDirectory = fs.lstatSync(fullPath).isDirectory();
      const itemName = item.replace(/\.md$/, "");
      const itemPath = [...basePath, encodeURIComponent(itemName)];

      if (isDirectory) {
        paths.push({ slug: itemPath });
        paths = paths.concat(getAllPaths(fullPath, itemPath));
      } else if (item.endsWith(".md") && item !== "index.md") {
        // Add the path without /page
        paths.push({ slug: itemPath });

        // Also add the path with /page for compatibility
        paths.push({ slug: [...itemPath, "page"] });
      }
    }

    return paths;
  }

  // Get all possible paths from the posts directory
  const postsDir = path.join(process.cwd(), "posts");
  const fileSystemPaths = getAllPaths(postsDir);

  // Combine all paths and remove duplicates
  const combinedPaths = [...allPaths, ...fileSystemPaths];
  const uniquePaths = combinedPaths.filter(
    (path, index, self) =>
      index === self.findIndex((p) => p.slug.join("/") === path.slug.join("/"))
  );

  return uniquePaths;
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

interface PageProps {
  params: {
    slug: string[];
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Add this function to handle internal links
function processInternalLink(content: string): string {
  return content.replace(
    /\[([^\]]+)\]\(([^)]+)\.md\)/g,
    (match, text, link) => {
      // Remove .md extension and ensure the link doesn't end with /page
      const cleanLink = link.replace(/\.md$/, "").replace(/\/page$/, "");
      return `[${text}](/${cleanLink})`;
    }
  );
}

export default async function Post({ params }: PageProps) {
  const slug = params.slug.map(decodeURIComponent).join("/");
  const fullPath = path.join(process.cwd(), "posts", slug);

  if (fs.existsSync(fullPath) || fs.existsSync(`${fullPath}.md`)) {
    const stats = fs.existsSync(fullPath)
      ? fs.lstatSync(fullPath)
      : fs.lstatSync(`${fullPath}.md`);
    if (stats.isDirectory()) {
      // Render folder page
      const posts = getPostsData(path.join("posts", slug), slug);
      const indexPath = path.join(fullPath, "index.md");
      let description = "";

      if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, "utf8");
        const { content } = matter(indexContent);
        description = content;
      }

      return (
        <div className="space-y-8">
          <h1 className="text-4xl font-bold mb-4">
            {decodeURIComponent(params.slug[params.slug.length - 1])}
          </h1>
          {description && (
            <div className="prose dark:prose-invert">
              <MarkdownRenderer content={description} />
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Folders</h2>
              {posts
                .filter((post) => post.isFolder)
                .map((folder) => (
                  <Link
                    key={folder.slug}
                    href={`/${folder.slug}`}
                    className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <h3 className="text-xl font-semibold text-yellow-400">
                      <Folder className="icon text-yellow-400 inline-block mr-2" />
                      {decodeURIComponent(folder.title)}
                    </h3>
                  </Link>
                ))}
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Files</h2>
              {posts
                .filter((post) => !post.isFolder)
                .map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      <FileText className="icon text-blue-400 inline-block mr-2" />
                      {post.title}
                    </h3>
                    <time className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      );
    } else {
      // Render individual post
      const filePath = fs.existsSync(fullPath) ? fullPath : `${fullPath}.md`;
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const readingTime = estimateReadingTime(content);
      const processedContent = processInternalLink(content);

      return (
        <article className="prose dark:prose-invert lg:prose-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {data.title || "Untitled"}
          </h1>
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8">
            <time>
              {new Date(data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="mx-2">•</span>
            <span>{readingTime} min read</span>
          </div>
          <MarkdownRenderer content={processedContent} />
          <TableOfContents />
        </article>
      );
    }
  }

  notFound();
}
