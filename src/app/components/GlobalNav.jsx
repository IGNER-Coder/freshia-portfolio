'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { socialLinks } from '@/app/lib/socials'

/* ─────────────────────────────────────────────────────────
   CONSTANTS — single source of truth for spacing/sizing
   Change here → updates everywhere automatically
───────────────────────────────────────────────────────── */
const NAV_HEIGHT   = 'h-16'          // 64px — identical on every page, every variant
const NAV_PX       = 'px-5 sm:px-8'  // horizontal padding — same on mobile for all pages
const FN_CLASSES   = 'font-serif font-bold text-xl tracking-tight select-none transition-opacity duration-300'
const ICON_BTN     = 'flex items-center justify-center w-11 h-11 md:hidden transition-all duration-300'
const LINK_BASE    = 'text-[11px] tracking-[0.18em] uppercase font-bold relative group pb-0.5 transition-all duration-300'

/* ─────────────────────────────────────────────────────────
   Animated hamburger ↔ close icon
───────────────────────────────────────────────────────── */
function MenuIcon({ open, colorClass = 'text-current' }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {open ? (
        <motion.svg key="x"
          initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
          className={`w-6 h-6 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </motion.svg>
      ) : (
        <motion.svg key="menu"
          initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
          className={`w-6 h-6 ${colorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </motion.svg>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────────────────
   Shared top bar row — IDENTICAL layout on every page
   Only text/icon colour differs between homepage & inner
───────────────────────────────────────────────────────── */
function TopBarRow({ navItems, pathname, menuOpen, onToggle, currentTime, variant, desktopLinks }) {
  const isHome    = variant === 'homepage'
  const fnColor   = isHome ? 'text-white opacity-80 hover:opacity-100' : 'text-slate-900 opacity-90 hover:opacity-100'
  const timeColor = isHome
    ? 'text-white opacity-55 hover:opacity-100'
    : 'text-slate-400 hover:text-slate-700'
  const btnColor  = isHome ? 'text-white opacity-70 hover:opacity-100' : 'text-slate-700 hover:text-teal-700'

  return (
    <div className={`w-full flex items-center justify-between ${NAV_PX} ${NAV_HEIGHT}`}>

      {/* ── Left: FN monogram ── */}
      <Link href="/" className={`${FN_CLASSES} ${fnColor}`}>
        FN
      </Link>

      {/* ── Center: desktop nav links ── */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
        {desktopLinks}
      </div>

      {/* ── Right: clock + hamburger ── */}
      <div className="flex items-center gap-3">
        {/* Clock — hidden on mobile, shown sm+ on homepage; md+ on inner pages */}
        <span className={`
          tabular-nums text-[11px] tracking-widest uppercase font-bold transition-all duration-300
          ${isHome ? 'hidden sm:block' : 'hidden md:block'}
          ${timeColor}
        `}>
          {currentTime}
        </span>

        {/* Hamburger — mobile only, same size and position everywhere */}
        <button
          onClick={onToggle}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-bottom-sheet"
          className={`${ICON_BTN} ${btnColor}`}
        >
          <MenuIcon open={menuOpen} colorClass="text-current" />
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Desktop nav links — homepage variant (white on image)
───────────────────────────────────────────────────────── */
function HomepageDesktopLinks({ navItems, pathname }) {
  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item) => {
        const active = pathname === item.href
        return (
          <Link key={item.label} href={item.href}
            className={`${LINK_BASE} text-white ${active ? 'opacity-100' : 'opacity-55 hover:opacity-100'}`}
          >
            {item.label}
            {active
              ? <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
              : <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300" />
            }
          </Link>
        )
      })}
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────
   Desktop nav links — inner pages variant (dark on light)
───────────────────────────────────────────────────────── */
function InnerDesktopLinks({ navItems, pathname }) {
  return (
    <nav className="flex items-center gap-10">
      {navItems.map((item) => {
        const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
        return (
          <Link key={item.label} href={item.href}
            className={`${LINK_BASE} ${active ? 'text-teal-700' : 'text-slate-400 hover:text-slate-900'}`}
          >
            {item.label}
            <span className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300 origin-left ${
              active ? 'bg-teal-600 scale-x-100' : 'bg-slate-400 scale-x-0 group-hover:scale-x-100'
            }`} />
          </Link>
        )
      })}
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────
   Bottom sheet — shared across ALL pages, ALL variants
───────────────────────────────────────────────────────── */
function BottomSheet({ open, onClose, navItems, pathname, currentTime }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div key="scrim"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] md:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            id="mobile-bottom-sheet"
            role="dialog" aria-modal="true" aria-label="Navigation menu"
            key="sheet"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed bottom-0 left-0 right-0 z-[70] md:hidden rounded-t-3xl overflow-hidden"
            style={{ background: 'rgba(10,10,10,0.94)', backdropFilter: 'blur(28px)' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Nav links */}
            <nav className="px-6 pt-4 pb-2">
              {navItems.map((item, i) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <motion.div key={item.label}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.055 }}
                  >
                    <Link href={item.href} onClick={onClose}
                      className={`flex items-center justify-between w-full py-4 border-b transition-all duration-200 group ${
                        active ? 'border-white/12' : 'border-white/6'
                      }`}
                    >
                      <span className={`font-serif text-2xl tracking-tight transition-colors duration-200 ${
                        active ? 'text-white' : 'text-white/45 group-active:text-white'
                      }`}>
                        {item.label}
                      </span>
                      <span className="flex items-center gap-2">
                        {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        <svg
                          className={`w-4 h-4 transition-opacity duration-200 ${
                            active ? 'text-white/50 opacity-100' : 'text-white/20 opacity-0 group-active:opacity-100'
                          }`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Footer — socials + clock + close */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center gap-6 mb-5">
                {socialLinks.map(({ name, href }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                    className="text-[11px] text-white/30 tracking-widest uppercase hover:text-white/60 transition-colors duration-200"
                  >
                    {name}
                  </a>
                ))}
              </div>
              <div className="flex items-center justify-between pb-5">
                <span className="text-[11px] text-white/25 tracking-widest uppercase tabular-nums">
                  {currentTime}
                </span>
                <button onClick={onClose} aria-label="Close navigation"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/35 text-[11px] tracking-widest uppercase hover:border-white/25 hover:text-white/60 transition-all duration-200"
                >
                  Close
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* iOS home bar safe area */}
            <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────── */
export default function GlobalNav({ theme = 'light', variant = 'homepage' }) {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [scrolled, setScrolled]       = useState(false)
  const [navOpaque, setNavOpaque]     = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: 'Home',     href: '/' },
    { label: 'About',    href: '/about' },
    { label: 'Artworks', href: '/artworks' },
    { label: 'Contact',  href: '/contact' },
  ]

  /* Clock */
  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setCurrentTime(`${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')} EAT`)
    }
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [])

  /* Scroll */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (variant === 'inner')    setScrolled(y > 64)
      if (variant === 'homepage') setNavOpaque(y > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Close on route change */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const toggle = () => setMenuOpen(p => !p)
  const close  = () => setMenuOpen(false)

  const sharedProps = {
    navItems, pathname, menuOpen,
    onToggle: toggle,
    currentTime, variant,
  }

  return (
    <>
      {/* ══ HOMEPAGE ══ */}
      {variant === 'homepage' && (
        <div className={`absolute top-0 left-0 right-0 z-40 transition-all duration-500 relative ${
          navOpaque ? 'bg-black/40 backdrop-blur-md' : 'bg-transparent'
        }`}>
          <TopBarRow
            {...sharedProps}
            desktopLinks={<HomepageDesktopLinks navItems={navItems} pathname={pathname} />}
          />
        </div>
      )}

      {/* ══ INNER PAGES ══ */}
      {variant === 'inner' && (
        <>
          {/* Static bar */}
          <div className="w-full bg-[#FAF9F6] border-b border-slate-900/8">
            <TopBarRow
              {...sharedProps}
              desktopLinks={<InnerDesktopLinks navItems={navItems} pathname={pathname} />}
            />
          </div>

          {/* Sticky bar on scroll */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -64, opacity: 0 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-[50] bg-[#FAF9F6]/95 backdrop-blur-md border-b border-slate-900/8 shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
              >
                <TopBarRow
                  {...sharedProps}
                  desktopLinks={<InnerDesktopLinks navItems={navItems} pathname={pathname} />}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ══ BOTTOM SHEET — same on every page ══ */}
      <BottomSheet
        open={menuOpen}
        onClose={close}
        navItems={navItems}
        pathname={pathname}
        currentTime={currentTime}
      />
    </>
  )
}
