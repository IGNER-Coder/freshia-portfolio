'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes} EAT`)
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Artworks', href: '/artworks' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with Image and Overlay Combined */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.3) 0%,
              rgba(0, 0, 0, 0.6) 50%,
              rgba(0, 0, 0, 0.3) 100%
            ),
            url('https://res.cloudinary.com/doevklqj6/image/upload/w_1920,h_1280,c_fill,g_center,q_auto,f_auto/v1771654953/homepage-background_jabt7w.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content Layer */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Top Bar */}
        <div className="flex items-start justify-between px-8 md:px-12 pt-8 md:pt-10">
          {/* Location - Top Left */}
          <div className="text-white text-xs md:text-sm tracking-wider opacity-70 hover:opacity-100 transition-opacity duration-300">
            • NAIROBI, KE
          </div>

          {/* Hamburger Menu - Top Center-Right */}
          <motion.button
            onClick={() => setMenuOpen(true)}
            className="text-white opacity-70 hover:opacity-100 transition-opacity duration-300 group"
            aria-label="Open menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              className="w-6 h-6 md:w-7 md:h-7" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 6h16M4 12h16M4 18h16"
                initial={{ pathLength: 1 }}
                whileHover={{ pathLength: [1, 0.8, 1] }}
                transition={{ duration: 0.5 }}
              />
            </svg>
          </motion.button>

          {/* Time - Top Right */}
          <div className="text-white text-xs md:text-sm tracking-wider opacity-70 hover:opacity-100 transition-opacity duration-300">
            {currentTime}
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            {/* Main Name */}
            <h1 className="font-serif mb-2">
              <span className="block text-7xl md:text-9xl font-bold text-white tracking-tight">
                FRESHIA
              </span>
              <span className="block text-5xl md:text-7xl font-light text-white tracking-wide">
                njeri
              </span>
            </h1>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-48 md:w-64 h-[1px] bg-white opacity-30 mx-auto my-6"
            />

            {/* Title */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm md:text-base text-white opacity-90 tracking-[0.3em] mb-3"
            >
              VISUAL ARTIST
            </motion.p>

            {/* Collective */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-xs md:text-sm text-white opacity-60 tracking-wider uppercase"
            >
              Wajukuu Arts Collective
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="pb-12 md:pb-16 px-8 md:px-12"
        >
          <div className="flex items-center justify-start md:justify-end">
            {/* Decorative line */}
            <div className="hidden md:block flex-1 h-[1px] bg-white opacity-20 mr-6" />
            
            {/* Button */}
            <motion.a
              href="/artworks"
              className="group inline-flex items-center space-x-3 text-white opacity-90 hover:opacity-100 transition-opacity duration-300"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm md:text-base tracking-wider font-light">
                VIEW GALLERY
              </span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(8px)'
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 md:top-10 md:right-12 text-white opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close menu"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </motion.button>

            {/* Menu Content */}
            <div className="h-full flex flex-col items-center justify-center">
              <nav className="space-y-8 md:space-y-10">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <motion.a
                      href={item.href}
                      className="block text-4xl md:text-6xl font-serif font-light text-white opacity-90 text-center relative group"
                      onClick={() => setMenuOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="relative">
                        {item.label}
                        {/* Underline on hover */}
                        <motion.span
                          className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                    </motion.a>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-32 h-[1px] bg-white opacity-20 my-12"
              />

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center space-x-8 text-sm text-white opacity-60"
              >
                {['Instagram', 'LinkedIn', 'Behance'].map((social) => (
                  <motion.a
                    key={social}
                    href={`https://${social.toLowerCase()}.com/freshianjeri`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 transition-opacity relative group"
                    whileHover={{ y: -2 }}
                  >
                    {social}
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </motion.div>

              {/* Collective Credit */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 text-xs text-white opacity-40 tracking-wider"
              >
                Wajukuu Arts Collective
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}