import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Folder, FileText } from "lucide-react";

interface PostData {
  slug: string;
  title: string;
  date: string;
  isFolder: boolean;
}

const ignoredFolders = [".obsidian", ".git", "node_modules"];

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
        if (!ignoredFolders.includes(item)) {
          posts.push({
            slug,
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

export default function Home() {
  const allPosts = getPostsData("posts");
  const folders = allPosts.filter((post) => post.isFolder);
  const posts = allPosts.filter((post) => !post.isFolder);
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-16">
      <div className="text-center space-y-8">
        <div className="terminal-window mx-auto w-16 h-16 flex items-center justify-center">
          <span className="text-4xl">📚</span>
        </div>
        <h1 className="text-4xl font-bold">tacoz.me</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Welcome to my digital garden. This is where I share my thoughts,
          notes, and learnings. Feel free to explore and learn together!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Folders</h2>
          <div className="space-y-4">
            {folders.map((folder) => (
              <Link
                key={folder.slug}
                href={`/${folder.slug}`}
                className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <h3 className="text-xl font-semibold mb-2">
                  <Folder className="icon text-yellow-400" />
                  {folder.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${post.slug}`}
                className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <h3 className="text-xl font-semibold mb-2">
                  <FileText className="icon text-blue-400" />
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
    </div>
  );
}
