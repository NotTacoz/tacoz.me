// Start of Selection
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "../../components/MarkdownRenderer";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // Function to recursively get all markdown files
  function getAllMarkdownFiles(dir: string): string[] {
    let results: string[] = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);

      if (fs.statSync(fullPath).isDirectory()) {
        results = results.concat(getAllMarkdownFiles(fullPath));
      } else if (item.endsWith(".md")) {
        // Get just the filename without extension
        const slug = item.replace(/\.md$/, "");
        results.push(slug);
      }
    }
    return results;
  }

  const blogDirectory = path.join(process.cwd(), "posts", "blog");
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  // Get all markdown files from the blog directory
  const files = getAllMarkdownFiles(blogDirectory);

  // Create the params array including both encoded and decoded versions
  const params = files.flatMap((file) => [
    { slug: file }, // Raw version
    { slug: encodeURIComponent(file) }, // URL-encoded version
  ]);

  // Add favicon.ico to handle that special case
  params.push({ slug: "favicon.ico" });

  return params;
}

export default async function Post({ params }: PageProps) {
  const slug = params.slug;
  // Try both encoded and decoded versions
  const decodedSlug = decodeURIComponent(slug);

  if (decodedSlug === "favicon.ico") {
    notFound();
  }

  // Try multiple possible paths in the blog directory
  const possiblePaths = [
    path.join(process.cwd(), "posts", "blog", `${decodedSlug}.md`),
    path.join(process.cwd(), "posts", "blog", `${slug}.md`),
  ];

  // Find the first path that exists
  const filePath = possiblePaths.find((p) => fs.existsSync(p));

  if (!filePath) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return (
    <article className="prose dark:prose-invert lg:prose-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{data.title || "Untitled"}</h1>
      {data.date && (
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <MarkdownRenderer content={content} />
    </article>
  );
}
