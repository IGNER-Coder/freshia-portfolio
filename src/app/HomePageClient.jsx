'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import GlobalNav from '@/app/components/GlobalNav'

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100dvh', minHeight: '100svh' }}>

      {/* ── Transparent floating nav — no background, floats over hero image ── */}
      <GlobalNav theme="light" variant="homepage" />

      {/* ── Background image (no overlay tint — pure image) ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/doevklqj6/image/upload/w_1920,h_1280,c_fill,g_center,q_auto,f_auto/v1771654953/homepage-background_jabt7w.jpg"
          alt="Freshia Njeri Art Background"
          fill
          priority
          className="object-cover object-center"
          quality={85}
        />
        {/* Subtle gradient only at very top + bottom to keep text legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-20 h-full flex flex-col pointer-events-none">

        {/* Center hero text */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            {/* Name */}
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
          className="px-6 md:px-12 pb-14 md:pb-16 pointer-events-auto"
        >
          <div className="flex items-center justify-center md:justify-end w-full">

            {/* Decorative line (desktop only) */}
            <div className="hidden md:block flex-1 h-[1px] bg-white opacity-20 mr-6" />

            {/* Primary CTA (centered mobile, right desktop) */}
            <Link
              href="/artworks"
              className="group inline-flex items-center text-white opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[11px] md:text-sm tracking-widest font-bold uppercase">
                  ENTER GALLERY
                </span>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
