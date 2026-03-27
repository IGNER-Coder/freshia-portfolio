"use client"

import { motion } from 'framer-motion'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

export default function ArtistBiography() {
  return (
    <section className="max-w-5xl mx-auto mb-24 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="text-center mb-20"
      >
        <span className="font-bold text-teal-700 tracking-widest uppercase text-sm mb-4 block">
          Freshia Njeri [1988]
        </span>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-slate-800 leading-tight max-w-4xl mx-auto">
          "My creations function as windows into my soul—each piece a reflection of the intricate layers of my experiences."
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

        {/* LEFT — Portrait + metadata */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start shrink-0 relative">
          <div className="sticky top-28 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full max-w-xs md:max-w-full aspect-[3/4] bg-white p-3 shadow-xl mb-4 mx-auto md:mx-0 -rotate-2 hover:rotate-0 transition-transform duration-700"
            >
              <div className="relative w-full h-full bg-slate-200 overflow-hidden">
                <CldImage
                  src="IMG_5801_gkh3yc"
                  alt="Freshia Njeri — Studio Portrait, Wajukuu Arts Collective, Nairobi"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-[1500ms]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </motion.div>

            {/* Portrait caption */}
            <p className="text-center md:text-left text-xs text-slate-400 font-light tracking-wide mb-8 italic px-1">
              Studio portrait · Wajukuu Arts Collective, Nairobi
            </p>

            {/* Metadata sidebar */}
            <div className="space-y-5 text-center md:text-left text-slate-500 font-sans hidden md:block border-l-2 border-teal-700/20 pl-6 ml-4">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700/70 mb-1">Base</h4>
                <p className="text-sm font-light">Nairobi, Kenya</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700/70 mb-1">Affiliation</h4>
                <p className="text-sm font-light">Wajukuu Arts</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-700/70 mb-1">Medium</h4>
                <p className="text-sm font-light">Mixed Media & Acrylic</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Biography text */}
        <div className="md:col-span-8 font-sans text-lg md:text-xl text-slate-700 font-light leading-loose md:leading-[2.2] space-y-10">
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="first-letter:float-left first-letter:text-8xl first-letter:pr-4 first-letter:font-serif first-letter:text-teal-800 first-letter:leading-[0.8]">
            As an emerging artist, I have cultivated a rich tapestry of experiences that inform my creative practice through workshops at Wajukuu and extensive self-directed exploration. My artistic journey, marked by a commitment to mixed media, allows me to investigate and articulate the complexities of human experience.
          </motion.p>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            Art serves as a profound medium for me, enabling the expression and sharing of my internal landscape. It acts as a conduit through which I convey my multifaceted perspective on life, encapsulating the interplay of joy, sorrow, and beauty.
          </motion.p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="my-12 py-10 px-8 border-y border-slate-900/10 text-center relative bg-white/40">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FAF9F6] px-4 font-serif italic text-4xl text-teal-700/20">"</div>
            <p className="font-serif text-2xl md:text-3xl text-slate-800 leading-snug">
              They embody the depths of pain, the vastness of emptiness, and the multifaceted nature of joy and beauty that I have encountered throughout my life.
            </p>
          </motion.div>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            I have had the honor of showcasing my work in esteemed venues — including Documenta 15 in Kassel, Germany (2022), "Before Our Home Goes Down" at Wajukuu (2024), and "Image in Our Heads" at Wajukuu and the Royal Danish Embassy (2025). These platforms have provided invaluable opportunities to connect with diverse audiences and fellow artists worldwide.
          </motion.p>

          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            Through my art, I strive to invite viewers into a dialogue, encouraging them to engage with the emotional and existential themes that resonate within us all.
          </motion.p>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="pt-8">
            <Link
              href="/artworks"
              className="inline-flex items-center gap-3 px-8 py-4 bg-teal-800 text-white text-sm font-bold uppercase tracking-widest hover:bg-teal-900 transition-colors shadow-lg hover:shadow-xl group"
            >
              Explore the Artworks
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
