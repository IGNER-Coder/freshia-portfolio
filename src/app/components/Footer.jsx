'use client'

import Link from 'next/link'
import { socialLinks } from '@/app/lib/socials'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Artworks', href: '/artworks' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="w-full bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-20">

        {/* Top row — name + nav */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14 pb-14 border-b border-white/10">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-teal-400 mb-3">
              Visual Artist · Nairobi
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-tight leading-none">
              Freshia Njeri
            </h2>
            <p className="font-sans text-sm text-white/40 mt-3 font-light">
              Wajukuu Arts Collective
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col sm:flex-row gap-6 md:gap-10">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-sans text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row — socials + copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            {socialLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-white/40 hover:text-teal-400 transition-colors duration-300 relative group"
              >
                {name}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </div>

          <p className="font-sans text-xs text-white/25 font-light">
            © {currentYear} Freshia Njeri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
