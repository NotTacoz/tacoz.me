import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { notFound } from "next/navigation";

interface PostData {
  slug: string;
  title: string;
  date: string;
  isFolder: boolean;
}

function getPostsData(dir: string, baseSlug: string = ""): PostData[] {
  const postsDirectory = path.join(process.cwd(), dir);
  let posts: PostData[] = [];

  if (fs.existsSync(postsDirectory)) {
    const items = fs.readdirSync(postsDirectory);

    for (const item of items) {
      const fullPath = path.join(postsDirectory, item);
      const isDirectory = fs.lstatSync(fullPath).isDirectory();
      const slug = path.join(
        baseSlug,
        isDirectory ? item : item.replace(/\.md$/, "")
      );

      if (isDirectory) {
        posts.push({
          slug,
          title: item,
          date: new Date().toISOString(),
          isFolder: true,
        });
        posts = posts.concat(getPostsData(fullPath, slug));
      } else if (item.endsWith(".md") && item !== "index.md") {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        posts.push({
          slug,
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
  return posts.map((post) => ({
    slug: post.slug.split(path.sep),
  }));
}

export default function Post({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join("/");
  const fullPath = path.join(process.cwd(), "posts", slug);

  if (fs.existsSync(fullPath) || fs.existsSync(`${fullPath}.md`)) {
    const stats = fs.existsSync(fullPath)
      ? fs.lstatSync(fullPath)
      : fs.lstatSync(`${fullPath}.md`);
    if (stats.isDirectory()) {
      // Render folder page
      const posts = getPostsData(fullPath);
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
            {params.slug[params.slug.length - 1]}
          </h1>
          {description && (
            <div className="prose dark:prose-invert">
              <MarkdownRenderer content={description} />
            </div>
          )}
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title} {post.isFolder && "(Folder)"}
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
      );
    } else {
      // Render individual post
      const filePath = fs.existsSync(fullPath) ? fullPath : `${fullPath}.md`;
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return (
        <article className="prose dark:prose-invert lg:prose-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {data.title || "Untitled"}
          </h1>
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
  }

  notFound();
}
