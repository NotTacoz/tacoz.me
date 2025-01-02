import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
  const posts = getPostsData("posts");
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-16">
      <div className="text-center space-y-8">
        <div className="w-20 h-20 mx-auto bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
          <span className="text-2xl">📚</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Obsidian Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Welcome to my digital garden. This is where I share my thoughts,
          notes, and learnings. Feel free to explore and learn together!
        </p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Latest Posts
        </h2>
        {posts.length > 0 ? (
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
        ) : (
          <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-700 dark:text-yellow-200">
              No posts found. Add Markdown files to the 'posts' directory to get
              started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
