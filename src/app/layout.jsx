'use client'

import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { usePathname } from 'next/navigation'
import Footer from './components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className} suppressHydrationWarning>
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer only on pages that aren't homepage */}
        {!isHomePage && <Footer />}
      </body>
    </html>
  )
  // src/app/layout.jsx

    return (
      <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <main className="min-h-screen">
            {children}
          </main>
        </body>
      </html>
    );
}