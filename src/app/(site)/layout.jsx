'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import GlobalNav from '../components/GlobalNav'
import Footer from '../components/Footer'

export default function SiteLayout({ children }) {
  const pathname = usePathname()

  return (
    <>
      {/* Global Navigation */}
      <GlobalNav theme="dark" variant="inner" />

      {/* Page transition wrapper — consistent fade-in across all inner pages */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Footer on all inner pages */}
      <Footer />
    </>
  )
}
