'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import GlobalNav from './components/GlobalNav'

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Sticky nav — appears on scroll */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'circOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
              <span className="font-serif text-white text-lg font-bold tracking-tight">FN</span>
              <nav className="hidden md:flex items-center gap-10">
                {[
                  { label: 'About', href: '/about' },
                  { label: 'Artworks', href: '/artworks' },
                  { label: 'Contact', href: '/contact' },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              {/* Mobile: just show the gallery CTA */}
              <Link
                href="/artworks"
                className="md:hidden text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Gallery →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always-visible absolute nav at top */}
      <GlobalNav theme="light" variant="homepage" />

      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/doevklqj6/image/upload/w_1920,h_1280,c_fill,g_center,q_auto,f_auto/v1771654953/homepage-background_jabt7w.jpg"
          alt="Freshia Njeri Art Background"
          fill
          priority
          className="object-cover object-center"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/30" />
      </div>

      {/* Content layer */}
      <div className="relative z-20 h-full flex flex-col pointer-events-none">

        {/* Center hero text */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            {/* Name — tighter on mobile */}
            <h1 className="font-serif mb-2 pointer-events-auto">
              <span className="block text-5xl sm:text-7xl md:text-9xl font-bold text-white tracking-tight">
                FRESHIA
              </span>
              <span className="block text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-wide">
                njeri
              </span>
            </h1>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-32 md:w-64 h-[1px] bg-white opacity-30 mx-auto my-5 md:my-6"
            />

            {/* Title */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xs md:text-base text-white opacity-90 tracking-[0.3em] mb-2"
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

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="pb-10 md:pb-16 px-6 md:px-12 pointer-events-auto"
        >
          <div className="flex items-center justify-between md:justify-end gap-6">
            {/* Secondary: About — visible on mobile to give a second path */}
            <Link
              href="/about"
              className="text-white/50 hover:text-white/80 text-xs tracking-widest uppercase font-light transition-colors duration-300 md:hidden"
            >
              About
            </Link>

            {/* Decorative line (desktop) */}
            <div className="hidden md:block flex-1 h-[1px] bg-white opacity-20" />

            {/* Primary CTA */}
            <Link
              href="/artworks"
              className="group inline-flex items-center text-white opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <motion.div
                className="flex items-center space-x-3"
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
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
