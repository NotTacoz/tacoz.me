import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Folder, FileText, Github, ExternalLink } from "lucide-react";

interface PostData {
  slug: string;
  title: string;
  date: string;
  isFolder: boolean;
}

interface ProjectData {
  slug: string;
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  status: "live" | "private" | "building";
  tags: string[];
  year: number;
}

const ignoredFolders = [
  ".obsidian",
  ".git",
  "node_modules",
  "assets",
  "templates",
];

function getProjectsData(): ProjectData[] {
  const projectsDirectory = path.join(process.cwd(), "posts/projects");
  const projects: ProjectData[] = [];

  if (fs.existsSync(projectsDirectory)) {
    const items = fs.readdirSync(projectsDirectory);

    for (const item of items) {
      if (item.endsWith(".md")) {
        const fullPath = path.join(projectsDirectory, item);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        projects.push({
          slug: item.replace(/\.md$/, ""),
          title: data.title || item.replace(/\.md$/, ""),
          description: data.description || "",
          liveUrl: data.liveUrl,
          githubUrl: data.githubUrl,
          status: data.status || "building",
          tags: data.tags || [],
          year: data.year || new Date().getFullYear(),
        });
      }
    }
  }

  return projects.sort((a, b) => b.year - a.year);
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
        isDirectory ? `${item}/` : item.replace(/\.md$/, "")
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
  const projects = getProjectsData();
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-16">
      <div className="text-center space-y-8">
        <div className="terminal-window mx-auto w-16 h-16 flex items-center justify-center">
          <span className="text-4xl">📚</span>
        </div>
        <h1 className="text-4xl font-bold">tacoz.me</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Hi - I am{" "}
          <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2CPvKNPELNr1HjZdSU6J5kuUbUadZ4WYLLA&s">
            tacoz
          </a>
        </p>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          this is a collection of my <Link href="/blog">thoughts</Link>,{" "}
          <Link href="/notes">notes</Link>, and{" "}
          <Link href="/learnings">learnings</Link>! have a look around:-)
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
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400 flex items-center">
                    <Folder className="icon text-yellow-400 mr-2" />
                    {folder.title}
                  </h3>
                </div>
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
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <FileText className="icon text-blue-400 mr-2" />
                    {post.title}
                  </h3>
                  <time className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4"
            >
              <div>
                <div className="flex justify-between items-start">
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-semibold hover:text-blue-500 transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      project.status === "live"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : project.status === "private"
                        ? "bg-blue-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    }`}
                  >
                    {project.status}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
