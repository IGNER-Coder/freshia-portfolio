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
    if (variant !== 'inner') return
    const handleScroll = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [variant])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Artworks', href: '/artworks' },
    { label: 'Contact', href: '/contact' },
  ]

  const textColorClass = theme === 'light' ? 'text-white' : 'text-slate-900'
  const bgColorClass   = theme === 'light' ? 'bg-white'   : 'bg-slate-900'

  /* ── Shared pieces used in both static + sticky inner bar ── */
  const InnerNavLinks = () => (
    <nav className="hidden md:flex items-center gap-10">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`font-sans text-[11px] tracking-[0.18em] uppercase font-bold transition-all duration-300 relative group pb-0.5 ${
              isActive ? 'text-teal-700' : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            {item.label}
            {/* teal underline on active; subtle slide-in on hover */}
            <span className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300 origin-left ${
              isActive ? 'bg-teal-600 scale-x-100' : 'bg-slate-400 scale-x-0 group-hover:scale-x-100'
            }`} />
          </Link>
        )
      })}
    </nav>
  )

  const InnerMobileBar = () => (
    <div className="md:hidden w-full flex items-center justify-between">
      <Link href="/" className="font-serif font-bold text-xl text-slate-900 tracking-tight select-none">FN</Link>
      {/* 44px tap target */}
      <button
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        className="flex items-center justify-center w-11 h-11 -mr-2 text-slate-900 hover:text-teal-700 transition-colors duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  )

  return (
    <>
      {/* ══ HOMEPAGE VARIANT — original centered floating nav ══ */}
      {variant === 'homepage' && (
        <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
          <div className="flex items-center justify-between px-6 md:px-12 pt-8 md:pt-10 pointer-events-auto">
            {/* Location */}
            <div className={`${textColorClass} text-xs md:text-sm tracking-wider opacity-70 hover:opacity-100 transition-opacity font-bold uppercase`}>
              • NAIROBI, KE
            </div>

            {/* Centered nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${textColorClass} opacity-70 hover:opacity-100 transition-opacity text-sm tracking-widest font-bold uppercase relative group`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 right-0 h-[1px] ${bgColorClass} scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300`} />
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger — 44px tap target */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className={`md:hidden flex items-center justify-center w-11 h-11 ${textColorClass} opacity-70 hover:opacity-100 transition-opacity duration-300`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Live clock */}
            <div className={`${textColorClass} text-xs md:text-sm tracking-wider opacity-70 hover:opacity-100 transition-opacity font-bold uppercase`}>
              {currentTime}
            </div>
          </div>
        </div>
      )}

      {/* ══ INNER PAGES VARIANT ══ */}
      {variant === 'inner' && (
        <>
          {/* Static bar — visible at top, scrolls away naturally */}
          <div className="w-full bg-[#FAF9F6] border-b border-slate-900/8 py-5 px-6 md:px-16">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              {/* Monogram */}
              <Link href="/" className="font-serif font-bold text-xl text-slate-900 tracking-tight select-none hidden md:block">
                FN
              </Link>
              <InnerNavLinks />
              <InnerMobileBar />
              {/* Right side spacer on desktop to balance monogram */}
              <div className="hidden md:block w-8" />
            </div>
          </div>

          {/* Sticky bar — slides in once static bar scrolls out of view */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ y: -64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -64, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-[70] bg-[#FAF9F6]/95 backdrop-blur-md border-b border-slate-900/8 shadow-[0_1px_8px_rgba(0,0,0,0.06)] py-4 px-6 md:px-16"
              >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <Link href="/" className="font-serif font-bold text-xl text-slate-900 tracking-tight select-none hidden md:block">
                    FN
                  </Link>
                  <InnerNavLinks />
                  <InnerMobileBar />
                  <div className="hidden md:block w-8" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ══ FULLSCREEN MENU OVERLAY ══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80]"
            style={{ backgroundColor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)' }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-8 right-6 md:top-10 md:right-12 flex items-center justify-center w-11 h-11 text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="h-full flex flex-col items-center justify-center">
              <nav className="space-y-8 md:space-y-10">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-4xl md:text-6xl font-serif font-light text-white opacity-90 text-center relative group"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-24 h-[1px] bg-white opacity-20 my-12"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-8 text-sm text-white opacity-50"
              >
                {socialLinks.map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 transition-opacity relative group"
                  >
                    {name}
                    <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                  </a>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 text-xs text-white opacity-30 tracking-wider"
              >
                Wajukuu Arts Collective
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
