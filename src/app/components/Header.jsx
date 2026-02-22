'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState(null)

  // Navigation items
  const navItems = [
    { number: '01', label: 'Artworks', href: '/artworks' },
    { number: '02', label: 'About', href: '/about' },
    { number: '03', label: 'Contact', href: '/contact' },
  ]

  // Check if current page
  const isActive = (href) => pathname === href

  return (
    <>
      {/* Desktop Vertical Navigation */}
      <nav className="hidden md:block fixed left-0 top-0 h-screen w-[60px] z-50 bg-white shadow-sm">
        <div className="h-full flex flex-col items-center justify-between py-10">
          {/* Top Section: Name */}
          <div className="flex flex-col items-center">
            <Link href="/" className="group">
              <div 
                className="text-sm font-semibold tracking-[3px] text-gray-900 hover:text-teal-700 transition-colors duration-300"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)'
                }}
              >
                FRESHIA NJERI
              </div>
            </Link>

            {/* Dot Separator */}
            <div className="text-gray-300 text-xl my-6">·</div>

            {/* Navigation Numbers */}
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
                    className={`
                      text-base font-medium transition-all duration-300 relative
                      ${isActive(item.href) 
                        ? 'text-gray-900 font-semibold' 
                        : 'text-gray-400 hover:text-teal-700'
                      }
                    `}
                  >
                    {item.number}
                    
                    {/* Active Indicator Line */}
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-[2px] h-[20px] bg-teal-700"
                        initial={false}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    )}
                  </Link>

                  {/* Hover Label */}
                  <AnimatePresence>
                    {hoveredItem === item.number && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                      >
                        <div className="bg-white px-5 py-2 shadow-lg text-sm font-medium text-gray-900 border border-gray-100">
                          {item.label}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Year */}
          <div 
            className="text-[10px] text-gray-400 tracking-wider"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)'
            }}
          >
            2025
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 h-[60px]">
          {/* Navigation Numbers */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className={`
                  text-sm font-medium transition-all duration-300 relative
                  ${isActive(item.href) 
                    ? 'text-gray-900 font-semibold' 
                    : 'text-gray-400'
                  }
                `}
              >
                {item.number}
                {/* Active indicator dot for mobile */}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-700 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Initials - Link to Home */}
          <Link 
            href="/" 
            className="text-sm font-semibold text-gray-900 tracking-wider hover:text-teal-700 transition-colors duration-300"
          >
            FN
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Spacer */}
      <div className="md:hidden h-[60px]" />
    </>
  )
}