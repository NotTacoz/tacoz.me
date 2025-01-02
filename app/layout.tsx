import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from './components/Navigation'
import { ThemeProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Obsidian Blog',
  description: 'A blog built with Next.js and Obsidian Markdown',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} text-gray-900 dark:text-white transition-colors duration-200`}>
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
  )
}

