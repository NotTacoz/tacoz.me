import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "./components/Navigation";
import { ThemeProvider } from "./providers";
import Script from "next/script"; // Fixed import statement

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Obsidian Blog",
  description: "A blog built with Next.js and Obsidian Markdown",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200`}
      >
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
              document.documentElement.classList.remove('light', 'dark')
              document.documentElement.classList.add(theme)
            }
          `}
        </Script>
        <ThemeProvider>
          <Navigation />
          <div className="pt-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <main>{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
