import "./globals.css";
import { Space_Mono } from "next/font/google";
import { Navigation } from "./components/Navigation";
import { ThemeProvider } from "./providers";
import BackToTop from "./components/BackToTop";
import ReadingProgress from "./components/ReadingProgress";
import { Github, Twitter } from "lucide-react";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

export const metadata = {
  title: "Monospace Garden",
  description:
    "A unique digital garden built with Next.js and Obsidian Markdown",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceMono.variable}>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200 font-mono">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-8 mt-16">
              {children}
            </main>
            <footer className="text-center py-4 text-sm">
              <p className="mb-2">
                &copy; {new Date().getFullYear()} tacoz. All rights reserved.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/NotTacoz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://twitter.com/NotTacoz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <BackToTop />
        <ReadingProgress />
      </body>
    </html>
  );
}
