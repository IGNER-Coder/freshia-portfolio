'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { urlFor } from '@/sanity/lib/image';

/* ── Status helpers ───────────────────────────────────── */
const STATUS = {
  available: { dot: 'bg-emerald-500', label: 'Available' },
  sold:      { dot: 'bg-rose-400',    label: 'Sold' },
  private:   { dot: 'bg-sky-400',     label: 'Private Collection' },
  nfs:       { dot: 'bg-slate-300',   label: 'Not for Sale' },
};

function StatusBadge({ status }) {
  const s = STATUS[status] ?? STATUS.nfs;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      <span className="font-sans text-[11px] text-slate-500 tracking-wide">{s.label}</span>
    </span>
  );
}

/* ── Single artwork card ──────────────────────────────── */
function ArtworkCard({ art, index }) {
  const slug      = art.slug || art._id;
  const available = art.status === 'available';

  return (
    <motion.div
      className="break-inside-avoid mb-8 md:mb-12 group"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      {/* ── Image ── */}
      <Link
        href={`/artworks/${slug}`}
        className="block relative w-full overflow-hidden bg-slate-100 mb-3 md:mb-4"
      >
        {art.mainImage ? (
          <>
            <img
              src={urlFor(art.mainImage)
                .width(900)
                .quality(88)
                .auto('format')
                .url()}
              alt={art.mainImage?.alt || art.title}
              className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
              <span className="
                opacity-0 group-hover:opacity-100 transition-all duration-300
                bg-white/95 backdrop-blur-sm
                px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900
                shadow-lg
              ">
                View Work
              </span>
            </div>
          </>
        ) : (
          <div className="aspect-[4/5] flex flex-col items-center justify-center bg-slate-100 text-slate-300">
            <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs tracking-wider uppercase">No Image</span>
          </div>
        )}
      </Link>

      {/* ── Placard ── */}
      <div className="flex flex-col gap-1 pr-1">

        {/* Title + year on same row */}
        <div className="flex items-baseline justify-between gap-2">
          <Link href={`/artworks/${slug}`}>
            <h2 className="font-serif text-base md:text-lg text-slate-900 group-hover:text-teal-700 transition-colors duration-300 leading-snug">
              {art.title}
            </h2>
          </Link>
          <span className="font-sans text-[11px] font-bold text-slate-300 shrink-0 tabular-nums">
            {art.year}
          </span>
        </div>

        {/* Medium */}
        {art.medium && (
          <p className="font-sans text-xs text-slate-400 font-light">
            {art.medium}
          </p>
        )}

        {/* Dimensions — desktop only */}
        {art.dimensions && (
          <p className="hidden md:block font-sans text-[11px] text-slate-300 tracking-wider uppercase font-light">
            {art.dimensions}
          </p>
        )}

        {/* Status + Enquire */}
        {art.status && (
          <div className="flex items-center justify-between gap-2 mt-1.5">
            <StatusBadge status={art.status} />
            {available && (
              <Link
                href={`/contact?artwork=${encodeURIComponent(art.title)}`}
                onClick={e => e.stopPropagation()}
                className="font-sans text-[11px] font-bold uppercase tracking-widest text-teal-700 hover:text-teal-900 transition-colors duration-200 underline underline-offset-2"
              >
                Enquire →
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Year group header ────────────────────────────────── */
function YearDivider({ year }) {
  return (
    <div className="col-span-full flex items-center gap-6 mb-8 mt-4">
      <span className="font-serif text-4xl md:text-5xl text-slate-900/10 font-bold select-none leading-none">
        {year}
      </span>
      <div className="flex-1 h-px bg-slate-900/8" />
    </div>
  );
}

/* ── Main component ───────────────────────────────────── */
export default function ArtworksGrid({ artworks }) {
  if (!artworks || artworks.length === 0) {
    return (
      <div className="text-center py-32 px-6">
        <p className="font-sans text-sm text-slate-400 tracking-wider">No works in the archive yet.</p>
      </div>
    );
  }

  /* Group by year — newest first */
  const byYear = artworks.reduce((acc, art) => {
    const y = art.year ?? 'Undated';
    if (!acc[y]) acc[y] = [];
    acc[y].push(art);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b - a);

  /* Total count */
  const total = artworks.length;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pb-32">

      {/* Count line */}
      <p className="font-sans text-xs text-slate-400 tracking-widest uppercase mb-12">
        {total} {total === 1 ? 'painting' : 'paintings'} in the archive
      </p>

      {years.map((year) => (
        <div key={year}>
          {/* Year divider */}
          <YearDivider year={year} />

          {/* Masonry grid for this year's works */}
          <div className="columns-2 lg:columns-3 gap-6 md:gap-10">
            {byYear[year].map((art, i) => (
              <ArtworkCard key={art._id} art={art} index={i} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
