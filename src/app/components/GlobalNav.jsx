'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { socialLinks } from '@/app/lib/socials'

export default function GlobalNav({ theme = 'light', variant = 'homepage' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Artworks', href: '/artworks' },
    { label: 'Contact', href: '/contact' },
  ]

  const textColorClass = theme === 'light' ? 'text-white' : 'text-slate-900'
  const bgColorClass = theme === 'light' ? 'bg-white' : 'bg-slate-900'

  return (
    <>
      {/* HOMEPAGE VARIANT */}
      {variant === 'homepage' && (
        <div 
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
            scrolled 
              ? 'bg-black/40 backdrop-blur-md py-4' 
              : 'bg-transparent pt-8 md:pt-10'
          } flex items-start justify-between px-6 md:px-12 pointer-events-none`}
        >
          <div className="w-full flex justify-between pointer-events-auto items-center">
            {/* Location */}
            <div className={`${textColorClass} text-xs md:text-sm tracking-wider opacity-70 hover:opacity-100 transition-opacity duration-300 font-bold uppercase`}>
              • NAIROBI, KE
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className={`${textColorClass} opacity-70 hover:opacity-100 transition-opacity text-sm tracking-widest font-bold uppercase relative group`}>
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 right-0 h-[1px] ${bgColorClass} scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300`} />
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger Icon */}
            <motion.button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden ${textColorClass} opacity-70 hover:opacity-100 transition-opacity duration-300 group flex items-center gap-2`}
              aria-label="Open menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>

            {/* Time */}
            <div className={`${textColorClass} text-xs md:text-sm tracking-wider opacity-70 hover:opacity-100 transition-opacity duration-300 font-bold uppercase`}>
              {currentTime}
            </div>
          </div>
        </div>
      )}

      {/* INNER PAGES VARIANT (Sticky on Scroll) */}
      {variant === 'inner' && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
            scrolled 
              ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-slate-900/5' 
              : 'bg-transparent py-8'
          } px-6 md:px-16`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-center relative">
            {/* Logo/FN shown when scrolled or on mobile */}
            <div className={`md:absolute left-0 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              <Link href="/" className="font-serif font-bold text-lg text-slate-900">FN</Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-12">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-xs md:text-sm tracking-widest uppercase font-bold transition-all duration-300 ${
                      isActive
                        ? 'text-teal-700'
                        : 'text-slate-500 hover:text-teal-800 hover:-translate-y-0.5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setMenuOpen(true)}
                className="text-slate-900 hover:text-teal-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 pointer-events-auto flex flex-col justify-end"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <motion.button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-6 md:top-10 md:right-12 text-white opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close menu"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <div className="h-full flex flex-col items-center justify-center">
              <nav className="space-y-8 md:space-y-10">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link href={item.href} className="block text-4xl md:text-6xl font-serif font-light text-white opacity-90 text-center relative group" onClick={() => setMenuOpen(false)}>
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="w-32 h-[1px] bg-white opacity-20 my-12" />

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex items-center space-x-8 text-sm text-white opacity-60">
                {socialLinks.map(({ name, href }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity relative group">
                    {name}
                    <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                  </a>
                ))}
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-12 text-xs text-white opacity-40 tracking-wider">
                Wajukuu Arts Collective
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
