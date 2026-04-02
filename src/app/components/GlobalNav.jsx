'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { socialLinks } from '@/app/lib/socials'

export default function GlobalNav({ theme = 'light', variant = 'homepage' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [navOpaque, setNavOpaque] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef(null)

  /* ── Live clock (Nairobi / EAT) ── */
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

  /* ── Scroll: inner-page sticky + homepage nav opacity ── */
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (variant === 'inner') setScrolled(y > 70)
      if (variant === 'homepage') setNavOpaque(y > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [variant])

  /* ── Body scroll lock when mobile menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [menuOpen])

  /* ── Close dropdown on route change ── */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const navItems = [
    { label: 'Home',     href: '/' },
    { label: 'About',    href: '/about' },
    { label: 'Artworks', href: '/artworks' },
    { label: 'Contact',  href: '/contact' },
  ]

  const textColorClass = theme === 'light' ? 'text-white' : 'text-slate-900'

  /* ── Inner page shared nav links ── */
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
      <button
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
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
      {/* ══ HOMEPAGE VARIANT ══ */}
      {variant === 'homepage' && (
        <div
          className={`absolute top-0 left-0 right-0 z-40 transition-all duration-500 ${
            navOpaque ? 'bg-black/40 backdrop-blur-md' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between px-6 md:px-12 py-5 md:py-7">

            {/* Left — FN monogram */}
            <Link
              href="/"
              className={`font-serif font-bold text-xl ${textColorClass} tracking-tight select-none transition-opacity duration-300 opacity-80 hover:opacity-100`}
            >
              FN
            </Link>

            {/* Center — desktop nav links */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${textColorClass} text-[11px] tracking-[0.2em] font-bold uppercase relative group pb-0.5 transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {item.label}
                    {/* Active dot */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                    )}
                    {/* Hover underline */}
                    {!isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right side: clock + mobile hamburger */}
            <div className="flex items-center gap-4">
              {/* Live clock — always on the right */}
              <span className={`hidden sm:block ${textColorClass} text-[11px] tracking-widest font-bold uppercase opacity-60 hover:opacity-100 transition-opacity duration-300 tabular-nums`}>
                {currentTime}
              </span>

              {/* Mobile hamburger — 44px tap target */}
              <div className="relative md:hidden">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-bottom-sheet"
                  className={`flex items-center justify-center w-11 h-11 ${textColorClass} opacity-70 hover:opacity-100 transition-all duration-300`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {menuOpen ? (
                      <motion.svg
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="open"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ INNER PAGES VARIANT ══ */}
      {variant === 'inner' && (
        <>
          {/* Static bar */}
          <div className="w-full bg-[#FAF9F6] border-b border-slate-900/8 py-5 px-6 md:px-16">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link href="/" className="font-serif font-bold text-xl text-slate-900 tracking-tight select-none hidden md:block">
                FN
              </Link>
              <InnerNavLinks />
              <InnerMobileBar />
              <div className="hidden md:block w-8" />
            </div>
          </div>

          {/* Sticky bar */}
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

      {/* ══ BOTTOM SHEET — homepage mobile ══ */}
      <AnimatePresence>
        {menuOpen && variant === 'homepage' && (
          <>
            {/* Scrim — tap outside to close */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] md:hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Sheet */}
            <motion.div
              id="mobile-bottom-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed bottom-0 left-0 right-0 z-[70] md:hidden rounded-t-3xl overflow-hidden"
              style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(24px)' }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Nav links — large, thumb-friendly */}
              <nav className="px-6 pt-4 pb-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: index * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between w-full py-4 border-b transition-all duration-200 group ${
                          isActive
                            ? 'border-white/10'
                            : 'border-white/6 active:bg-white/5'
                        }`}
                      >
                        <span className={`font-serif text-2xl tracking-tight transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-white/50 group-active:text-white'
                        }`}>
                          {item.label}
                        </span>
                        <span className={`flex items-center gap-2 transition-all duration-200 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-active:opacity-60'
                        }`}>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Footer row — time + close pill */}
              <div className="flex items-center justify-between px-6 py-5">
                <span className="text-[11px] text-white/30 tracking-widest uppercase tabular-nums">
                  {currentTime}
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/40 text-xs tracking-widest uppercase hover:border-white/25 hover:text-white/70 transition-all duration-200"
                >
                  Close
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Safe area spacer for phones with home indicator */}
              <div className="h-safe-bottom pb-5" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══ FULLSCREEN MENU OVERLAY (inner pages mobile) ══ */}
      <AnimatePresence>
        {menuOpen && variant === 'inner' && (
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
