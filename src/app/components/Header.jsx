'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { number: '01', label: 'Artworks', href: '/artworks' },
    { number: '02', label: 'About', href: '/about' },
    { number: '03', label: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href) => pathname === href

  return (
    <>
      {/* 1. DESKTOP & MOBILE TOP BAR (Appears on Scroll) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-[70] shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
              {/* Logo - Hidden on mobile scroll to keep it minimal as requested */}
              <Link href="/" className="font-serif text-lg md:text-xl font-semibold text-gray-900 hover:text-teal-700 transition-colors">
                <span className="hidden md:inline">Freshia Njeri</span>
                <span className="md:hidden">FN</span>
              </Link>
              
              {/* Navigation Links - Just numbers on mobile */}
              <nav className="flex items-center space-x-6 md:space-x-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`transition-colors duration-300 flex flex-col items-center ${
                      isActive(item.href) ? 'text-teal-700 font-bold' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-base md:text-sm">
                      {/* Show label on desktop, just numbers on mobile scroll */}
                      <span className="hidden md:inline">{item.label}</span>
                      <span className="md:hidden">{item.number}</span>
                    </span>
                    {isActive(item.href) && (
                      <motion.span layoutId="topActive" className="w-1 h-1 bg-teal-700 rounded-full mt-1 md:hidden" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. VERTICAL SIDE NAV (Hidden on Scroll) */}
      <AnimatePresence>
        {!scrolled && (
          <motion.nav 
            initial={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block fixed left-0 top-0 h-screen w-[60px] z-50 bg-white border-r border-gray-100"
          >
            <div className="h-full flex flex-col items-center justify-between py-10">
              <div className="flex flex-col items-center">
                <Link href="/" className="group">
                  <div 
                    className="text-sm font-semibold tracking-[3px] text-gray-900 hover:text-teal-700 transition-colors duration-300"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    FRESHIA NJERI
                  </div>
                </Link>

                <div className="text-gray-300 text-xl my-6">·</div>

                <div className="flex flex-col items-center space-y-8">
                  {navItems.map((item) => (
                    <div
                      key={item.number}
                      className="relative"
                      onMouseEnter={() => setHoveredItem(item.number)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <Link
                        href={item.href}
                        className={`text-base font-medium transition-all duration-300 relative ${
                          isActive(item.href) ? 'text-gray-900 font-semibold' : 'text-gray-400 hover:text-teal-700'
                        }`}
                      >
                        {item.number}
                        {isActive(item.href) && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-[2px] h-[20px] bg-teal-700"
                          />
                        )}
                      </Link>

                      <AnimatePresence>
                        {hoveredItem === item.number && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                          >
                            <div className="bg-white px-5 py-2 shadow-xl text-sm font-medium text-gray-900 border border-gray-100">
                              {item.label}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-[10px] text-gray-400 tracking-wider" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                2025
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* 3. MOBILE BOTTOM NAV (Hidden on Scroll) */}
      <AnimatePresence>
        {!scrolled && (
          <motion.nav 
            initial={{ y: 0 }}
            exit={{ y: 100 }}
            className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 shadow-lg"
          >
            <div className="flex items-center justify-between px-6 h-[60px]">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.number}
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-300 relative ${
                      isActive(item.href) ? 'text-gray-900 font-semibold' : 'text-gray-400'
                    }`}
                  >
                    {item.number}
                    {isActive(item.href) && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-700 rounded-full"></span>
                    )}
                  </Link>
                ))}
              </div>
              <Link href="/" className="text-sm font-bold text-gray-900 tracking-wider">FN</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}