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
  const postsDirectory = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);

  const slugs = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));

  // Add 'favicon.ico' to handle the missing param error
  slugs.push("favicon.ico");

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Post({ params }: PageProps) {
  const slug = params.slug;
  if (slug === "favicon.ico") {
    notFound();
  }

  const fullPath = path.join(process.cwd(), "posts", `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
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
